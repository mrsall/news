document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('header nav button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      fetchNews(btn.dataset.cat);
    });
  });
  fetchNews('tech');
});

async function fetchNews(cat) {
  const newsDiv = document.getElementById('news');
  newsDiv.innerHTML = '<p>Chargement des actualités bihebdomadaires mondiales...</p>';
  try {
    const res = await fetch(`/api/${cat}`);
    const articles = await res.json();
    if (!articles.length) {
      newsDiv.innerHTML = '<p>Aucun article trouvé dans les deux dernières semaines.</p>';
      return;
    }
    newsDiv.innerHTML = articles.map(a => `
      <article class="card">
        <h2><a href="${a.url}" target="_blank">${a.title}</a></h2>
        <p>${a.description || ''}</p>
        <small>${new Date(a.publishedAt).toLocaleString('fr-FR')}</small>
      </article>
    `).join('');
  } catch {
    newsDiv.innerHTML = '<p>Erreur de chargement des actualités.</p>';
  }
}