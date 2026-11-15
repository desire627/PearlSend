/* =====================================================================
   MefraPay – exchange rate, limits and conversion (RUB ⇄ UGX)
   ---------------------------------------------------------------------
   YOUR SETTINGS – change these numbers whenever your rate changes:
   ===================================================================== */
const RATE_CONFIG = {
  // Russia → Uganda: how many UGX the recipient gets for 1 RUB sent.
  RUB_TO_UGX: 44,

  // Uganda → Russia: how many RUB the recipient gets for 1 UGX sent.
  UGX_TO_RUB: 0.019082,

  // The date you last changed the rates (shown as "Updated …" on the site).
  RATE_UPDATED: '2026-11-15',

  // Your fee, as a percent of the amount sent (0 = no fee).
  FEE_PERCENT: 0,

  // Maximum a customer can send in one transfer, in the currency they pay with.
  MAX_SEND: { RUB: 10000, UGX: 500000 },

  // RATES CONTROL PANEL (Google Sheet) – see google-sheet/RATES-SETUP.md
  // Paste the sheet's "Publish to web" CSV link between the quotes.
  // When set, the numbers in the sheet replace the ones above
  // (the ones above are then only used if the sheet can't be reached).
  RATE_SHEET_CSV_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSveu1RY_9idMKCJGCzGm1mm8FEpjoS9S97w8PDCHqWtqzJkR7QgFIacWUERrclEE6Qdo1L4ljlpMnw/pub?gid=862218369&single=true&output=csv'
};
/* ===================================================================== */

(function () {
  const C = RATE_CONFIG;

  // Customer rate from one currency to the other
  function rate(from, to) {
    if (from === to) return 1;
    return from === 'RUB' ? C.RUB_TO_UGX : C.UGX_TO_RUB;
  }

  const feeFactor = () => 1 - C.FEE_PERCENT / 100;

  // Amount the recipient gets when the sender pays `amount` in `from`
  function receiveFor(amount, from, to) { return amount * feeFactor() * rate(from, to); }
  // Amount the sender pays (in `from`) so the recipient gets `amount` in `to`
  function sendFor(amount, from, to) { return amount / rate(from, to) / feeFactor(); }
  function feeFor(amount) { return amount * C.FEE_PERCENT / 100; }

  // Transfer limit for the currency the customer pays with
  function maxFor(cur) { return C.MAX_SEND[cur] || Infinity; }

  function locale() { return window.I18N && I18N.lang === 'ru' ? 'ru-RU' : 'en-US'; }

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

  // "1 RUB = 44 UGX" or "1 UGX = 0.019082 RUB"
  function rateText(from, to, loc) {
    const r = rate(from, to).toLocaleString(loc || locale(), { maximumFractionDigits: 6 });
    return '1 ' + from + ' = ' + r + ' ' + to;
  }

  const updated = C.RATE_UPDATED ? new Date(C.RATE_UPDATED + 'T12:00:00') : null;

  /* ---------- Load rates from the Google Sheet control panel ---------- */

  // Minimal CSV parser (handles quoted values such as "0,019082")
  function parseCSV(text) {
    const rows = [];
    let row = [], cell = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (q) {
        if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
        else if (ch === '"') q = false;
        else cell += ch;
      } else if (ch === '"') q = true;
      else if (ch === ',') { row.push(cell); cell = ''; }
      else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && text[i + 1] === '\n') i++;
        row.push(cell); rows.push(row); row = []; cell = '';
      } else cell += ch;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows;
  }

  // "0,019082" / "0.019082" / "10 000" / "10,000" → number
  function sheetNumber(v) {
    let s = String(v || '').trim().replace(/[\s  %]/g, '');
    if (s.includes(',') && !s.includes('.') && !/,\d{3}$/.test(s)) s = s.replace(',', '.');
    s = s.replace(/,/g, '');
    const n = parseFloat(s);
    return isFinite(n) ? n : NaN;
  }

  // "2026-11-15" or "15/11/2026" or "15.11.2026" → Date
  function sheetDate(v) {
    const s = String(v || '').trim();
    let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (m) return new Date(+m[1], m[2] - 1, +m[3], 12);
    m = s.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})/);
    if (m) return new Date(+m[3], m[2] - 1, +m[1], 12);
    return null;
  }

  // Applies values from the sheet; anything missing or invalid keeps its default
  function applySheet(rows) {
    const got = {};
    rows.forEach(([label, value]) => {
      const k = String(label || '').toLowerCase().replace(/[^a-z]/g, '');
      if (!k) return;
      if (k.startsWith('rubto')) got.rubUgx = sheetNumber(value);
      else if (k.startsWith('ugxto')) got.ugxRub = sheetNumber(value);
      else if (k.includes('max') && k.includes('rub')) got.maxRub = sheetNumber(value);
      else if (k.includes('max') && k.includes('ugx')) got.maxUgx = sheetNumber(value);
      else if (k.includes('fee')) got.fee = sheetNumber(value);
      else if (k.includes('updat')) got.updated = sheetDate(value);
    });
    // Sanity checks so a typo can't break the site
    if (got.rubUgx > 1 && got.rubUgx < 1000) C.RUB_TO_UGX = got.rubUgx;
    if (got.ugxRub > 0 && got.ugxRub < 1) C.UGX_TO_RUB = got.ugxRub;
    if (got.maxRub > 0) C.MAX_SEND.RUB = got.maxRub;
    if (got.maxUgx > 0) C.MAX_SEND.UGX = got.maxUgx;
    if (got.fee >= 0 && got.fee < 50) C.FEE_PERCENT = got.fee;
    if (got.updated) info.updated = got.updated;
  }

  const CACHE_KEY = 'mefrapay-rates-sheet';
  const info = { live: true, manual: true, updated };

  async function loadSheet() {
    const url = C.RATE_SHEET_CSV_URL;
    if (!url) return;
    // Show the last known sheet values straight away (avoids a flicker)
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) { applySheet(parseCSV(cached)); document.dispatchEvent(new CustomEvent('ratesready')); }
    } catch (e) {}
    try {
      const res = await fetch(url + (url.includes('?') ? '&' : '?') + 't=' + Date.now(), { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const text = await res.text();
      applySheet(parseCSV(text));
      try { localStorage.setItem(CACHE_KEY, text); } catch (e) {}
      document.dispatchEvent(new CustomEvent('ratesready'));
    } catch (e) {
      // Sheet unreachable: keep the defaults at the top of this file
    }
  }

  window.Rates = {
    ready: loadSheet(),
    rate, receiveFor, sendFor, feeFor, maxFor, format, parse, rateText,
    info,
    config: C
  };
})();
