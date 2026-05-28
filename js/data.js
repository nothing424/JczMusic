/* ============================================
   JCZ MUSIC — data.js
   Song library & shared state
============================================ */

const SONGS = [
  {
    id: 0,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    genre: "Pop",
    duration: 200,
    emoji: "🌙",
    color: "#c9314c",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 1,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    genre: "Pop",
    duration: 204,
    emoji: "✨",
    color: "#7b5caa",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 2,
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3",
    genre: "Pop",
    duration: 141,
    emoji: "💙",
    color: "#2d6bbf",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 3,
    title: "montero",
    artist: "Lil Nas X",
    album: "MONTERO",
    genre: "Hip-Hop",
    duration: 137,
    emoji: "🔥",
    color: "#c47c1a",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 4,
    title: "good 4 u",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    genre: "Pop-Rock",
    duration: 178,
    emoji: "💚",
    color: "#2d8f4e",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    id: 5,
    title: "Peaches",
    artist: "Justin Bieber ft. Daniel Caesar",
    album: "Justice",
    genre: "R&B",
    duration: 198,
    emoji: "🍑",
    color: "#d4783a",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    id: 6,
    title: "Kiss Me More",
    artist: "Doja Cat ft. SZA",
    album: "Planet Her",
    genre: "R&B",
    duration: 208,
    emoji: "💋",
    color: "#c92060",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    id: 7,
    title: "Astronaut in the Ocean",
    artist: "Masked Wolf",
    album: "Astronomical",
    genre: "Hip-Hop",
    duration: 132,
    emoji: "🌊",
    color: "#1a5e8f",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  },
  {
    id: 8,
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    genre: "Synth-pop",
    duration: 215,
    emoji: "🌧️",
    color: "#5c2d91",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
  },
  {
    id: 9,
    title: "Butter",
    artist: "BTS",
    album: "Butter",
    genre: "K-Pop",
    duration: 164,
    emoji: "🧈",
    color: "#d4a017",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
  },
  {
    id: 10,
    title: "Shivers",
    artist: "Ed Sheeran",
    album: "=",
    genre: "Pop",
    duration: 207,
    emoji: "🎵",
    color: "#e05b1a",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3"
  },
  {
    id: 11,
    title: "Happier Than Ever",
    artist: "Billie Eilish",
    album: "Happier Than Ever",
    genre: "Alt-Pop",
    duration: 295,
    emoji: "🖤",
    color: "#3a8f6b",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"
  },
  {
    id: 12,
    title: "Essence",
    artist: "Wizkid ft. Tems",
    album: "Made In Lagos",
    genre: "Afrobeats",
    duration: 253,
    emoji: "🌍",
    color: "#8f5c1a",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3"
  },
  {
    id: 13,
    title: "Heat Waves",
    artist: "Glass Animals",
    album: "Dreamland",
    genre: "Indie",
    duration: 238,
    emoji: "🌊",
    color: "#2d7ab5",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3"
  },
  {
    id: 14,
    title: "Industry Baby",
    artist: "Lil Nas X & Jack Harlow",
    album: "MONTERO",
    genre: "Hip-Hop",
    duration: 212,
    emoji: "🏭",
    color: "#c9a020",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"
  },
  {
    id: 15,
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    genre: "Pop",
    duration: 174,
    emoji: "🍉",
    color: "#e05b5b",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3"
  }
];

const GENRES = [
  { name: "Pop",       emoji: "🎤", color: "#c9314c", bg: "linear-gradient(135deg, #c9314c, #7b1a3a)" },
  { name: "Hip-Hop",   emoji: "🎧", color: "#c47c1a", bg: "linear-gradient(135deg, #c47c1a, #6b3a00)" },
  { name: "R&B",       emoji: "🎶", color: "#7b5caa", bg: "linear-gradient(135deg, #7b5caa, #3a1a6b)" },
  { name: "Indie",     emoji: "🌿", color: "#2d8f4e", bg: "linear-gradient(135deg, #2d8f4e, #0a4a20)" },
  { name: "K-Pop",     emoji: "✨", color: "#c92060", bg: "linear-gradient(135deg, #c92060, #6b0a30)" },
  { name: "Afrobeats", emoji: "🌍", color: "#8f5c1a", bg: "linear-gradient(135deg, #8f5c1a, #4a2a00)" },
  { name: "Alt-Pop",   emoji: "🖤", color: "#3a8f6b", bg: "linear-gradient(135deg, #3a8f6b, #0a4a30)" },
  { name: "Synth-pop", emoji: "🎹", color: "#5c2d91", bg: "linear-gradient(135deg, #5c2d91, #20104a)" },
  { name: "Pop-Rock",  emoji: "🎸", color: "#2d6bbf", bg: "linear-gradient(135deg, #2d6bbf, #0a2a6b)" },
];

/* === SHARED STATE (localStorage) === */
const STATE = {
  getPlaylist() {
    try { return JSON.parse(localStorage.getItem('jcz_playlist') || '[]'); }
    catch { return []; }
  },
  setPlaylist(ids) {
    localStorage.setItem('jcz_playlist', JSON.stringify(ids));
  },
  addToPlaylist(id) {
    const pl = this.getPlaylist();
    if (!pl.includes(id)) {
      pl.push(id);
      this.setPlaylist(pl);
      return true;
    }
    return false;
  },
  removeFromPlaylist(id) {
    const pl = this.getPlaylist().filter(i => i !== id);
    this.setPlaylist(pl);
  },
  isInPlaylist(id) {
    return this.getPlaylist().includes(id);
  },
  getLiked() {
    try { return JSON.parse(localStorage.getItem('jcz_liked') || '[]'); }
    catch { return []; }
  },
  toggleLike(id) {
    const liked = this.getLiked();
    const idx = liked.indexOf(id);
    if (idx === -1) liked.push(id);
    else liked.splice(idx, 1);
    localStorage.setItem('jcz_liked', JSON.stringify(liked));
    return idx === -1;
  },
  isLiked(id) {
    return this.getLiked().includes(id);
  }
};

/* === UTILS === */
function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2,'0')}`;
}

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2200);
}

function addToPlaylist(id) {
  const added = STATE.addToPlaylist(id);
  const song = SONGS.find(s => s.id === id);
  if (added) showToast(`✓  "${song.title}" ditambahkan ke playlist`);
  else showToast(`"${song.title}" sudah ada di playlist`);
}
