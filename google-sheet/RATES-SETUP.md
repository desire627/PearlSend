# MefraPay – change your rates from a Google Sheet

Once this is set up you **never need to touch the code** to change rates.
Edit the sheet (on your computer or in the Google Sheets phone app) and the
website updates by itself within about 5 minutes.

## One-time setup (about 5 minutes)

1. Go to **sheets.new** to create a new Google Sheet. Name it `MefraPay rates`.
2. **File → Import → Upload** and choose `google-sheet/rates-template.csv`
   from this project. Pick **"Replace current sheet"** → **Import data**.
   You now have this table:

   | Setting | Value | Notes |
   |---|---|---|
   | RUB to UGX | 44 | How many UGX the recipient gets for 1 RUB |
   | UGX to RUB | 0.019082 | How many RUB the recipient gets for 1 UGX |
   | Max RUB per transfer | 10000 | Largest amount a customer in Russia can send at once |
   | Max UGX per transfer | 500000 | Largest amount a customer in Uganda can send at once |
   | Fee % | 0 | Your fee in percent |
   | Updated | 2026-11-15 | Shown on the website as "Updated …" |

3. **File → Share → Publish to web**.
   - First dropdown: choose the sheet (e.g. `Sheet1`), **not** "Entire document".
   - Second dropdown: choose **Comma-separated values (.csv)**.
   - Click **Publish** → **OK**.
4. Copy the link it shows (it ends in `output=csv`).
5. Open `rates.js`, find `RATE_SHEET_CSV_URL: ''` and paste the link between
   the quotes. Save, then commit and push to GitHub. *(Or send the link to
   your developer.)*

That's it. This step is only done once.

## Changing rates (every time)

1. Open the sheet.
2. Change the number in the **Value** column.
3. Update the **Updated** date.

The website shows the new values within about **5 minutes** (Google needs a
few minutes to refresh a published sheet). Visitors who already have the page
open see them after refreshing.

## Rules

- **Only change column B (Value).** Don't rename the words in column A —
  the website uses them to find each setting.
- Decimals can be written with a dot or a comma: `0.019082` or `0,019082`.
- Dates can be `2026-11-20`, `20.11.2026` or `20/11/2026`.
- If a value looks wrong (e.g. text instead of a number), the website ignores
  it and keeps the last good value from `rates.js` – it won't break.
- Publishing makes the sheet **readable** by anyone with the link, but only
  you (and people you share it with) can **edit** it. Don't put anything
  private in this sheet.
