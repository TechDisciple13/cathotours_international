# Guide de déploiement

Ce guide décrit la mise en ligne recommandée : le site sur Vercel et l'API sur un hébergeur Node (Render, Railway ou Fly).

## 1. Avant de commencer : prérequis bloquants

Le site ne doit pas être publié tant que ces points ne sont pas réglés :

1. Google Sheets configuré (voir README). Sur un hébergeur à disque éphémère, le fichier `server/data/` est effacé à chaque redéploiement : le Google Sheet est la seule trace durable des inscriptions.
2. SMTP configuré et testé avec un vrai envoi.
3. Politique de confidentialité : la case de consentement et la page existent, mais le texte contient des mentions entre crochets (responsable, hébergeur, durée de conservation, autorité compétente, date) à compléter, puis le texte doit être validé par un juriste.
4. Vrais contenus : logo, images, partenaires, textes, liste officielle des événements.
5. Relecture des traductions EN, ES et IT par un locuteur natif.

## 2. Le site sur Vercel

1. Importer le dépôt dans Vercel.
2. Root Directory : `client`.
3. Framework : Vite. Build : `npm run build`. Output : `dist`. Le fichier `client/vercel.json` gère déjà la réécriture vers `index.html` et les en-têtes.
4. Variable d'environnement : `VITE_API_URL` = adresse de l'API, sans barre finale (exemple : `https://api.mon-domaine.org`).
5. Déployer, puis ajouter le nom de domaine dans Vercel.

## 3. L'API sur Render (exemple)

1. Nouveau Web Service, Root Directory : `server`.
2. Build : `npm install`. Start : `npm start`.
3. Variables d'environnement (jamais dans le dépôt) :

| Variable | Valeur |
|---|---|
| `NODE_ENV` | `production` |
| `TRUST_PROXY` | `true` |
| `CLIENT_ORIGIN` | adresse exacte du site (exemple : `https://mon-domaine.org`), plusieurs valeurs séparées par des virgules |
| `NOTIFY_EMAIL` | adresse qui reçoit les notifications |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | accès SMTP (mot de passe d'application Gmail) |
| `APPS_SCRIPT_URL`, `APPS_SCRIPT_SECRET` | déploiement Apps Script et secret |

4. Vérifier `https://adresse-api/api/health` : la réponse doit être `{"ok":true}`.
5. Les offres gratuites mettent le service en veille : la première requête peut prendre plusieurs secondes.

## 4. Variante : tout sur un seul serveur

Construire le site (`cd client && npm run build`) puis lancer `NODE_ENV=production npm start` dans `server/`. Le serveur sert `client/dist` et l'API sur le même port, sans `VITE_API_URL` ni CORS.

## 5. Vérifications après la mise en ligne

1. Envoyer une vraie préinscription : la ligne apparaît dans le Sheet et les e-mails arrivent.
2. Tester le canal WhatsApp : seule la notification interne est envoyée.
3. Changer de langue sur chaque page, recharger, vérifier que le choix est conservé.
4. Ouvrir une adresse inexistante : la page 404 s'affiche.
5. Relancer les contrôles automatiques : `npm run check` dans `client` et `npm test` dans `server`.

## 6. Limites connues

- Une adresse inexistante affiche la page 404 mais le serveur répond avec le code HTTP 200 (comportement standard d'un site en une seule page). Les moteurs de recherche peuvent la traiter comme une page valide.
- Aucun plan de site (`sitemap.xml`) ni image de partage (Open Graph) n'est fourni : ils nécessitent le nom de domaine et une image officielle.
- Les accusés de réception sont envoyés en français uniquement.
