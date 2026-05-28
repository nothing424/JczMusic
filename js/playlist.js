/* ============================================
   JCZ MUSIC — playlist.js
============================================ */

function init() {
  renderPlaylist();
}

function renderPlaylist() {
  const ids = STATE.getPlaylist();
  const songs = ids.map(id => SONGS.find(s => s.id === id)).filter(Boolean);

  const list    = document.getElementById('playlistTracks');
  const empty   = document.getElementById('emptyPlaylist');
  const meta    = document.getElementById('playlistMeta');
  const collage = document.getElementById('artCollage');

  if (songs.length === 0) {
    list.style.display  = 'none';
    empty.style.display = 'block';
    meta.textContent    = '0 lagu · 0 menit';
    collage.innerHTML   = '';
    return;
  }

  list.style.display  = 'flex';
  empty.style.display = 'none';

  const totalSec = songs.reduce((a, s) => a + s.duration, 0);
  const mins = Math.floor(totalSec / 60);
  meta.textContent = `${songs.length} lagu · ${mins} menit`;

  // Art collage (up to 4)
  const artSongs = songs.slice(0, 4);
  collage.innerHTML = artSongs.map(s =>
    `<div class="collage-cell" style="background:${s.color}">
       <span style="font-size:1.4rem">${s.emoji}</span>
     </div>`
  ).join('');
  if (artSongs.length > 0) {
    document.getElementById('playlistHeroArt')?.classList.add('has-art');
  }

  // Queue
  currentQueue = songs.map(s => s.id);

  list.innerHTML = songs.map((s, i) => buildTrackRow(s, i, true)).join('');
}

function removeTrack(id) {
  STATE.removeFromPlaylist(id);
  const song = SONGS.find(s => s.id === id);
  showToast(`"${song?.title}" dihapus dari playlist`);
  renderPlaylist();
}

function playPlaylist() {
  const ids = STATE.getPlaylist();
  if (ids.length === 0) { showToast('Playlist kosong!'); return; }
  currentQueue = ids;
  currentQueueIndex = 0;
  playSong(ids[0]);
}

function shufflePlaylist() {
  const ids = STATE.getPlaylist();
  if (ids.length === 0) { showToast('Playlist kosong!'); return; }
  const shuffled = [...ids].sort(() => Math.random() - 0.5);
  currentQueue = shuffled;
  currentQueueIndex = 0;
  isShuffle = true;
  document.getElementById('btnShuffle')?.classList.add('active');
  playSong(shuffled[0]);
}

document.addEventListener('DOMContentLoaded', init);
