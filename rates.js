/* =====================================================================
   MefraPay – exchange rate, limits and conversion (RUB ⇄ UGX)
   ---------------------------------------------------------------------
   YOUR SETTINGS – change these numbers whenever your rate changes:
   ===================================================================== */
const RATE_CONFIG = {
  // Our rate: how many UGX the customer gets for 1 RUB (Russia → Uganda).
  RUB_TO_UGX: 45,

  // Our rate the other way: how many UGX the customer pays for 1 RUB
  // (Uganda → Russia). Leave as null to use the same rate as above.
  UGX_PER_RUB_REVERSE: null,

  // The date you last changed the rates (shown as "Updated …" on the site).
  RATE_UPDATED: '2026-11-15',

  // Your fee, as a percent of the amount sent (0 = no fee).
  FEE_PERCENT: 0,

  // Maximum a customer can send in one transfer, in the currency they pay with.
  MAX_SEND: { RUB: 10000, UGX: 500000 }
};
/* ===================================================================== */

(function () {
  const C = RATE_CONFIG;

  // Customer rate from one currency to the other
  function rate(from, to) {
    if (from === to) return 1;
    if (from === 'RUB') return C.RUB_TO_UGX;
    return 1 / (C.UGX_PER_RUB_REVERSE || C.RUB_TO_UGX);
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

  // "1 RUB = 45 UGX" (both directions are shown per rouble)
  function rateText(from, to) {
    const ugxPerRub = from === 'RUB' ? rate('RUB', 'UGX') : 1 / rate('UGX', 'RUB');
    return '1 RUB = ' + ugxPerRub.toLocaleString(locale(), { maximumFractionDigits: 2 }) + ' UGX';
  }

  const updated = C.RATE_UPDATED ? new Date(C.RATE_UPDATED + 'T12:00:00') : null;

  window.Rates = {
    ready: Promise.resolve(),
    rate, receiveFor, sendFor, feeFor, maxFor, format, parse, rateText,
    info: { live: true, manual: true, updated },
    config: C
  };
})();
