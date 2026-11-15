/**
 * MefraPay – save every transfer request into a Google Sheet (backup copy).
 *
 * SETUP (about 5 minutes, one time):
 *  1. Create a new Google Sheet (sheets.new). Name it e.g. "MefraPay requests".
 *  2. In the sheet: Extensions → Apps Script.
 *  3. Delete what's there, paste this whole file, click Save (💾).
 *  4. Click Deploy → New deployment → gear icon → "Web app".
 *       - Execute as:      Me
 *       - Who has access:  Anyone
 *     Click Deploy, allow the permissions Google asks for.
 *  5. Copy the "Web app URL" (ends in /exec).
 *  6. Open send.html, find   const SHEET_URL = '';
 *     and paste the URL between the quotes.
 *
 * Each request becomes a new row. Columns are created automatically.
 * If you edit this script later, use Deploy → Manage deployments → Edit →
 * Version: "New version" so the same URL keeps working.
 */

const COLUMNS = [
  'Received at', 'Reference', 'Direction', 'Amount', 'Currency', 'Payout method',
  'Recipient name', 'Recipient phone', 'Sender name', 'Sender phone', 'email',
  'Notes', 'Site language', 'Summary', 'Status'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS);
      sheet.getRange(1, 1, 1, COLUMNS.length)
        .setFontWeight('bold').setBackground('#0f7b4a').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    const p = e.parameter || {};
    const row = COLUMNS.map(col => {
      if (col === 'Received at') return new Date();
      if (col === 'Status') return 'New';
      const v = String(p[col] || '');
      // Keep "+256…" phone numbers as text, and block formula injection
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    });
    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
