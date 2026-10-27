// MESSAGE DE CONFIRMATION ENVOYÉ AU PARTICIPANT (canal « e-mail »).
//
// Pour le personnaliser : modifier les textes ci-dessous, enregistrer, puis ARRÊTER et RELANCER le serveur.
// Variables utilisables dans l'objet et dans le corps : {firstNames}  {lastName}  {event}
// Le message est du texte brut (pas de mise en forme HTML). Chaque ligne du tableau « body » est une ligne du message ;
// une chaîne vide '' produit une ligne vide.
// La langue utilisée est celle choisie par le participant sur le site (fr, en, es ou it).

const messages = {
  fr: {
    subject: 'Votre préinscription : {event}',
    body: [
      'Bonjour {firstNames},',
      '',
      'Nous avons bien reçu votre préinscription pour l\'événement « {event} ».',
      'Notre équipe reviendra vers vous par e-mail pour la suite.',
      '',
      'Fraternellement,',
      'Catho Tours International',
    ],
  },
  en: {
    subject: 'Your pre-registration: {event}',
    body: [
      'Hello {firstNames},',
      '',
      'We have received your pre-registration for the event "{event}".',
      'Our team will get back to you by e-mail with the next steps.',
      '',
      'Warm regards,',
      'Catho Tours International',
    ],
  },
  es: {
    subject: 'Tu preinscripción: {event}',
    body: [
      'Hola {firstNames},',
      '',
      'Hemos recibido tu preinscripción para el evento «{event}».',
      'Nuestro equipo se pondrá en contacto contigo por correo electrónico para los próximos pasos.',
      '',
      'Fraternalmente,',
      'Catho Tours International',
    ],
  },
  it: {
    subject: 'La tua preiscrizione: {event}',
    body: [
      'Ciao {firstNames},',
      '',
      'Abbiamo ricevuto la tua preiscrizione per l\'evento «{event}».',
      'Il nostro team ti contatterà via e-mail per i prossimi passi.',
      '',
      'Fraternamente,',
      'Catho Tours International',
    ],
  },
}

const oneLine = (s) => String(s).replace(/[\r\n]+/g, ' ').trim()
const fill = (template, d) =>
  template.replaceAll('{firstNames}', oneLine(d.firstNames)).replaceAll('{lastName}', oneLine(d.lastName)).replaceAll('{event}', oneLine(d.event))

export function acknowledgement(d) {
  const m = messages[d.lang] ?? messages.fr
  return { subject: oneLine(fill(m.subject, d)), text: fill(m.body.join('\n'), d) }
}
