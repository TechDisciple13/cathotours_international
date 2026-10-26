// Teste séparément la connexion e-mail (SMTP) et la connexion Google Sheets (Apps Script).
// Aucun e-mail n'est envoyé et aucune ligne n'est ajoutée au Sheet.
// Usage : npm run check:config
import nodemailer from 'nodemailer'
import { config, sheetsConfigured, smtpConfigured } from '../src/config.js'

let failures = 0
const say = (line = '') => console.log(line)

say('--- E-mail (SMTP) ---')
if (!smtpConfigured) {
  failures++
  say('NON CONFIGURÉ : SMTP_HOST, SMTP_USER et SMTP_PASS sont obligatoires dans server/.env')
} else {
  const { host, port, user, pass } = config.smtp
  say(`Serveur      : ${host}:${port}`)
  say(`Utilisateur  : ${user}`)
  say(`Mot de passe : ${pass.length} caractères${/\s/.test(pass) ? ' (contient des espaces : à retirer)' : ''}`)
  if (host.includes('gmail') && pass.length !== 16) say(`Attention : un mot de passe d'application Google compte 16 caractères (ici ${pass.length}).`)
  try {
    const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass }, connectionTimeout: 10000 })
    await transporter.verify()
    say('OK : connexion établie et identifiants acceptés.')
  } catch (err) {
    failures++
    say(`ÉCHEC : ${err.message.split('\n')[0]}`)
    if (err.responseCode === 535 || /Invalid login|BadCredentials/i.test(err.message)) {
      say('Le serveur Gmail est joint mais refuse les identifiants. Causes fréquentes :')
      say('  1. Le mot de passe n\'est pas un mot de passe d\'application (le mot de passe du compte ne fonctionne pas).')
      say('  2. La validation en deux étapes n\'est pas activée sur ce compte (sans elle, aucun mot de passe d\'application n\'existe).')
      say('  3. Le mot de passe a été créé depuis un AUTRE compte Google connecté dans le navigateur.')
      say('  4. SMTP_USER n\'est pas l\'adresse e-mail complète de ce même compte.')
      say('  5. Le mot de passe a été supprimé ou régénéré : en créer un nouveau.')
      say('  6. server/.env modifié sans redémarrer : arrêter le serveur (Ctrl+C) et le relancer.')
    } else if (/ECONN|ETIMEDOUT|ENOTFOUND|EAI_AGAIN/.test(`${err.code} ${err.message}`)) {
      say('Le serveur SMTP est injoignable : vérifier SMTP_HOST, SMTP_PORT et la connexion Internet.')
    }
  }
}

say()
say('--- Google Sheets (Apps Script) ---')
if (!sheetsConfigured) {
  failures++
  say('NON CONFIGURÉ : APPS_SCRIPT_URL et APPS_SCRIPT_SECRET sont obligatoires dans server/.env')
} else {
  const { url, secret } = config.appsScript
  say(`Adresse : ${url.slice(0, 55)}${url.length > 55 ? '…' : ''}`)
  say(`Secret  : ${secret.length} caractères${/\s/.test(secret) ? ' (contient des espaces : à retirer)' : ''}`)
  if (!/\/exec$/.test(url)) say('Attention : l\'adresse doit se terminer par /exec (déploiement « Application Web »).')
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret, ping: true }), signal: AbortSignal.timeout(15000) })
    const text = await res.text()
    let data = null
    try { data = JSON.parse(text) } catch { /* réponse non JSON */ }
    if (data?.ok) say('OK : le script répond et le secret est accepté.')
    else if (data?.error === 'unauthorized') {
      failures++
      say('ÉCHEC : le script répond mais refuse le secret (« unauthorized »). Le déploiement et l\'adresse sont bons ; il reste à aligner les secrets :')
      say('  1. Dans Apps Script : Paramètres du projet, Propriétés du script : le nom doit être exactement SECRET (majuscules), valeur enregistrée.')
      say('  2. Cette valeur doit être identique à APPS_SCRIPT_SECRET dans server/.env (sans guillemets ni espaces).')
      say('  3. Après modification de server/.env, arrêter et relancer le serveur.')
    } else {
      failures++
      say('Réponse inattendue du script : soit l\'adresse n\'est pas celle du déploiement « Application Web »,')
      say('soit le code Code.gs n\'est pas à jour. Coller la dernière version de Code.gs, puis Déployer, Gérer les déploiements, modifier, Nouvelle version.')
    }
  } catch (err) {
    failures++
    say(`ÉCHEC : ${err.message}`)
  }
}

say()
say(failures ? `${failures} problème(s) à corriger.` : 'Tout est configuré correctement.')
process.exit(failures ? 1 : 0)