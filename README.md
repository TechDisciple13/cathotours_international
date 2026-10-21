# Catho Tours International

Site officiel de Catho Tours International.

- `client/` : site React 19, TypeScript, Vite, Tailwind CSS
- `server/` : API Node.js / Express 5 (inscriptions et newsletter)
- `tools/inscriptions/Code.gs` : script Google Apps Script qui reçoit les données dans un Google Sheet

## Démarrage en développement (deux terminaux)

```
cd server
copy .env.example .env      (Windows ; cp .env.example .env sous Linux/macOS)
npm install
npm run dev
```

```
cd client
npm install
npm run dev
```

Le site est sur http://localhost:5173. Vite redirige `/api` vers le serveur (port 5000).

## Ce que fait l'API

- `POST /api/inscription` : valide, enregistre dans `server/data/inscriptions.json`, ajoute une ligne au Google Sheet (onglet Inscriptions), envoie une notification interne et, si le canal choisi est l'e-mail, un accusé de réception. Pour le canal WhatsApp, aucun message automatique n'est envoyé : la notification interne demande une confirmation manuelle.
- `POST /api/newsletter` : valide, enregistre dans `server/data/newsletters.json` (sans doublon) et ajoute une ligne à l'onglet Newsletter.
- Limite : 10 requêtes par 15 minutes et par adresse IP et par route. Un champ piège invisible (`website`) bloque les robots.
- Sans configuration, l'API fonctionne en stockage local uniquement : aucun Google Sheet, aucun e-mail.

## Configurer Google Sheets

1. Créer un Google Sheet, puis Extensions > Apps Script.
2. Coller le contenu de `tools/inscriptions/Code.gs`.
3. Paramètres du projet > Propriétés du script : ajouter `SECRET` avec une longue valeur aléatoire.
4. Déployer > Nouveau déploiement > Application Web. Exécuter en tant que : moi. Accès : tout le monde.
5. Copier l'URL de déploiement dans `APPS_SCRIPT_URL` et la même valeur secrète dans `APPS_SCRIPT_SECRET` (fichier `server/.env`).

## Configurer les e-mails (Gmail)

Activer la validation en deux étapes du compte, créer un mot de passe d'application, puis renseigner `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` et `NOTIFY_EMAIL` dans `server/.env`. Ne jamais utiliser le mot de passe du compte et ne jamais publier le fichier `.env`.

## Production

```
cd client && npm run build
cd ../server && set NODE_ENV=production && npm start
```

Le serveur sert alors `client/dist` et l'API sur le même port. Si le site est hébergé séparément (par exemple sur Vercel) : définir `VITE_API_URL` côté client et `CLIENT_ORIGIN` côté serveur. Sur un hébergeur à disque éphémère, les fichiers de `server/data/` sont perdus à chaque redéploiement : le Google Sheet est alors la seule trace durable.

## Images

Les images sont à déposer dans `client/public/assets/images/` avec les noms attendus : `logo-catho-tours.png`, `hero-groupe-jeunes.jpg`, `hero-rencontre-culturelle.jpg`, `hero-edifice-religieux.jpg`, `destination-togo.jpg`, `destination-benin.jpg`, `destination-ghana.jpg`, `destination-cote-divoire.jpg`, `actualite-1.jpg` à `actualite-4.jpg`, `temoignage-participant.jpg`, `temoignage-voyageurs.jpg`, `partenaire-1.png` à `partenaire-8.png`. Tant qu'un fichier est absent, un espace réservé s'affiche.
