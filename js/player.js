/* ============================================
   JCZ MUSIC — player.js
   Core audio engine, shared across all pages
============================================ */

const audio = document.getElementById('audioPlayer');
let currentSongId = null;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let currentQueue = SONGS.map(s => s.id);
let currentQueueIndex = -1;

/* === PLAY A SONG === */
function playSong(id) {
  const song = SONGS.find(s => s.id === id);
  if (!song) return;

  currentSongId = id;
  currentQueueIndex = currentQueue.indexOf(id);

  audio.src = song.src;
  audio.volume = (document.getElementById('volumeSlider')?.value || 80) / 100;
  audio.play().catch(() => {});

  isPlaying = true;
  updatePlayerUI(song);
  updateAllTrackRows(id);
}

function updatePlayerUI(song) {
  const el = (id) => document.getElementById(id);

  if (el('playerTitle'))  el('playerTitle').textContent  = song.title;
  if (el('playerArtist')) el('playerArtist').textContent = song.artist;

  // Art
  const art = el('playerArt');
  if (art) art.innerHTML = `<div style="width:100%;height:100%;background:${song.color};display:flex;align-items:center;justify-content:center;font-size:1.5rem;border-radius:8px">${song.emoji}</div>`;

  // Play/Pause icons
  const ppBtn = el('btnPlayPause');
  if (ppBtn) {
    ppBtn.querySelector('.icon-play').style.display  = 'none';
    ppBtn.querySelector('.icon-pause').style.display = 'block';
  }

  // Heart
  const heart = el('btnHeart');
  if (heart) heart.classList.toggle('active', STATE.isLiked(song.id));

  // Sidebar mini
  if (el('miniTitle'))  el('miniTitle').textContent  = song.title;
  if (el('miniArtist')) el('miniArtist').textContent = song.artist;
  const miniArt = el('miniArt');
  if (miniArt) miniArt.innerHTML = `<div style="width:100%;height:100%;background:${song.color};display:flex;align-items:center;justify-content:center;font-size:1rem;border-radius:4px">${song.emoji}</div>`;

  // Vinyl spin
  const vinyl = document.querySelector('.vinyl-disc');
  if (vinyl) vinyl.classList.add('spinning');

  document.title = `${song.title} — Jcz Music`;
}

function updateAllTrackRows(id) {
  document.querySelectorAll('.track-row').forEach(row => {
    const rowId = parseInt(row.dataset.id);
    row.classList.toggle('active', rowId === id);
    row.classList.toggle('playing', rowId === id && isPlaying);
  });
}

/* === PLAY/PAUSE TOGGLE === */
function togglePlay() {
  if (currentSongId === null) {
    playSong(currentQueue[0]);
    return;
  }
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play().catch(() => {});
    isPlaying = true;
  }
  syncPlayPauseIcons();
  updateAllTrackRows(currentSongId);
}

function syncPlayPauseIcons() {
  const ppBtn = document.getElementById('btnPlayPause');
  if (!ppBtn) return;
  ppBtn.querySelector('.icon-play').style.display  = isPlaying ? 'none'  : 'block';
  ppBtn.querySelector('.icon-pause').style.display = isPlaying ? 'block' : 'none';
  const vinyl = document.querySelector('.vinyl-disc');
  if (vinyl) vinyl.classList.toggle('spinning', isPlaying);
}

/* === PREV / NEXT === */
function nextTrack() {
  if (currentQueue.length === 0) return;
  if (isShuffle) {
    currentQueueIndex = Math.floor(Math.random() * currentQueue.length);
  } else {
    currentQueueIndex = (currentQueueIndex + 1) % currentQueue.length;
  }
  playSong(currentQueue[currentQueueIndex]);
}

function prevTrack() {
  if (audio.currentTime > 3) { audio.currentTime = 0; return; }
  if (currentQueue.length === 0) return;
  currentQueueIndex = (currentQueueIndex - 1 + currentQueue.length) % currentQueue.length;
  playSong(currentQueue[currentQueueIndex]);
}

