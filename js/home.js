/* ============================================
   JCZ MUSIC — home.js
============================================ */

function init() {
  setGreeting();
  renderHero();
  renderQuickGrid();
  renderTrending();
}

function setGreeting() {
  const h = new Date().getHours();
  const greetings = {
    morning:   "Selamat Pagi ☀️",
    afternoon: "Selamat Siang 🌤",
    evening:   "Selamat Sore 🌅",
    night:     "Selamat Malam 🌙"
  };
  const key = h < 11 ? 'morning' : h < 15 ? 'afternoon' : h < 18 ? 'evening' : 'night';
  document.getElementById('greetingText').textContent = greetings[key];
}

function renderHero() {
  const song = SONGS[0];
  document.getElementById('heroTitle').textContent  = song.title;
  document.getElementById('heroArtist').textContent = song.artist;
  document.getElementById('heroGenre').textContent  = `${song.genre} · ${song.album}`;
  document.getElementById('heroGlow').style.background =
    `radial-gradient(circle, ${song.color}44 0%, transparent 70%)`;
}

function playFromHero() {
  playSong(0);
  document.querySelector('.vinyl-disc')?.classList.add('spinning');
}

function renderQuickGrid() {
  const picks = SONGS.slice(0, 8);
  const grid = document.getElementById('quickGrid');
  document.getElementById('quickCount').textContent = picks.length + ' lagu';

  grid.innerHTML = picks.map(song => `
    <div class="quick-card fade-in" onclick="playSong(${song.id})">
      <div class="quick-card-art">
        <div style="width:100%;height:100%;background:${song.color};display:flex;align-items:center;justify-content:center;font-size:2.5rem;border-radius:8px">${song.emoji}</div>
        <div class="quick-card-overlay">
          <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
        </div>
      </div>
      <div class="quick-card-title">${song.title}</div>
      <div class="quick-card-artist">${song.artist}</div>
    </div>
  `).join('');
}

function renderTrending() {
  const trending = [...SONGS].sort(() => Math.random() - 0.5).slice(0, 8);
  const list = document.getElementById('trendingList');
  list.innerHTML = trending.map((song, i) => buildTrackRow(song, i, false)).join('');
}

document.addEventListener('DOMContentLoaded', init);
