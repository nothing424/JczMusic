/* ============================================
   JCZ MUSIC — search.js
============================================ */

function init() {
  renderGenres();
}

function renderGenres() {
  const grid = document.getElementById('genreGrid');
  grid.innerHTML = GENRES.map(g => {
    const count = SONGS.filter(s => s.genre === g.name).length;
    return `
      <div class="genre-card" style="background:${g.bg}" onclick="filterByGenre('${g.name}')">
        <span class="genre-emoji">${g.emoji}</span>
        <div class="genre-name">${g.name}</div>
        <div class="genre-count">${count} lagu</div>
      </div>`;
  }).join('');
}

function filterByGenre(genre) {
  document.getElementById('searchInput').value = genre;
  handleSearch(genre);
}

function handleSearch(query) {
  const q = query.toLowerCase().trim();
  const clear = document.getElementById('searchClear');
  const browse = document.getElementById('browseSection');
  const results = document.getElementById('resultsSection');
  const noRes = document.getElementById('noResults');

  if (clear) clear.style.display = q ? 'flex' : 'none';

  if (!q) {
    browse.style.display   = 'block';
    results.style.display  = 'none';
    noRes.style.display    = 'none';
    return;
  }

  browse.style.display = 'none';

  const filtered = SONGS.filter(s =>
    s.title.toLowerCase().includes(q) ||
    s.artist.toLowerCase().includes(q) ||
    s.genre.toLowerCase().includes(q) ||
    s.album.toLowerCase().includes(q)
  );

  if (filtered.length === 0) {
    results.style.display = 'none';
    noRes.style.display   = 'block';
    return;
  }

  noRes.style.display   = 'none';
  results.style.display = 'block';
  document.getElementById('resultsCount').textContent = filtered.length + ' lagu';
  document.getElementById('searchResults').innerHTML =
    filtered.map((s, i) => buildTrackRow(s, i, false)).join('');
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  input.value = '';
  input.focus();
  handleSearch('');
}

document.addEventListener('DOMContentLoaded', init);