/* === SHUFFLE / REPEAT === */
function shuffleToggle() {
  isShuffle = !isShuffle;
  document.getElementById('btnShuffle')?.classList.toggle('active', isShuffle);
  showToast(isShuffle ? '🔀 Shuffle aktif' : 'Shuffle nonaktif');
}

function repeatToggle() {
  isRepeat = !isRepeat;
  document.getElementById('btnRepeat')?.classList.toggle('active', isRepeat);
  showToast(isRepeat ? '🔁 Repeat aktif' : 'Repeat nonaktif');
}

/* === SEEK === */
function seekTo(e) {
  const bar = document.getElementById('progressBar');
  if (!bar || !audio.duration) return;
  const rect = bar.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  audio.currentTime = pct * audio.duration;
}

/* === VOLUME === */
function setVolume(val) {
  audio.volume = val / 100;
}

/* === HEART === */
function toggleHeart() {
  if (currentSongId === null) return;
  const liked = STATE.toggleLike(currentSongId);
  document.getElementById('btnHeart')?.classList.toggle('active', liked);
  showToast(liked ? '❤️ Ditambahkan ke favorit' : 'Dihapus dari favorit');
}

/* === AUDIO EVENTS === */
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  const fill  = document.getElementById('progressFill');
  const thumb = document.getElementById('progressThumb');
  const cur   = document.getElementById('timeCurrent');
  if (fill)  fill.style.width = pct + '%';
  if (thumb) thumb.style.left = pct + '%';
  if (cur)   cur.textContent  = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  const tot = document.getElementById('timeTotal');
  if (tot) tot.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
  if (isRepeat) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } else {
    nextTrack();
  }
});

audio.addEventListener('play',  () => { isPlaying = true;  syncPlayPauseIcons(); updateAllTrackRows(currentSongId); });
audio.addEventListener('pause', () => { isPlaying = false; syncPlayPauseIcons(); updateAllTrackRows(currentSongId); });

/* === MOBILE SIDEBAR === */
document.getElementById('menuToggle')?.addEventListener('click', () => {
  document.getElementById('sidebar')?.classList.toggle('open');
});

/* === BUILD TRACK ROW HTML === */
function buildTrackRow(song, index, showRemove = false) {
  const isActive = song.id === currentSongId;
  const isPlaying_ = isActive && isPlaying;
  return `
    <div class="track-row ${isActive ? 'active' : ''} ${isPlaying_ ? 'playing' : ''}"
         data-id="${song.id}"
         onclick="playSong(${song.id})">
      <div class="track-num">
        <span class="num-text">${index + 1}</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:center;width:36px">
        <div class="track-play-icon" style="width:36px">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><polygon points="5,3 19,12 5,21"/></svg>
        </div>
        <div class="eq-bars">
          <div class="eq-bar"></div>
          <div class="eq-bar"></div>
          <div class="eq-bar"></div>
          <div class="eq-bar"></div>
        </div>
      </div>
      <div class="track-art">
        <div style="width:100%;height:100%;background:${song.color};display:flex;align-items:center;justify-content:center;font-size:1.3rem;border-radius:6px">${song.emoji}</div>
      </div>
      <div class="track-info">
        <span class="track-title">${song.title}</span>
        <span class="track-artist">${song.artist}</span>
      </div>
      <span class="track-duration">${formatTime(song.duration)}</span>
      <div class="track-actions">
        ${showRemove
          ? `<button class="track-action-btn track-remove" onclick="event.stopPropagation();removeTrack(${song.id})" title="Hapus">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
             </button>`
          : `<button class="track-action-btn" onclick="event.stopPropagation();addToPlaylist(${song.id})" title="Tambah ke playlist">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
             </button>`
        }
      </div>
    </div>`;
}
