# Biweekly News Site

## Prérequis
- Node.js (>=14) installé
- Clé API NewsAPI (https://newsapi.org/) obtenue

## Installation et démarrage
1. Dézippez ce dossier.
2. Placez votre clé API dans `.env` :
   ```
   NEWS_API_KEY=VOTRE_CLE_API
   ```
3. Windows : double-cliquez sur `run.bat`  
   macOS/Linux : exécutez `./start.sh`
4. Accédez à `http://localhost:3000` pour consulter les actualités bihebdomadaires **mondiales**.

## Déploiement
- Hébergez sur Heroku, Vercel, etc.
- Ajoutez `NEWS_API_KEY` dans vos variables d'environnement.
