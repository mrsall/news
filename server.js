require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.NEWS_API_KEY;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/:category', async (req, res) => {
  const { category } = req.params;
  const now = new Date();
  const twoWeeksAgo = new Date(now);
  twoWeeksAgo.setDate(now.getDate() - 14);
  const from = twoWeeksAgo.toISOString();
  const to = now.toISOString();

  let query;
  switch (category) {
    case 'tech': query = 'technology'; break;
    case 'games': query = 'video games'; break;
    case 'cinema': query = 'cinema'; break;
    default:
      return res.status(400).json({ error: 'Catégorie invalide' });
  }

  // Requête globale sans filtre de langue pour couvrir tous les sites
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&from=${from}&to=${to}&sortBy=publishedAt&pageSize=100&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data.articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des actualités' });
  }
});

// Route front-end
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));