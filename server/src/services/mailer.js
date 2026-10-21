import nodemailer from 'nodemailer'
import { config, smtpConfigured } from '../config.js'

const oneLine = (s) => String(s).replace(/[\r\n]+/g, ' ').trim()
const genderLabel = { female: 'Féminin', male: 'Masculin' }
const channelLabel = { email: 'E-mail', whatsapp: 'WhatsApp (confirmation manuelle)' }

export function buildInscriptionMessages(d) {
  const messages = []
  if (config.notifyEmail) {
    messages.push({
      to: config.notifyEmail,
      subject: oneLine(`Nouvelle préinscription : ${d.firstNames} ${d.lastName} (${d.event})`),
      text: [
        'Une nouvelle préinscription a été reçue.', '',
        `Nom : ${d.lastName}`, `Prénoms : ${d.firstNames}`, `Sexe : ${genderLabel[d.gender]}`,
        `Fonction : ${d.role || '-'}`, `Taille : ${d.size || '-'}`,
        `Téléphone : ${d.countryCode} ${d.phone}`, `E-mail : ${d.email}`,
        `Événement : ${d.event}`, `Canal de confirmation : ${channelLabel[d.channel]}`, `Langue : ${d.lang}`,
        ...(d.channel === 'whatsapp' ? ['', 'Action requise : confirmer manuellement par WhatsApp au numéro ci-dessus.'] : []),
      ].join('\n'),
    })
  }
  if (d.channel === 'email') {
    messages.push({
      to: d.email,
      subject: `Votre préinscription - ${d.event}`,
      text: [
        `Bonjour ${d.firstNames},`, '',
        `Nous avons bien reçu votre préinscription pour l'événement « ${d.event} ».`,
        'Notre équipe reviendra vers vous par e-mail pour la suite.', '',
        'Fraternellement,', 'Catho Tours International',
      ].join('\n'),
    })
  }
  return messages
}

let transporter
export async function sendMessages(messages) {
  if (!smtpConfigured || messages.length === 0) return 'skipped'
  transporter ??= nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: { user: config.smtp.user, pass: config.smtp.pass },
  })
  const results = await Promise.allSettled(messages.map((m) => transporter.sendMail({ from: config.smtp.from, ...m })))
  const failed = results.filter((r) => r.status === 'rejected')
  if (failed.length) throw new Error(`${failed.length} e-mail(s) non envoyé(s) : ${failed[0].reason?.message ?? 'erreur SMTP'}`)
  return 'sent'
}
