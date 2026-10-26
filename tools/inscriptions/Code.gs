/**
 * Apps Script : reçoit les inscriptions et abonnements envoyés par le serveur.
 * Installation : voir README (secret dans Propriétés du script, nom SECRET).
 */
function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: 'bad_request' });
  }
  var secret = PropertiesService.getScriptProperties().getProperty('SECRET');
  if (!secret || body.secret !== secret) return reply({ ok: false, error: 'unauthorized' });
  if (body.ping) return reply({ ok: true, ping: true }); // test de connexion sans écriture

  var tab = body.tab === 'Newsletter' ? 'Newsletter' : 'Inscriptions';
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(tab) || ss.insertSheet(tab);
  if (sheet.getLastRow() === 0 && body.headers) sheet.appendRow(body.headers);
  sheet.appendRow((body.row || []).map(safeCell));
  return reply({ ok: true });
}

// Empêche l'interprétation d'une valeur comme formule (=, +, -, @).
function safeCell(value) {
  var s = String(value == null ? '' : value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}