/* =====================================================================
   MefraPay – exchange rates and conversion (RUB ⇄ UGX)
   ---------------------------------------------------------------------
   YOUR SETTINGS – change these numbers to match your business:
   ===================================================================== */
const RATE_CONFIG = {
  // Your fee, as a percent of the amount sent (0 = no fee shown).
  FEE_PERCENT: 0,

  // Your margin on the exchange rate, in percent. 1.5 means customers get
  // a rate 1.5% worse than the market rate (this is your profit). 0 = market rate.
  MARGIN_PERCENT: 0,

  // Set your OWN fixed rate here (how many UGX for 1 RUB) to ignore the live
  // market rate completely, e.g. 44.5. Leave as null to use the live rate.
  MANUAL_RUB_TO_UGX: null,

  // Used only if the live rate can't be loaded (no internet, service down).
  FALLBACK_RUB_TO_UGX: 50
};
/* ===================================================================== */

(function () {
  const CACHE_KEY = 'pearlsend-rate';
  const CACHE_HOURS = 6;

  // Free, no-key rate sources. Tried in order.
  const SOURCES = [
    async (signal) => {
      const r = await fetch('https://open.er-api.com/v6/latest/RUB', { signal });
      const j = await r.json();
      if (j.result !== 'success' || !j.rates || !j.rates.UGX) throw new Error('bad data');
      return { rate: j.rates.UGX, updated: new Date(j.time_last_update_unix * 1000) };
    },
    async (signal) => {
      const r = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/rub.json', { signal });
      const j = await r.json();
      if (!j.rub || !j.rub.ugx) throw new Error('bad data');
      return { rate: j.rub.ugx, updated: new Date(j.date) };
    }
  ];

  function readCache() {
    try {
      const c = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (c && Date.now() - c.fetched < CACHE_HOURS * 3600e3) {
        return { rate: c.rate, updated: new Date(c.updated), live: true };
      }
    } catch (e) {}
    return null;
  }

  function writeCache(d) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ rate: d.rate, updated: d.updated.getTime(), fetched: Date.now() }));
    } catch (e) {}
  }

  async function loadRate() {
    if (RATE_CONFIG.MANUAL_RUB_TO_UGX) {
      return { rate: RATE_CONFIG.MANUAL_RUB_TO_UGX, updated: new Date(), live: true, manual: true };
    }
    const cached = readCache();
    if (cached) return cached;
    for (const src of SOURCES) {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 6000);
      try {
        const d = await src(ctrl.signal);
        clearTimeout(timer);
        writeCache(d);
        return { ...d, live: true };
      } catch (e) { clearTimeout(timer); }
    }
    return { rate: RATE_CONFIG.FALLBACK_RUB_TO_UGX, updated: null, live: false };
  }

  let midRate = RATE_CONFIG.MANUAL_RUB_TO_UGX || RATE_CONFIG.FALLBACK_RUB_TO_UGX;
  let info = { live: false, updated: null, manual: !!RATE_CONFIG.MANUAL_RUB_TO_UGX };

  const ready = loadRate().then(d => {
    midRate = d.rate;
    info = { live: d.live, updated: d.updated, manual: !!d.manual };
    document.dispatchEvent(new CustomEvent('ratesready'));
    return d;
  });

  // Customer rate from one currency to the other (includes your margin)
  function rate(from, to) {
    if (from === to) return 1;
    const mid = from === 'RUB' ? midRate : 1 / midRate;
    return mid * (1 - RATE_CONFIG.MARGIN_PERCENT / 100);
  }

  const feeFactor = () => 1 - RATE_CONFIG.FEE_PERCENT / 100;

  // Amount the recipient gets when the sender pays `amount` in `from`
  function receiveFor(amount, from, to) {
    return amount * feeFactor() * rate(from, to);
  }
  // Amount the sender pays (in `from`) so the recipient gets `amount` in `to`
  function sendFor(amount, from, to) {
    return amount / rate(from, to) / feeFactor();
  }
  function feeFor(amount) {
    return amount * RATE_CONFIG.FEE_PERCENT / 100;
  }

  function locale() {
    return window.I18N && I18N.lang === 'ru' ? 'ru-RU' : 'en-US';
  }

  function format(n, cur) {
    if (!isFinite(n)) return '–';
    const digits = cur === 'UGX' ? 0 : 2;
    return n.toLocaleString(locale(), { minimumFractionDigits: 0, maximumFractionDigits: digits }) + ' ' + cur;
  }

  // Accepts "20 000", "20,000", "1500,50", "1500.50"
  function parse(str) {
    let s = String(str || '').replace(/[\s  ]/g, '');
    s = s.replace(/,(?=\d{3}(\D|$))/g, '').replace(',', '.');
    const n = parseFloat(s.replace(/[^\d.]/g, ''));
    return isFinite(n) ? n : 0;
  }

  // "1 RUB = 45.12 UGX" or "1 000 UGX = 22.16 RUB"
  function rateText(from, to) {
    if (from === 'RUB') {
      return '1 RUB = ' + rate('RUB', 'UGX').toLocaleString(locale(), { maximumFractionDigits: 2 }) + ' UGX';
    }
    return (1000).toLocaleString(locale()) + ' UGX = ' +
      (1000 * rate('UGX', 'RUB')).toLocaleString(locale(), { maximumFractionDigits: 2 }) + ' RUB';
  }

  window.Rates = {
    ready, rate, receiveFor, sendFor, feeFor, format, parse, rateText,
    get info() { return info; },
    config: RATE_CONFIG
  };
})();
