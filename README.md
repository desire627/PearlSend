# MefraPay

A simple bilingual (English / Russian) website for requesting money transfers between **Russia 🇷🇺 and Uganda 🇺🇬** (RUB ⇄ UGX).

Visitors fill in a short form (amount, recipient name and phone, payout method, their own details). The request is emailed via [FormSubmit](https://formsubmit.co) and can optionally be saved to a Google Sheet.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home page |
| `send.html` | Transfer request form + success screen |
| `thanks.html` | Fallback thank-you page |
| `i18n.js` | English / Russian translations |
| `rates.js` | **Your exchange rate, fee and transfer limits** |
| `accounts.js` | **Accounts customers pay into** (shown after the form is sent) |
| `styles.css` | All styles |
| `images/` | Logo, flags and illustrations |
| `google-sheet/Code.gs` | Optional Google Sheets backup (setup steps inside) |
| `google-sheet/RATES-SETUP.md` | **How to change rates from a Google Sheet (no code)** |

## Run locally

Open `index.html` in a browser. No build step needed.

## Deploy

Any static host works: GitHub Pages, Netlify or Vercel.
