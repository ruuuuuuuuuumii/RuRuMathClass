// ==========================================
// Ru's math class - 國中數學自主練習場
// 七年級：質數館 (射氣球 + 25質數圖鑑)
// 八年級：平方根館 (左邊 n ⟷ 右邊 n² 雙向配對)
// ==========================================

// ------------------------------------------
// 七年級：質數資料庫
// ------------------------------------------
const PRIMES_UNDER_100 = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
  31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97
];

const PRIME_SET = new Set(PRIMES_UNDER_100);

const PRIME_GROUPS = [
  { label: '個位數 (4個)', primes: [2, 3, 5, 7] },
  { label: '10 幾 (4個)', primes: [11, 13, 17, 19] },
  { label: '20 幾 (2個)', primes: [23, 29] },
  { label: '30 幾 (2個)', primes: [31, 37] },
  { label: '40 幾 (3個)', primes: [41, 43, 47] },
  { label: '50 幾 (2個)', primes: [53, 59] },
  { label: '60 幾 (2個)', primes: [61, 67] },
  { label: '70 幾 (3個)', primes: [71, 73, 79] },
  { label: '80 幾 (2個)', primes: [83, 89] },
  { label: '90 幾 (1個)', primes: [97] }
];

const TRICKY_COMPOSITES = [1, 49, 51, 57, 77, 87, 91, 39, 63, 69, 93, 27, 33];

function getFactorExplanation(n) {
  if (n === 1) return '1 不是質數也不是合數（只有 1 個因數）';
  if (PRIME_SET.has(n)) return `${n} 是質數！`;
  
  for (let p of [2, 3, 5, 7, 11, 13, 17]) {
    if (n % p === 0) {
      const other = n / p;
      return `${n} = ${p} × ${other} 是合數！`;
    }
  }
  return `${n} 是合數！`;
}

// ------------------------------------------
// 八年級：完全平方數資料庫 (11 ~ 32)
// ------------------------------------------
const SQUARE_DATA = [
  { base: 11, square: 121 },
  { base: 12, square: 144 },
  { base: 13, square: 169 },
  { base: 14, square: 196 },
  { base: 15, square: 225 },
  { base: 16, square: 256 },
  { base: 17, square: 289 },
  { base: 18, square: 324 },
  { base: 19, square: 361 },
  { base: 20, square: 400 },
  { base: 21, square: 441 },
  { base: 22, square: 484 },
  { base: 23, square: 529 },
  { base: 24, square: 576 },
  { base: 25, square: 625 },
  // 高手挑戰 (26~32)
  { base: 26, square: 676 },
  { base: 27, square: 729 },
  { base: 28, square: 784 },
  { base: 29, square: 841 },
  { base: 30, square: 900 },
  { base: 31, square: 961 },
  { base: 32, square: 1024 }
];

const CORE_SQUARE_DATA = SQUARE_DATA.filter(item => item.base <= 25);

// ==========================================
// 音效系統 (Web Audio API)
// ==========================================
class SoundFX {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  playHit() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    [440, 660, 880].forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);
      gain.gain.setValueAtTime(0.2, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.04 + 0.15);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.15);
    });
  }

  playBuzz() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.25);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    const now = this.audioCtx.currentTime;
    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0.25, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.3);
    });
  }
}

const sound = new SoundFX();

// ==========================================
// LocalStorage 進度管理
// ==========================================
const KEY_PRIMES = 'rus_math_unlocked_primes_v1';
const KEY_SQUARES = 'rus_math_unlocked_squares_v1';

let activeGrade = 'home-portal';

function getUnlockedPrimes() {
  try {
    const raw = localStorage.getItem(KEY_PRIMES);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    return new Set();
  }
}

function saveUnlockedPrime(p) {
  const numVal = parseInt(p, 10);
  if (!PRIME_SET.has(numVal)) return;
  const current = getUnlockedPrimes();
  const prevSize = current.size;
  current.add(numVal);
  try {
    localStorage.setItem(KEY_PRIMES, JSON.stringify(Array.from(current)));
  } catch (e) {
    console.warn('儲存質數失敗:', e);
  }
  updateHeaderAndCodexUI();

  if (prevSize < 25 && current.size === 25) {
    sound.playFanfare();
    showGlobalFeedback('🎉 太神了！收集滿 25 個質數，解鎖榮譽證書！', 'success');
  }
}

function getUnlockedSquares() {
  try {
    const raw = localStorage.getItem(KEY_SQUARES);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    return new Set();
  }
}

function saveUnlockedSquare(base) {
  const baseVal = parseInt(base, 10);
  const current = getUnlockedSquares();
  const prevSize = current.size;
  current.add(baseVal);
  try {
    localStorage.setItem(KEY_SQUARES, JSON.stringify(Array.from(current)));
  } catch (e) {
    console.warn('儲存平方數失敗:', e);
  }
  updateHeaderAndCodexUI();

  if (prevSize < 22 && current.size >= 22) {
    sound.playFanfare();
    showGlobalFeedback('🎉 恭喜！11~32 完全平方數已全數掌握，解鎖八年級王者大師證書！', 'success');
  }
}

function resetAllPrimeProgress() {
  if (confirm('確定要清空七年級質數紀錄重新挑戰嗎？\n（證書將會重新鎖定，直到再次收齊 25 個質數）')) {
    localStorage.removeItem(KEY_PRIMES);
    updateHeaderAndCodexUI();
    showGlobalFeedback('七年級質數進度已重置！', 'success');
  }
}

function resetAllSquareProgress() {
  if (confirm('確定要清空八年級完全平方數紀錄重新挑戰嗎？\n（證書將會重新鎖定，直到再次收齊 22 組平方數）')) {
    localStorage.removeItem(KEY_SQUARES);
    updateHeaderAndCodexUI();
    showGlobalFeedback('八年級平方數進度已重置！', 'success');
  }
}

// ==========================================
// 排行榜 LocalStorage 管理與渲染 (Leaderboards)
// ==========================================
const KEY_LEADERBOARD_PRIME = 'rus_math_leaderboard_prime_v1';
const KEY_LEADERBOARD_SQUARE = 'rus_math_leaderboard_square_v1';
const KEY_SAVED_PLAYER_NAME = 'rus_math_player_name';

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

function getGrade7Leaderboard() {
  try {
    const raw = localStorage.getItem(KEY_LEADERBOARD_PRIME);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveGrade7LeaderboardEntry(entry) {
  const list = getGrade7Leaderboard();
  list.push(entry);
  // 排序：分數最高最優；同分則準確率最高者優先；同準確率則最新紀錄優先
  list.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
    return b.id - a.id;
  });
  const trimmed = list.slice(0, 50);
  try {
    localStorage.setItem(KEY_LEADERBOARD_PRIME, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('儲存七年級排行榜失敗:', e);
  }
}

let currentGrade7LeaderboardFilter = 'all';
let highlightedGrade7Id = null;

function renderGrade7Leaderboard(filter = currentGrade7LeaderboardFilter) {
  currentGrade7LeaderboardFilter = filter;
  const tbody = document.getElementById('prime-leaderboard-body');
  const emptyEl = document.getElementById('prime-leaderboard-empty');
  if (!tbody) return;

  const allRecords = getGrade7Leaderboard();
  let filtered = allRecords;
  if (filter !== 'all') {
    filtered = allRecords.filter(r => String(r.rangeMax) === String(filter));
  }

  tbody.innerHTML = '';
  if (filtered.length === 0) {
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }
  if (emptyEl) emptyEl.classList.add('hidden');

  filtered.forEach((r, idx) => {
    const rank = idx + 1;
    let rankBadgeHtml = '';
    if (rank === 1) rankBadgeHtml = '<span class="rank-badge rank-1" title="冠軍">🥇</span>';
    else if (rank === 2) rankBadgeHtml = '<span class="rank-badge rank-2" title="亞軍">🥈</span>';
    else if (rank === 3) rankBadgeHtml = '<span class="rank-badge rank-3" title="季軍">🥉</span>';
    else rankBadgeHtml = `<span class="rank-badge rank-other">${rank}</span>`;

    const tr = document.createElement('tr');
    if (highlightedGrade7Id && r.id === highlightedGrade7Id) {
      tr.classList.add('newly-submitted-row');
    }
    tr.innerHTML = `
      <td>${rankBadgeHtml}</td>
      <td class="td-name">${escapeHtml(r.name || '質數神射手')}</td>
      <td><span class="score-highlight">${r.score} 分</span></td>
      <td><span class="level-tag-pill">${r.rangeName || (r.rangeMax ? '1~' + r.rangeMax : '一般')}</span></td>
      <td><span class="date-text">${r.date || '-'}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function setupGrade7Leaderboard() {
  const filterBtns = document.querySelectorAll('#prime-leaderboard-filters .filter-pill');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrade7Leaderboard(btn.dataset.filter);
    });
  });

  const btnClear = document.getElementById('btn-clear-prime-leaderboard');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (confirm('確定要清除質數館的本機英雄榜紀錄嗎？\n（此操作無法復原）')) {
        localStorage.removeItem(KEY_LEADERBOARD_PRIME);
        highlightedGrade7Id = null;
        renderGrade7Leaderboard();
        showGlobalFeedback('質數館英雄榜紀錄已清除！', 'success');
      }
    });
  }

  const btnGoBalloon = document.getElementById('btn-go-balloon-from-leaderboard');
  if (btnGoBalloon) {
    btnGoBalloon.addEventListener('click', () => {
      document.querySelector('#grade-7-prime-pavilion .sub-tab-btn[data-subtarget="balloon-view"]').click();
    });
  }

  const btnToLeaderboard = document.getElementById('btn-balloon-to-leaderboard');
  if (btnToLeaderboard) {
    btnToLeaderboard.addEventListener('click', () => {
      document.querySelector('#grade-7-prime-pavilion .sub-tab-btn[data-subtarget="prime-leaderboard-view"]').click();
    });
  }

  const btnSubmitScore = document.getElementById('btn-submit-balloon-score');
  const nameInput = document.getElementById('balloon-player-name');

  const submitGrade7Score = () => {
    if (!balloonGame.lastResult || (btnSubmitScore && btnSubmitScore.disabled)) return;
    
    // 立即禁用防止重複連點
    if (btnSubmitScore) {
      btnSubmitScore.disabled = true;
      btnSubmitScore.textContent = '已登錄 ✓';
    }

    let nameVal = (nameInput ? nameInput.value.trim() : '');
    if (!nameVal) nameVal = '質數神射手';

    try {
      localStorage.setItem(KEY_SAVED_PLAYER_NAME, nameVal);
    } catch (e) {}

    const now = new Date();
    const dateStr = `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const names = { 30: '1~30 暖身區', 60: '1~60 進階區', 100: '1~100 全制霸' };

    const newId = Date.now();
    const entry = {
      id: newId,
      name: nameVal,
      score: balloonGame.lastResult.score,
      hits: balloonGame.lastResult.hits,
      accuracy: balloonGame.lastResult.accuracy,
      rangeMax: balloonGame.lastResult.rangeMax,
      rangeName: names[balloonGame.lastResult.rangeMax] || `${balloonGame.lastResult.rangeMax} 以內`,
      date: dateStr
    };

    saveGrade7LeaderboardEntry(entry);
    balloonGame.lastResult = null; // 登記後清空，杜絕重複提交
    highlightedGrade7Id = newId;

    sound.playMatch();
    showGlobalFeedback('🎉 英雄榜登錄成功！為您跳轉排行榜', 'success');

    // 關閉遊戲結束覆蓋層
    const overlay = document.getElementById('balloon-gameover-overlay');
    if (overlay) overlay.classList.add('hidden');

    // 重設篩選為「全部」，確保剛登錄的成績一定看得到
    const allFilterBtn = document.querySelector('#prime-leaderboard-filters .filter-pill[data-filter="all"]');
    if (allFilterBtn) {
      document.querySelectorAll('#prime-leaderboard-filters .filter-pill').forEach(b => b.classList.remove('active'));
      allFilterBtn.classList.add('active');
      currentGrade7LeaderboardFilter = 'all';
    }

    // 直接切換跳轉至英雄榜分頁
    const targetTab = document.querySelector('#grade-7-prime-pavilion .sub-tab-btn[data-subtarget="prime-leaderboard-view"]');
    if (targetTab) {
      targetTab.click();
    }
  };

  if (btnSubmitScore) {
    btnSubmitScore.addEventListener('click', submitGrade7Score);
  }
  if (nameInput) {
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitGrade7Score();
      }
    });
  }
}

function getGrade8Leaderboard() {
  try {
    const raw = localStorage.getItem(KEY_LEADERBOARD_SQUARE);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveGrade8LeaderboardEntry(entry) {
  const list = getGrade8Leaderboard();
  list.push(entry);
  // 排序：通關秒數最短最優；同秒數則嘗試次數最少優先；同次數則最新紀錄優先
  list.sort((a, b) => {
    if (a.seconds !== b.seconds) return a.seconds - b.seconds;
    if (a.moves !== b.moves) return a.moves - b.moves;
    return b.id - a.id;
  });
  const trimmed = list.slice(0, 50);
  try {
    localStorage.setItem(KEY_LEADERBOARD_SQUARE, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('儲存八年級排行榜失敗:', e);
  }
}

let currentGrade8LeaderboardFilter = 'all';
let highlightedGrade8Id = null;

function renderGrade8Leaderboard(filter = currentGrade8LeaderboardFilter) {
  currentGrade8LeaderboardFilter = filter;
  const tbody = document.getElementById('square-leaderboard-body');
  const emptyEl = document.getElementById('square-leaderboard-empty');
  if (!tbody) return;

  const allRecords = getGrade8Leaderboard();
  let filtered = allRecords;
  if (filter !== 'all') {
    filtered = allRecords.filter(r => r.level === filter);
  }

  tbody.innerHTML = '';
  if (filtered.length === 0) {
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }
  if (emptyEl) emptyEl.classList.add('hidden');

  filtered.forEach((r, idx) => {
    const rank = idx + 1;
    let rankBadgeHtml = '';
    if (rank === 1) rankBadgeHtml = '<span class="rank-badge rank-1" title="冠軍">🥇</span>';
    else if (rank === 2) rankBadgeHtml = '<span class="rank-badge rank-2" title="亞軍">🥈</span>';
    else if (rank === 3) rankBadgeHtml = '<span class="rank-badge rank-3" title="季軍">🥉</span>';
    else rankBadgeHtml = `<span class="rank-badge rank-other">${rank}</span>`;

    const tr = document.createElement('tr');
    if (highlightedGrade8Id && r.id === highlightedGrade8Id) {
      tr.classList.add('newly-submitted-row');
    }
    tr.innerHTML = `
      <td>${rankBadgeHtml}</td>
      <td class="td-name">${escapeHtml(r.name || '速算王者')}</td>
      <td><span class="time-highlight">${r.seconds} 秒</span></td>
      <td><span class="level-tag-pill">${r.levelName || r.level}</span></td>
      <td><span class="date-text">${r.date || '-'}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function setupGrade8Leaderboard() {
  const filterBtns = document.querySelectorAll('#square-leaderboard-filters .filter-pill');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrade8Leaderboard(btn.dataset.filter);
    });
  });

  const btnClear = document.getElementById('btn-clear-square-leaderboard');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (confirm('確定要清除平方根館的本機極速榜紀錄嗎？\n（此操作無法復原）')) {
        localStorage.removeItem(KEY_LEADERBOARD_SQUARE);
        highlightedGrade8Id = null;
        renderGrade8Leaderboard();
        showGlobalFeedback('平方根館極速榜紀錄已清除！', 'success');
      }
    });
  }

  const btnGoSquare = document.getElementById('btn-go-square-from-leaderboard');
  if (btnGoSquare) {
    btnGoSquare.addEventListener('click', () => {
      document.querySelector('#grade-8-square-pavilion .sub-tab-btn[data-subtarget="card-view"]').click();
    });
  }

  const btnToLeaderboard = document.getElementById('btn-card-to-leaderboard');
  if (btnToLeaderboard) {
    btnToLeaderboard.addEventListener('click', () => {
      document.querySelector('#grade-8-square-pavilion .sub-tab-btn[data-subtarget="square-leaderboard-view"]').click();
    });
  }

  const btnSubmitScore = document.getElementById('btn-submit-card-score');
  const nameInput = document.getElementById('card-player-name');

  const submitGrade8Score = () => {
    if (!dualMatchGame.lastResult || (btnSubmitScore && btnSubmitScore.disabled)) return;
    
    // 立即禁用防止重複連點
    if (btnSubmitScore) {
      btnSubmitScore.disabled = true;
      btnSubmitScore.textContent = '已登錄 ✓';
    }

    let nameVal = (nameInput ? nameInput.value.trim() : '');
    if (!nameVal) nameVal = '速算高手';

    try {
      localStorage.setItem(KEY_SAVED_PLAYER_NAME, nameVal);
    } catch (e) {}

    const now = new Date();
    const dateStr = `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const levelNames = {
      warmup: '11~16 暖身區',
      core: '11~20 核心區',
      target: '11~25 目標區',
      master: '11~32 王者區'
    };

    const newId = Date.now();
    const entry = {
      id: newId,
      name: nameVal,
      seconds: dualMatchGame.lastResult.seconds,
      moves: dualMatchGame.lastResult.moves,
      stars: dualMatchGame.lastResult.stars,
      level: dualMatchGame.lastResult.level,
      levelName: levelNames[dualMatchGame.lastResult.level] || dualMatchGame.lastResult.level,
      date: dateStr
    };

    saveGrade8LeaderboardEntry(entry);
    dualMatchGame.lastResult = null; // 登記後清空，杜絕重複提交
    highlightedGrade8Id = newId;

    sound.playMatch();
    showGlobalFeedback('⚡ 極速榜登錄成功！為您跳轉排行榜', 'success');

    // 關閉遊戲結束覆蓋層
    const overlay = document.getElementById('card-gameover-overlay');
    if (overlay) overlay.classList.add('hidden');

    // 重設篩選為「全部」，確保剛登錄的成績一定看得到
    const allFilterBtn = document.querySelector('#square-leaderboard-filters .filter-pill[data-filter="all"]');
    if (allFilterBtn) {
      document.querySelectorAll('#square-leaderboard-filters .filter-pill').forEach(b => b.classList.remove('active'));
      allFilterBtn.classList.add('active');
      currentGrade8LeaderboardFilter = 'all';
    }

    // 直接切換跳轉至極速榜分頁
    const targetTab = document.querySelector('#grade-8-square-pavilion .sub-tab-btn[data-subtarget="square-leaderboard-view"]');
    if (targetTab) {
      targetTab.click();
    }
  };

  if (btnSubmitScore) {
    btnSubmitScore.addEventListener('click', submitGrade8Score);
  }
  if (nameInput) {
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitGrade8Score();
      }
    });
  }
}

// ==========================================
// 初始化與控制綁定
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  setupGradeNavigation();
  setupPavilionNavigation();
  setupHomePortal();
  setupSubTabs();
  setupAudioToggle();
  setupModals();
  
  // 七年級初始化
  renderPrimeCodex();
  setupBalloonGame();
  setupPrimeCertificate();
  setupGrade7Leaderboard();

  // 八年級初始化
  renderSquareCodex();
  setupDualMatchGame();
  setupSquareCertificate();
  setupGrade8Leaderboard();

  updateHeaderAndCodexUI();
});

const MATH_TRIVIA_LIST = [
  {
    topic: '💡 質數小冷知識',
    text: '為什麼 1 不是質數？因為質數的數學定義是「恰好有 2 個相異正因數（1 和自己）」，而 1 只有 1 個因數，所以 1 既不是質數也不是合數喔！'
  },
  {
    topic: '👑 偶數質數之王',
    text: '數字 2 是全宇宙唯一一個「偶數質數」！除 2 以外的所有偶數都能被 2 整除，所以全都不是質數！'
  },
  {
    topic: '⚡ 尾數是 5 的平方速算法',
    text: '以 25² 為例：將十位數 2 乘以下一個整數 3（2×3=6），後面直接接上 25，答案就是 625！同理 35² = 3×4接25 = 1225！'
  },
  {
    topic: '⚠️ 段考超級大魔王 91',
    text: '考試時最常被粗心當成質數的數字是 91！其實 91 = 7 × 13，它是合數！段考超級愛考，一定要提高警覺！'
  },
  {
    topic: '🔍 完全平方數的尾數秘密',
    text: '任何整數平方後的個位數字，只可能是 0、1、4、5、6、9 六種！絕對不可能以 2、3、7、8 結尾，看到 2、3、7、8 就能秒殺判定不是平方數！'
  },
  {
    topic: '🏛️ 11 的倍數回文奇蹟',
    text: '11² = 121、111² = 12321、1111² = 1234321！算出來的平方數就像一座金字塔，正著讀反著讀都一樣（回文數），神奇又對稱！'
  },
  {
    topic: '📐 畢氏定理與古埃及',
    text: '古埃及工匠利用一條打了 12 個等距結的繩子圍成 3 : 4 : 5 的三角形，在尼羅河氾濫後精準拉出直角來重新劃分農地！'
  },
  {
    topic: '✨ 連續奇數相加就是平方數',
    text: '1 = 1²，1 + 3 = 4 = 2²，1 + 3 + 5 = 9 = 3²，1 + 3 + 5 + 7 = 16 = 4²！從 1 開始連續加前 n 個奇數，剛好永遠等於 n²！'
  },
  {
    topic: '🎯 質數判別陷阱 51 與 57',
    text: '51 和 57 長得很像質數？別被騙了！5+1=6 是 3 的倍數（51 = 3 × 17），5+7=12 也是 3 的倍數（57 = 3 × 19），兩者都是合數！'
  },
  {
    topic: '🏆 直角三角形黃金整數邊',
    text: '國二畢氏定理必考的整數邊長組合：3-4-5、5-12-13、7-24-25、8-15-17，牢記這四組，段考幾何題就能秒殺搶下分數！'
  },
  {
    topic: '💎 浪漫的孿生質數',
    text: '數學上把相差只有 2 的兩個質數稱為「孿生質數」，例如 (3, 5)、(5, 7)、(11, 13)、(17, 19)、(29, 31)、(41, 43)！'
  },
  {
    topic: '🎲 任意連續四整數乘積加 1',
    text: '任意 4 個連續整數相乘後加 1，一定是一個完全平方數！例如 1×2×3×4 + 1 = 25 = 5²；2×3×4×5 + 1 = 121 = 11²！'
  }
];

function setupHomePortal() {
  const portalGrade7 = document.getElementById('portal-card-grade-7');
  const btnEnterGrade7 = document.getElementById('btn-home-enter-grade7');
  const portalGrade8 = document.getElementById('portal-card-grade-8');
  const btnEnterGrade8 = document.getElementById('btn-home-enter-grade8');
  const logoArea = document.querySelector('.logo-area');

  // 今日數學冷知識 / 速算小重點渲染
  let currentTriviaIndex = (new Date().getDate() - 1) % MATH_TRIVIA_LIST.length;
  if (currentTriviaIndex < 0) currentTriviaIndex = 0;

  const renderTrivia = (idx) => {
    const item = MATH_TRIVIA_LIST[idx % MATH_TRIVIA_LIST.length];
    const tagEl = document.getElementById('trivia-topic-tag');
    const textEl = document.getElementById('hero-trivia-text');
    if (tagEl && item) tagEl.textContent = item.topic;
    if (textEl && item) textEl.textContent = item.text;
  };

  renderTrivia(currentTriviaIndex);

  const btnRefresh = document.getElementById('btn-refresh-trivia');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      currentTriviaIndex = (currentTriviaIndex + 1) % MATH_TRIVIA_LIST.length;
      renderTrivia(currentTriviaIndex);
      sound.playPop();
    });
  }

  const goToGrade7 = (e) => {
    if (e) e.stopPropagation();
    const navBtn = document.getElementById('nav-btn-grade7') || document.querySelector('.grade-btn[data-grade="grade-7"]');
    if (navBtn) navBtn.click();
    const hub = document.getElementById('grade-7-hub');
    const pavilion = document.getElementById('grade-7-prime-pavilion');
    if (hub && pavilion) {
      hub.classList.remove('active');
      pavilion.classList.add('active');
      renderPrimeCodex();
      updateHeaderAndCodexUI();
    }
  };

  const goToGrade8 = (e) => {
    if (e) e.stopPropagation();
    const navBtn = document.getElementById('nav-btn-grade8') || document.querySelector('.grade-btn[data-grade="grade-8"]');
    if (navBtn) navBtn.click();
    const hub = document.getElementById('grade-8-hub');
    const pavilion = document.getElementById('grade-8-square-pavilion');
    if (hub && pavilion) {
      hub.classList.remove('active');
      pavilion.classList.add('active');
      renderSquareCodex();
      updateHeaderAndCodexUI();
    }
  };

  if (portalGrade7) portalGrade7.addEventListener('click', goToGrade7);
  if (btnEnterGrade7) btnEnterGrade7.addEventListener('click', goToGrade7);
  if (portalGrade8) portalGrade8.addEventListener('click', goToGrade8);
  if (btnEnterGrade8) btnEnterGrade8.addEventListener('click', goToGrade8);

  // 鍵盤操作支援
  if (portalGrade7) {
    portalGrade7.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToGrade7(e);
      }
    });
  }
  if (portalGrade8) {
    portalGrade8.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToGrade8(e);
      }
    });
  }

  // 點擊 Logo 可一鍵返回首頁大廳
  if (logoArea) {
    logoArea.style.cursor = 'pointer';
    logoArea.setAttribute('title', '點擊返回大廳');
    logoArea.addEventListener('click', () => {
      const homeBtn = document.getElementById('nav-btn-home') || document.querySelector('.grade-btn[data-grade="home-portal"]');
      if (homeBtn) homeBtn.click();
    });
  }
}

function setupGradeNavigation() {
  const gradeBtns = document.querySelectorAll('.grade-btn');
  const gradePanels = document.querySelectorAll('.grade-panel');

  gradeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gradeBtns.forEach(b => b.classList.remove('active'));
      gradePanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      activeGrade = btn.dataset.grade;
      const targetPanel = document.getElementById(activeGrade);
      if (targetPanel) targetPanel.classList.add('active');

      if (activeGrade !== 'grade-7' && balloonGame.isRunning) balloonGame.endGame(false);
      if (activeGrade !== 'grade-8' && dualMatchGame.isRunning) dualMatchGame.stopTimer();

      updateHeaderAndCodexUI();
    });
  });
}

function setupPavilionNavigation() {
  // 七年級：質數館 (直接點擊卡片框框即可進入)
  const cardEnterPrime = document.getElementById('card-enter-prime-pavilion') || document.getElementById('btn-enter-prime-pavilion');
  const btnBackGrade7 = document.getElementById('btn-back-to-grade7-hub');
  const grade7Hub = document.getElementById('grade-7-hub');
  const grade7Pavilion = document.getElementById('grade-7-prime-pavilion');

  if (cardEnterPrime && grade7Hub && grade7Pavilion) {
    const enterPrimeAction = () => {
      grade7Hub.classList.remove('active');
      grade7Pavilion.classList.add('active');
      renderPrimeCodex();
      updateHeaderAndCodexUI();
    };
    cardEnterPrime.addEventListener('click', enterPrimeAction);
    cardEnterPrime.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        enterPrimeAction();
      }
    });
  }
  if (btnBackGrade7 && grade7Hub && grade7Pavilion) {
    btnBackGrade7.addEventListener('click', () => {
      if (balloonGame.isRunning) balloonGame.endGame(false);
      grade7Pavilion.classList.remove('active');
      grade7Hub.classList.add('active');
    });
  }

  // 八年級：平方根館 (直接點擊卡片框框即可進入)
  const cardEnterSquare = document.getElementById('card-enter-square-pavilion') || document.getElementById('btn-enter-square-pavilion');
  const btnBackGrade8 = document.getElementById('btn-back-to-grade8-hub');
  const grade8Hub = document.getElementById('grade-8-hub');
  const grade8Pavilion = document.getElementById('grade-8-square-pavilion');

  if (cardEnterSquare && grade8Hub && grade8Pavilion) {
    const enterSquareAction = () => {
      grade8Hub.classList.remove('active');
      grade8Pavilion.classList.add('active');
      renderSquareCodex();
      updateHeaderAndCodexUI();
    };
    cardEnterSquare.addEventListener('click', enterSquareAction);
    cardEnterSquare.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        enterSquareAction();
      }
    });
  }
  if (btnBackGrade8 && grade8Hub && grade8Pavilion) {
    btnBackGrade8.addEventListener('click', () => {
      if (dualMatchGame.isRunning) dualMatchGame.stopTimer();
      grade8Pavilion.classList.remove('active');
      grade8Hub.classList.add('active');
    });
  }
}

function setupSubTabs() {
  const subBtns = document.querySelectorAll('.sub-tab-btn');
  subBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.grade-view');
      if (!container) return;

      const groupBtns = container.querySelectorAll('.sub-tab-btn');
      const groupPanels = container.querySelectorAll('.sub-panel');

      groupBtns.forEach(b => b.classList.remove('active'));
      groupPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const target = btn.dataset.subtarget;
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');

      if (target !== 'balloon-view' && balloonGame.isRunning) balloonGame.endGame(false);

      // 切換至圖鑑、證書或排行榜分頁時，即時重新讀取儲存並刷新畫面
      if (target === 'codex-view') {
        renderPrimeCodex();
        updateHeaderAndCodexUI();
      } else if (target === 'square-codex-view') {
        renderSquareCodex();
        updateHeaderAndCodexUI();
      } else if (target === 'prime-leaderboard-view') {
        renderGrade7Leaderboard();
      } else if (target === 'square-leaderboard-view') {
        renderGrade8Leaderboard();
      }
    });
  });

  const btnOpenCodex = document.getElementById('btn-open-codex');
  if (btnOpenCodex) {
    btnOpenCodex.addEventListener('click', () => {
      if (activeGrade === 'grade-7') {
        document.querySelector('.grade-btn[data-grade="grade-7"]').click();
        document.getElementById('grade-7-hub').classList.remove('active');
        document.getElementById('grade-7-prime-pavilion').classList.add('active');
        document.querySelector('#grade-7-prime-pavilion .sub-tab-btn[data-subtarget="codex-view"]').click();
      } else {
        document.querySelector('.grade-btn[data-grade="grade-8"]').click();
        document.getElementById('grade-8-hub').classList.remove('active');
        document.getElementById('grade-8-square-pavilion').classList.add('active');
        document.querySelector('#grade-8-square-pavilion .sub-tab-btn[data-subtarget="square-codex-view"]').click();
      }
    });
  }
}

function setupAudioToggle() {
  const btn = document.getElementById('btn-toggle-sound');
  const icon = document.getElementById('sound-icon');
  btn.addEventListener('click', () => {
    sound.enabled = !sound.enabled;
    icon.textContent = sound.enabled ? '🔊' : '🔇';
    btn.style.opacity = sound.enabled ? '1' : '0.6';
  });
}

function setupModals() {
  const modalGuide = document.getElementById('modal-guide');
  const btnOpenGuide = document.getElementById('btn-open-guide');
  const btnCloseGuide = document.getElementById('btn-close-guide');
  const btnGuideOk = document.getElementById('btn-guide-ok');
  const guideTitle = document.getElementById('modal-guide-title');
  const guideBody = document.getElementById('modal-guide-body');

  const open = () => {
    if (activeGrade === 'grade-7') {
      guideTitle.textContent = '💡 七年級：100 以內質數「快篩 4 步驟」秘笈';
      guideBody.innerHTML = `
        <p class="guide-intro">在 100 以內，只要檢查 <strong>2, 3, 5, 7</strong> 四個數！</p>
        <div class="guide-step-card"><div class="step-num">Step 1</div><div class="step-content"><h4>1 不是質數也不是合數！偶數直接淘汰！</h4><p>除 2 以外，所有偶數皆為合數。</p></div></div>
        <div class="guide-step-card"><div class="step-num">Step 2</div><div class="step-content"><h4>個位數看 5，直接淘汰！</h4><p>尾數是 0 或 5 的數，除 5 本身外皆為合數。</p></div></div>
        <div class="guide-step-card"><div class="step-num">Step 3</div><div class="step-content"><h4>位數和是 3 的倍數，直接淘汰！（三大陷阱）</h4><p>51 (3×17)、57 (3×19)、87 (3×29)。</p></div></div>
        <div class="guide-step-card"><div class="step-num">Step 4</div><div class="step-content"><h4>最後檢查 7 的倍數（段考超級大魔王）</h4><p>49 (7×7)、77 (7×11)、91 (7×13，必考題)。</p></div></div>
        <div class="guide-summary-box">✨ 沒被淘汰的，100% 就是質數！</div>
      `;
    } else {
      guideTitle.textContent = '💡 八年級：完全平方數速記與雙向辨識秘笈';
      guideBody.innerHTML = `
        <p class="guide-intro">看到完全平方數，如何秒認出是誰的平方？記住這 3 招：</p>
        <div class="guide-step-card"><div class="step-num">秘笈 1</div><div class="step-content"><h4>顛倒雙胞胎：13² 與 14²</h4><p>13² = <strong>169</strong>，14² = <strong>196</strong>（末兩位 69 與 96 對調！）。</p></div></div>
        <div class="guide-step-card"><div class="step-num">秘笈 2</div><div class="step-content"><h4>尾數鎖定法：看平方數個位數</h4><p>• 尾數是 <strong>9</strong>：底數個位必為 3 或 7（3²=9, 7²=49）<br>• 尾數是 <strong>6</strong>：底數個位必為 4 或 6（4²=16, 6²=36）<br>• 尾數是 <strong>4</strong>：底數個位必為 2 或 8（2²=4, 8²=64）</p></div></div>
        <div class="guide-step-card"><div class="step-num">秘笈 3</div><div class="step-content"><h4>十位數夾擠法：鎖定範圍</h4><p>例如看到 <strong>529</strong>：<br>20² = 400，30² = 900，所以一定是二十幾！<br>尾數是 9 ➔ 是 23 還是 27？因為 529 靠近 400，所以答案秒殺是 <strong>23</strong>！</p></div></div>
        <div class="guide-summary-box">✨ 熟背 11~25 的平方，國二數學計算快三倍！</div>
      `;
    }
    modalGuide.classList.remove('hidden');
  };

  const close = () => modalGuide.classList.add('hidden');

  if (btnOpenGuide) btnOpenGuide.addEventListener('click', open);
  if (btnCloseGuide) btnCloseGuide.addEventListener('click', close);
  if (btnGuideOk) btnGuideOk.addEventListener('click', close);
  if (modalGuide) {
    modalGuide.addEventListener('click', (e) => {
      if (e.target === modalGuide) close();
    });
  }
}

function showGlobalFeedback(msg, type = 'success', targetArena = null) {
  let banner = targetArena ? targetArena.querySelector('.feedback-banner') : null;
  if (!banner) {
    banner = document.querySelector('.feedback-banner:not(.hidden)');
  }
  if (!banner) return;
  banner.textContent = msg;
  banner.className = `feedback-banner ${type}`;
  clearTimeout(banner._timer);
  banner._timer = setTimeout(() => {
    banner.classList.add('hidden');
  }, 2200);
}

function updateHeaderAndCodexUI() {
  const unlockedPrimes = getUnlockedPrimes();
  const unlockedSquares = getUnlockedSquares();

  const primeCount = unlockedPrimes.size;
  const squareCount = unlockedSquares.size;

  // 頂部導航累計數字
  const countEl = document.getElementById('header-codex-count');
  if (countEl) {
    if (activeGrade === 'grade-7') {
      countEl.textContent = `${primeCount}/25`;
    } else if (activeGrade === 'grade-8') {
      countEl.textContent = `${squareCount}/22`;
    } else {
      countEl.textContent = `${primeCount + squareCount}/47`;
    }
  }

  // 首頁七年級卡片進度條
  const homePrimeText = document.getElementById('home-prime-progress-text');
  const homePrimeBar = document.getElementById('home-prime-progress-bar');
  if (homePrimeText) homePrimeText.textContent = `${primeCount} / 25`;
  if (homePrimeBar) homePrimeBar.style.width = `${Math.min(100, Math.round((primeCount / 25) * 100))}%`;

  // 首頁八年級卡片進度條
  const homeSquareText = document.getElementById('home-square-progress-text');
  const homeSquareBar = document.getElementById('home-square-progress-bar');
  if (homeSquareText) homeSquareText.textContent = `${squareCount} / 22`;
  if (homeSquareBar) homeSquareBar.style.width = `${Math.min(100, Math.round((squareCount / 22) * 100))}%`;

  // 首頁個人戰績櫃
  const trophyGems = document.getElementById('trophy-total-gems');
  if (trophyGems) trophyGems.textContent = `${primeCount + squareCount} / 47`;

  const trophyCerts = document.getElementById('trophy-total-certs');
  if (trophyCerts) {
    const certCount = (primeCount === 25 ? 1 : 0) + (squareCount >= 22 ? 1 : 0);
    trophyCerts.textContent = `${certCount} / 2`;
  }

  const trophyPrimeBest = document.getElementById('trophy-prime-best');
  if (trophyPrimeBest) {
    const pList = getGrade7Leaderboard();
    if (pList && pList.length > 0) {
      const maxScore = Math.max(...pList.map(r => r.score || 0));
      trophyPrimeBest.textContent = `${maxScore} 分`;
    } else {
      trophyPrimeBest.textContent = '無紀錄';
    }
  }

  const trophySquareBest = document.getElementById('trophy-square-best');
  if (trophySquareBest) {
    const sList = getGrade8Leaderboard();
    if (sList && sList.length > 0) {
      const minSec = Math.min(...sList.map(r => r.seconds || 9999));
      trophySquareBest.textContent = `${minSec} 秒`;
    } else {
      trophySquareBest.textContent = '無紀錄';
    }
  }

  document.querySelectorAll('.prime-coin').forEach(coin => {
    const val = parseInt(coin.textContent, 10);
    coin.className = `prime-coin ${unlockedPrimes.has(val) ? 'unlocked' : 'locked'}`;
  });
  updatePrimeCertificateUI(unlockedPrimes.size);

  document.querySelectorAll('.square-item-box').forEach(box => {
    const base = parseInt(box.dataset.base, 10);
    if (unlockedSquares.has(base)) {
      box.className = 'square-item-box unlocked';
    } else {
      box.className = 'square-item-box locked';
    }
  });
  updateSquareCertificateUI(unlockedSquares.size);
}

// ==========================================
// 七年級：質數神射手 (打氣球)
// ==========================================
function renderPrimeCodex() {
  const container = document.getElementById('codex-groups-container');
  if (!container) return;
  container.innerHTML = '';
  const unlocked = getUnlockedPrimes();

  PRIME_GROUPS.forEach(grp => {
    const row = document.createElement('div');
    row.className = 'codex-group-row';
    const header = document.createElement('div');
    header.className = 'group-name';
    header.innerHTML = `<span>${grp.label}</span>`;
    const items = document.createElement('div');
    items.className = 'group-items';

    grp.primes.forEach(p => {
      const coin = document.createElement('div');
      coin.className = `prime-coin ${unlocked.has(p) ? 'unlocked' : 'locked'}`;
      coin.textContent = p;
      items.appendChild(coin);
    });

    row.appendChild(header);
    row.appendChild(items);
    container.appendChild(row);
  });
}

function setupPrimeCertificate() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
  const dEl = document.getElementById('cert-date');
  if (dEl) dEl.textContent = dateStr;

  const listEl = document.getElementById('cert-primes-list');
  if (listEl) {
    listEl.innerHTML = '';
    PRIMES_UNDER_100.forEach(p => {
      const pill = document.createElement('span');
      pill.className = 'cert-prime-pill';
      pill.textContent = p;
      listEl.appendChild(pill);
    });
  }

  const btnPrint = document.getElementById('btn-print-cert');
  if (btnPrint) btnPrint.addEventListener('click', () => window.print());

  const btnReset = document.getElementById('btn-reset-progress');
  if (btnReset) btnReset.addEventListener('click', resetAllPrimeProgress);

  const btnGoBalloon = document.getElementById('btn-cert-go-play');
  if (btnGoBalloon) {
    btnGoBalloon.addEventListener('click', () => {
      document.querySelector('#grade-7-prime-pavilion .sub-tab-btn[data-subtarget="balloon-view"]').click();
    });
  }
}

function updatePrimeCertificateUI(count) {
  const lockedState = document.getElementById('cert-locked-state');
  const unlockedState = document.getElementById('cert-unlocked-state');
  const lockProgressText = document.getElementById('cert-lock-progress-text');
  const remainingText = document.getElementById('cert-remaining-text');
  const progressBar = document.getElementById('cert-progress-bar');
  const progressBadge = document.getElementById('codex-progress-text');

  if (progressBadge) progressBadge.textContent = `${count} / 25`;

  if (count < 25) {
    if (lockedState) lockedState.classList.remove('hidden');
    if (unlockedState) unlockedState.classList.add('hidden');
    if (lockProgressText) lockProgressText.textContent = `${count} / 25`;
    if (remainingText) remainingText.textContent = `${25 - count}`;
    if (progressBar) progressBar.style.width = `${(count / 25) * 100}%`;
  } else {
    if (lockedState) lockedState.classList.add('hidden');
    if (unlockedState) unlockedState.classList.remove('hidden');
  }
}

const balloonGame = {
  isRunning: false,
  score: 0,
  combo: 0,
  hearts: 3,
  timeLeft: 60,
  rangeMax: 30,
  hits: 0,
  attempts: 0,
  wrongList: [],
  timerInterval: null,
  spawnInterval: null,
  balloons: [],
  arena: null,

  init() {
    this.arena = document.getElementById('balloon-arena');
    const diffBtns = document.querySelectorAll('.diff-btn');
    diffBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        diffBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.rangeMax = parseInt(btn.dataset.range, 10);
      });
    });

    document.getElementById('btn-start-balloon').addEventListener('click', () => this.startGame());
    document.getElementById('btn-restart-balloon').addEventListener('click', () => this.startGame());
    document.getElementById('btn-balloon-to-codex').addEventListener('click', () => {
      document.querySelector('#grade-7-prime-pavilion .sub-tab-btn[data-subtarget="codex-view"]').click();
      renderPrimeCodex();
      updateHeaderAndCodexUI();
    });

    // 換難度按鈕 (HUD 與工具列)
    const btnHudChange = document.getElementById('btn-hud-change-balloon-level');
    if (btnHudChange) btnHudChange.addEventListener('click', () => this.openLevelPicker());

    const btnHudRestart = document.getElementById('btn-hud-restart-balloon-hud');
    if (btnHudRestart) btnHudRestart.addEventListener('click', () => this.startGame());

    const btnSwitchToolbar = document.getElementById('btn-switch-balloon-level');
    if (btnSwitchToolbar) btnSwitchToolbar.addEventListener('click', () => this.openLevelPicker());

    const btnChangeAfter = document.getElementById('btn-change-balloon-level-after');
    if (btnChangeAfter) btnChangeAfter.addEventListener('click', () => this.openLevelPicker());
  },

  openLevelPicker() {
    this.endGame(false);
    const startOverlay = document.getElementById('balloon-start-overlay');
    const gameoverOverlay = document.getElementById('balloon-gameover-overlay');
    if (gameoverOverlay) gameoverOverlay.classList.add('hidden');
    if (startOverlay) startOverlay.classList.remove('hidden');
  },

  startGame() {
    document.getElementById('balloon-start-overlay').classList.add('hidden');
    document.getElementById('balloon-gameover-overlay').classList.add('hidden');

    const levelLabelEl = document.getElementById('balloon-level-name');
    if (levelLabelEl) {
      const names = { 30: '1~30 暖身區 (10 個質數)', 60: '1~60 進階區 (17 個質數)', 100: '1~100 全制霸 🔥 (25 個質數)' };
      levelLabelEl.textContent = `當前難度：${names[this.rangeMax] || (this.rangeMax + ' 以內')}`;
    }

    this.score = 0;
    this.combo = 0;
    this.hearts = 3;
    this.timeLeft = 60;
    this.hits = 0;
    this.attempts = 0;
    this.wrongList = [];
    this.isRunning = true;
    this.cleanAllBalloons();
    this.updateHUD();

    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateHUD();
      if (this.timeLeft <= 0) this.endGame(true);
    }, 1000);

    clearInterval(this.spawnInterval);
    this.spawnBalloon();
    this.spawnInterval = setInterval(() => {
      if (this.isRunning) this.spawnBalloon();
    }, 1100);
  },

  updateHUD() {
    document.getElementById('balloon-score').textContent = this.score;
    document.getElementById('balloon-timer').textContent = `${this.timeLeft}s`;
    document.getElementById('balloon-combo').textContent = this.combo;
    let heartsStr = '';
    for (let i = 0; i < 3; i++) heartsStr += i < this.hearts ? '❤️' : '🖤';
    document.getElementById('balloon-hearts').textContent = heartsStr;
  },

  spawnBalloon() {
    if (!this.isRunning) return;
    const num = this.generateRandomNumber();
    const isPrime = PRIME_SET.has(num);

    const b = document.createElement('div');
    b.className = 'balloon';
    b.textContent = num;

    const colors = ['#ef4444', '#f97316', '#eab308', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
    b.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const arenaWidth = this.arena.clientWidth || 600;
    const posX = Math.floor(Math.random() * (arenaWidth - 90)) + 10;
    let posY = 520;
    const speed = 1.3 + Math.random() * 1.2;

    b.style.left = `${posX}px`;
    b.style.top = `${posY}px`;

    const string = document.createElement('div');
    string.className = 'balloon-string';
    b.appendChild(string);

    b.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      this.handleBalloonClick(b, num, isPrime);
    });

    this.arena.appendChild(b);

    const balloonObj = { el: b, num, isPrime, animId: null };
    const floatUp = () => {
      if (!this.isRunning || !b.parentNode) return;
      posY -= speed;
      b.style.top = `${posY}px`;
      if (posY < -120) {
        b.remove();
      } else {
        balloonObj.animId = requestAnimationFrame(floatUp);
      }
    };
    balloonObj.animId = requestAnimationFrame(floatUp);
    this.balloons.push(balloonObj);
  },

  generateRandomNumber() {
    const primesInRange = PRIMES_UNDER_100.filter(p => p <= this.rangeMax);
    if (Math.random() < 0.55) {
      return primesInRange[Math.floor(Math.random() * primesInRange.length)];
    } else {
      const tricky = TRICKY_COMPOSITES.filter(c => c <= this.rangeMax);
      if (tricky.length > 0 && Math.random() < 0.6) {
        return tricky[Math.floor(Math.random() * tricky.length)];
      } else {
        let rand;
        do {
          rand = Math.floor(Math.random() * (this.rangeMax - 1)) + 2;
        } while (PRIME_SET.has(rand));
        return rand;
      }
    }
  },

  handleBalloonClick(balloonEl, num, isPrime) {
    if (!this.isRunning) return;
    this.attempts++;
    balloonEl.classList.add('popping');
    setTimeout(() => balloonEl.remove(), 220);

    const rect = balloonEl.getBoundingClientRect();
    const arenaRect = this.arena.getBoundingClientRect();
    const x = rect.left - arenaRect.left + rect.width / 2;
    const y = rect.top - arenaRect.top;

    if (isPrime) {
      this.hits++;
      this.combo++;
      const gained = 100 + (this.combo - 1) * 20;
      this.score += gained;
      sound.playHit();
      this.showFloatText(`+${gained} 質數！`, x, y, '#10b981');
      try {
        saveUnlockedPrime(num);
      } catch (err) {
        console.warn('儲存質數失敗:', err);
      }
      showGlobalFeedback(`🎯 答對！${num} 是質數！`, 'success', this.arena);
    } else {
      this.combo = 0;
      this.hearts--;
      sound.playBuzz();
      const explanation = getFactorExplanation(num);
      this.wrongList.push({ num, explanation });
      this.showFloatText(`❌ 扣心！`, x, y, '#ef4444');
      showGlobalFeedback(`⚠️ ${explanation}`, 'error', this.arena);
      if (this.hearts <= 0) this.endGame(true);
    }
    this.updateHUD();
  },

  showFloatText(text, x, y, color) {
    const f = document.createElement('div');
    f.className = 'floating-text';
    f.textContent = text;
    f.style.left = `${x}px`;
    f.style.top = `${y}px`;
    f.style.color = color;
    this.arena.appendChild(f);
    setTimeout(() => f.remove(), 800);
  },

  cleanAllBalloons() {
    this.balloons.forEach(b => {
      cancelAnimationFrame(b.animId);
      if (b.el && b.el.parentNode) b.el.remove();
    });
    this.balloons = [];
  },

  endGame(showModal = true) {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    clearInterval(this.spawnInterval);
    this.cleanAllBalloons();
    updateHeaderAndCodexUI();

    if (!showModal) return;
    sound.playFanfare();

    const overlay = document.getElementById('balloon-gameover-overlay');
    document.getElementById('balloon-final-score').textContent = this.score;
    document.getElementById('balloon-final-hits').textContent = this.hits;
    const acc = this.attempts > 0 ? Math.round((this.hits / this.attempts) * 100) : 100;
    document.getElementById('balloon-final-accuracy').textContent = `${acc}%`;

    const reviewBox = document.getElementById('balloon-wrong-review');
    reviewBox.innerHTML = '';
    if (this.wrongList.length === 0) {
      reviewBox.innerHTML = '<div style="color:#059669; font-weight:700;">🌟 太厲害了！完全沒有踩到任何合數陷阱！</div>';
    } else {
      const unique = Array.from(new Set(this.wrongList.map(w => w.explanation)));
      reviewBox.innerHTML = '<strong>本次踩到的合數陷阱筆記：</strong>';
      unique.forEach(item => {
        const d = document.createElement('div');
        d.className = 'wrong-item';
        d.textContent = `• ${item}`;
        reviewBox.appendChild(d);
      });
    }

    // 暫存本次成績供登錄英雄榜
    this.lastResult = {
      score: this.score,
      hits: this.hits,
      accuracy: acc,
      rangeMax: this.rangeMax
    };

    const nameInput = document.getElementById('balloon-player-name');
    const submitBtn = document.getElementById('btn-submit-balloon-score');
    const msgEl = document.getElementById('balloon-submit-msg');
    if (nameInput) nameInput.value = localStorage.getItem(KEY_SAVED_PLAYER_NAME) || '';
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = '登錄榜單 🏆';
    }
    if (msgEl) {
      msgEl.classList.add('hidden');
      msgEl.textContent = '';
    }

    overlay.classList.remove('hidden');
  }
};

function setupBalloonGame() {
  balloonGame.init();
}

// ==========================================
// 八年級：一邊是 n、一邊是 n² 左右雙向配對
// ==========================================
function renderSquareCodex() {
  const container = document.getElementById('square-groups-container');
  if (!container) return;
  container.innerHTML = '';
  const unlocked = getUnlockedSquares();

  SQUARE_DATA.forEach(item => {
    const isUnlocked = unlocked.has(item.base);
    const box = document.createElement('div');
    box.className = `square-item-box ${isUnlocked ? 'unlocked' : 'locked'}`;
    box.dataset.base = item.base;

    box.innerHTML = `
      <span class="square-base-val">${item.base}²</span>
      <span class="square-arrow">➔</span>
      <span class="square-result-val">${item.square}</span>
    `;
    container.appendChild(box);
  });
}

function setupSquareCertificate() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
  const dEl = document.getElementById('square-cert-date');
  if (dEl) dEl.textContent = dateStr;

  const listEl = document.getElementById('square-cert-list');
  if (listEl) {
    listEl.innerHTML = '';
    SQUARE_DATA.forEach(item => {
      const pill = document.createElement('span');
      pill.className = 'cert-square-pill';
      pill.textContent = `${item.base}² = ${item.square}`;
      listEl.appendChild(pill);
    });
  }

  const btnPrint = document.getElementById('btn-print-square-cert');
  if (btnPrint) btnPrint.addEventListener('click', () => window.print());

  const btnReset = document.getElementById('btn-reset-square-progress');
  if (btnReset) btnReset.addEventListener('click', resetAllSquareProgress);

  const btnGoCard = document.getElementById('btn-square-go-play');
  if (btnGoCard) {
    btnGoCard.addEventListener('click', () => {
      document.querySelector('#grade-8-square-pavilion .sub-tab-btn[data-subtarget="card-view"]').click();
    });
  }
}

function updateSquareCertificateUI(count) {
  const lockedState = document.getElementById('square-cert-locked-state');
  const unlockedState = document.getElementById('square-cert-unlocked-state');
  const progressText = document.getElementById('square-cert-progress-text');
  const remainingText = document.getElementById('square-cert-remaining-text');
  const progressBar = document.getElementById('square-cert-progress-bar');
  const badgeProgress = document.getElementById('square-codex-progress-text');

  if (badgeProgress) badgeProgress.textContent = `${count} / 22`;

  if (count < 22) {
    if (lockedState) lockedState.classList.remove('hidden');
    if (unlockedState) unlockedState.classList.add('hidden');
    if (progressText) progressText.textContent = `${count} / 22`;
    if (remainingText) remainingText.textContent = `${22 - count}`;
    if (progressBar) progressBar.style.width = `${(count / 22) * 100}%`;
  } else {
    if (lockedState) lockedState.classList.add('hidden');
    if (unlockedState) unlockedState.classList.remove('hidden');
  }
}

// ==========================================
// 八年級：完全平方數「上下連連看」核心邏輯
// 上排：底數 n  ⟷  下排：完全平方數 n²
// ==========================================
const dualMatchGame = {
  isRunning: false,
  selectedLevel: 'warmup',
  isSideBySide: false,
  matchedPairsCount: 0,
  totalPairsCount: 0,
  moves: 0,
  seconds: 0,
  combo: 0,
  timerInterval: null,
  selectedBaseEl: null,
  selectedSquareEl: null,
  isProcessing: false,
  arena: null,
  svgCanvas: null,
  gridBase: null,
  gridSquare: null,
  matchedPairs: [],
  LINE_COLORS: [
    '#38bdf8', // 亮藍
    '#fbbf24', // 暖金
    '#34d399', // 翡翠綠
    '#f472b6', // 櫻花粉
    '#a78bfa', // 紫羅蘭
    '#22d3ee', // 青藍
    '#facc15', // 明黃
    '#818cf8', // 靛青
    '#fb7185', // 珊瑚粉
    '#2dd4bf', // 湖水綠
    '#a3e635', // 萊姆綠
    '#fb923c', // 亮橘
    '#e879f9', // 霓虹紫
    '#4ade80', // 鮮綠
    '#60a5fa', // 天空藍
    '#f87171'  // 暖紅
  ],

  init() {
    this.arena = document.getElementById('dual-arena');
    this.svgCanvas = document.getElementById('match-svg-canvas');
    this.gridBase = document.getElementById('grid-base-cards');
    this.gridSquare = document.getElementById('grid-square-cards');

    const diffBtns = document.querySelectorAll('.diff-btn-square');
    diffBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        diffBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedLevel = btn.dataset.level;
      });
    });

    document.getElementById('btn-start-card-game').addEventListener('click', () => this.startGame());
    document.getElementById('btn-restart-card-game').addEventListener('click', () => this.startGame());
    document.getElementById('btn-card-to-codex').addEventListener('click', () => {
      document.querySelector('#grade-8-square-pavilion .sub-tab-btn[data-subtarget="square-codex-view"]').click();
      renderSquareCodex();
      updateHeaderAndCodexUI();
    });

    // 換關卡按鈕監聽 (HUD、頂部工具列、結算覆蓋層)
    const btnHudChange = document.getElementById('btn-hud-change-card-level');
    if (btnHudChange) btnHudChange.addEventListener('click', () => this.openLevelPicker());

    const btnHudRestart = document.getElementById('btn-hud-restart-card');
    if (btnHudRestart) btnHudRestart.addEventListener('click', () => this.startGame());

    const btnSwitchToolbar = document.getElementById('btn-switch-card-level');
    if (btnSwitchToolbar) btnSwitchToolbar.addEventListener('click', () => this.openLevelPicker());

    const btnResetToolbar = document.getElementById('btn-reset-card-level');
    if (btnResetToolbar) btnResetToolbar.addEventListener('click', () => this.startGame());

    const btnChangeAfter = document.getElementById('btn-change-card-level-after');
    if (btnChangeAfter) btnChangeAfter.addEventListener('click', () => this.openLevelPicker());

    // ⇄ 切換左右 / 上下 排版按鈕
    const btnToggleLayout = document.getElementById('btn-toggle-card-layout');
    if (btnToggleLayout) {
      btnToggleLayout.addEventListener('click', () => {
        this.setSideBySideLayout(!this.isSideBySide);
      });
    }

    // 視窗縮放或裝置旋轉時，即時重算所有連線座標以防跑版
    window.addEventListener('resize', () => {
      if (this.matchedPairs.length > 0) {
        this.updateAllLines();
      }
    });
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        if (this.matchedPairs.length > 0) {
          this.updateAllLines();
        }
      }, 150);
    });
  },

  setSideBySideLayout(enable) {
    this.isSideBySide = !!enable;
    const container = document.querySelector('.top-bottom-container');
    const toggleBtn = document.getElementById('btn-toggle-card-layout');
    const toggleLabel = document.getElementById('layout-toggle-label');
    const baseTitle = document.getElementById('base-layer-title');
    const baseTip = document.getElementById('base-layer-tip');
    const squareTitle = document.getElementById('square-layer-title');
    const squareTip = document.getElementById('square-layer-tip');
    const laneHint = document.getElementById('lane-hint-text');

    if (container) {
      if (this.isSideBySide) {
        container.classList.add('side-by-side-mode');
      } else {
        container.classList.remove('side-by-side-mode');
      }
    }

    if (toggleBtn) {
      if (this.isSideBySide) {
        toggleBtn.classList.add('active-side');
        if (toggleLabel) toggleLabel.textContent = '⇅ 切換上下';
      } else {
        toggleBtn.classList.remove('active-side');
        if (toggleLabel) toggleLabel.textContent = '⇄ 切換左右';
      }
    }

    if (this.isSideBySide) {
      if (baseTitle) baseTitle.textContent = '左側：底數區 (n)';
      if (baseTip) baseTip.textContent = '點底數連右側平方數';
      if (squareTitle) squareTitle.textContent = '右側：平方數區 (n²)';
      if (squareTip) squareTip.textContent = '看平方數秒連回底數！';
      if (laneHint) laneHint.textContent = '⚡ 左右發光連線 ⚡';
    } else {
      if (baseTitle) baseTitle.textContent = '上方：底數區 (n)';
      if (baseTip) baseTip.textContent = '點選底數，連到下方平方數';
      if (squareTitle) squareTitle.textContent = '下方：完全平方數區 (n²)';
      if (squareTip) squareTip.textContent = '看平方數，秒連回是誰的平方！';
      if (laneHint) laneHint.textContent = '⚡ 點選上方與下方進行發光連線 ⚡';
    }

    // 重新繪製已連線的路徑，確保切換排列時線條座標即時對齊
    setTimeout(() => {
      this.updateAllLines();
    }, 50);
  },

  openLevelPicker() {
    this.stopTimer();
    this.isProcessing = false;
    this.selectedBaseEl = null;
    this.selectedSquareEl = null;
    const startOverlay = document.getElementById('card-start-overlay');
    const gameoverOverlay = document.getElementById('card-gameover-overlay');
    if (gameoverOverlay) gameoverOverlay.classList.add('hidden');
    if (startOverlay) startOverlay.classList.remove('hidden');
  },

  startGame() {
    document.getElementById('card-start-overlay').classList.add('hidden');
    document.getElementById('card-gameover-overlay').classList.add('hidden');

    const levelLabelEl = document.getElementById('card-level-name');
    if (levelLabelEl) {
      const names = {
        warmup: '11~16 暖身區 (6 組)',
        core: '11~20 核心區 (10 組)',
        target: '11~25 精熟目標 🔥 (15 組)',
        master: '11~32 王者挑戰 (22 組)'
      };
      levelLabelEl.textContent = `當前關卡：${names[this.selectedLevel] || this.selectedLevel}`;
    }

    // 王者挑戰(11~32 共 22 組)預設採用左右排列，避免上下距離過遠需頻繁滾動；其他關卡預設上下，可隨時按鈕切換
    if (this.selectedLevel === 'master') {
      this.setSideBySideLayout(true);
    } else {
      this.setSideBySideLayout(false);
    }

    this.isRunning = true;
    this.moves = 0;
    this.seconds = 0;
    this.combo = 0;
    this.matchedPairsCount = 0;
    this.selectedBaseEl = null;
    this.selectedSquareEl = null;
    this.isProcessing = false;
    this.matchedPairs = [];

    // 清空 SVG 連線畫布
    if (this.svgCanvas) {
      this.svgCanvas.innerHTML = '';
    }

    // 依選擇難度過濾組數
    let pool = [];
    if (this.selectedLevel === 'warmup') {
      pool = SQUARE_DATA.filter(item => item.base >= 11 && item.base <= 16); // 6 組
    } else if (this.selectedLevel === 'core') {
      pool = SQUARE_DATA.filter(item => item.base >= 11 && item.base <= 20); // 10 組
    } else if (this.selectedLevel === 'target') {
      pool = SQUARE_DATA.filter(item => item.base >= 11 && item.base <= 25); // 15 組 (精熟目標)
    } else {
      pool = SQUARE_DATA; // 22 組 (王者挑戰 11~32)
    }

    this.totalPairsCount = pool.length;
    this.updateHUD();

    // 上層（底數）與下層（平方數）陣列各自獨立打亂
    const baseList = [...pool];
    const squareList = [...pool];

    // Fisher-Yates 洗牌演算法
    for (let i = baseList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [baseList[i], baseList[j]] = [baseList[j], baseList[i]];
    }
    for (let i = squareList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [squareList[i], squareList[j]] = [squareList[j], squareList[i]];
    }

    this.renderTopBottomLayers(baseList, squareList);

    // 計時器
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.seconds++;
      document.getElementById('card-timer').textContent = `${this.seconds}s`;
    }, 1000);
  },

  renderTopBottomLayers(baseList, squareList) {
    this.gridBase.innerHTML = '';
    this.gridSquare.innerHTML = '';

    // 上層：渲染底數卡片 (n)
    baseList.forEach(item => {
      const card = document.createElement('div');
      card.className = 'match-card card-base';
      card.dataset.base = item.base;
      card.innerHTML = `
        <span class="card-value">${item.base}</span>
        <span class="card-hint-sub">底數 n</span>
        <span class="card-connector-dot"></span>
      `;
      card.addEventListener('click', () => this.handleBaseClick(card, item.base));
      this.gridBase.appendChild(card);
    });

    // 下層：渲染平方數卡片 (n²)
    squareList.forEach(item => {
      const card = document.createElement('div');
      card.className = 'match-card card-square';
      card.dataset.base = item.base;
      card.dataset.square = item.square;
      card.innerHTML = `
        <span class="card-connector-dot"></span>
        <span class="card-value">${item.square}</span>
        <span class="card-hint-sub">平方數 n²</span>
      `;
      card.addEventListener('click', () => this.handleSquareClick(card, item.base, item.square));
      this.gridSquare.appendChild(card);
    });
  },

  handleBaseClick(cardEl, baseVal) {
    if (!this.isRunning || this.isProcessing) return;
    if (cardEl.classList.contains('matched')) return;

    sound.playPop();

    // 若點擊已選中的同一張，取消選取
    if (this.selectedBaseEl === cardEl) {
      cardEl.classList.remove('selected');
      this.selectedBaseEl = null;
      return;
    }

    // 取消之前選的上排卡片
    if (this.selectedBaseEl) {
      this.selectedBaseEl.classList.remove('selected');
    }

    cardEl.classList.add('selected');
    this.selectedBaseEl = cardEl;

    // 若下排也已經選中一張，執行比對
    if (this.selectedSquareEl) {
      this.moves++;
      this.updateHUD();
      this.checkMatch();
    }
  },

  handleSquareClick(cardEl, baseVal, squareVal) {
    if (!this.isRunning || this.isProcessing) return;
    if (cardEl.classList.contains('matched')) return;

    sound.playPop();

    // 若點擊已選中的同一張，取消選取
    if (this.selectedSquareEl === cardEl) {
      cardEl.classList.remove('selected');
      this.selectedSquareEl = null;
      return;
    }

    // 取消之前選的下排卡片
    if (this.selectedSquareEl) {
      this.selectedSquareEl.classList.remove('selected');
    }

    cardEl.classList.add('selected');
    this.selectedSquareEl = cardEl;

    // 若上排也已經選中一張，執行比對
    if (this.selectedBaseEl) {
      this.moves++;
      this.updateHUD();
      this.checkMatch();
    }
  },

  checkMatch() {
    this.isProcessing = true;
    const baseCard = this.selectedBaseEl;
    const squareCard = this.selectedSquareEl;

    const baseFromTop = parseInt(baseCard.dataset.base, 10);
    const baseFromBottom = parseInt(squareCard.dataset.base, 10);
    const squareVal = baseFromBottom * baseFromBottom;

    if (baseFromTop === baseFromBottom) {
      // 🎯 配對成功！
      this.matchedPairsCount++;
      this.combo++;
      sound.playHit();

      baseCard.classList.remove('selected');
      squareCard.classList.remove('selected');

      baseCard.classList.add('matched');
      squareCard.classList.add('matched');

      // 繪製上下發光連線 (美麗的 SVG 貝茲曲線)
      const color = this.LINE_COLORS[this.matchedPairs.length % this.LINE_COLORS.length];
      const pathEl = this.drawConnectingPath(baseCard, squareCard, color);
      this.matchedPairs.push({
        baseCard,
        squareCard,
        pathEl,
        color
      });

      showGlobalFeedback(`🎯 賓果！${baseFromTop}² = ${squareVal}（√${squareVal} = ${baseFromTop}）`, 'success', this.arena);

      // 存入八年級完全平方數進度
      try {
        saveUnlockedSquare(baseFromTop);
      } catch (err) {
        console.warn('儲存進度時發生例外:', err);
      }

      this.selectedBaseEl = null;
      this.selectedSquareEl = null;
      this.isProcessing = false;
      this.updateHUD();

      // 全部連線完成通關！
      if (this.matchedPairsCount === this.totalPairsCount) {
        setTimeout(() => this.gameWin(), 400);
      }
    } else {
      // ⚠️ 配對失敗
      this.combo = 0;
      sound.playBuzz();
      this.updateHUD();

      baseCard.classList.add('error-shake');
      squareCard.classList.add('error-shake');

      const expectedSquare = baseFromTop * baseFromTop;
      const actualBaseOfSquare = baseFromBottom;
      showGlobalFeedback(`⚠️ ${baseFromTop}² 是 ${expectedSquare}，而 ${squareVal} 是 ${actualBaseOfSquare}² 喔！`, 'error', this.arena);

      setTimeout(() => {
        baseCard.classList.remove('error-shake', 'selected');
        squareCard.classList.remove('error-shake', 'selected');
        this.selectedBaseEl = null;
        this.selectedSquareEl = null;
        this.isProcessing = false;
      }, 550);
    }
  },

  drawConnectingPath(baseCard, squareCard, color) {
    if (!this.svgCanvas || !this.arena) return null;

    const { x1, y1, x2, y2 } = this.calculateCardCoordinates(baseCard, squareCard);
    let dStr = '';
    if (this.isSideBySide) {
      const midX = (x1 + x2) / 2;
      dStr = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
    } else {
      const midY = (y1 + y2) / 2;
      dStr = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
    }

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', dStr);
    path.setAttribute('class', 'match-line');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '4');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.style.filter = `drop-shadow(0 0 8px ${color})`;

    this.svgCanvas.appendChild(path);
    return path;
  },

  calculateCardCoordinates(baseCard, squareCard) {
    const arenaRect = this.arena.getBoundingClientRect();
    const baseDot = baseCard.querySelector('.card-connector-dot') || baseCard;
    const squareDot = squareCard.querySelector('.card-connector-dot') || squareCard;

    const bRect = baseDot.getBoundingClientRect();
    const sRect = squareDot.getBoundingClientRect();

    const x1 = bRect.left + bRect.width / 2 - arenaRect.left;
    const y1 = bRect.top + bRect.height / 2 - arenaRect.top;
    const x2 = sRect.left + sRect.width / 2 - arenaRect.left;
    const y2 = sRect.top + sRect.height / 2 - arenaRect.top;

    return { x1, y1, x2, y2 };
  },

  updateAllLines() {
    if (!this.arena || !this.svgCanvas) return;
    this.matchedPairs.forEach(pair => {
      if (pair.baseCard && pair.squareCard && pair.pathEl) {
        const { x1, y1, x2, y2 } = this.calculateCardCoordinates(pair.baseCard, pair.squareCard);
        let dStr = '';
        if (this.isSideBySide) {
          const midX = (x1 + x2) / 2;
          dStr = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
        } else {
          const midY = (y1 + y2) / 2;
          dStr = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
        }
        pair.pathEl.setAttribute('d', dStr);
      }
    });
  },

  updateHUD() {
    document.getElementById('card-matched-count').textContent = `${this.matchedPairsCount} / ${this.totalPairsCount}`;
    document.getElementById('card-flip-moves').textContent = this.moves;
    document.getElementById('card-combo').textContent = this.combo;
  },

  stopTimer() {
    clearInterval(this.timerInterval);
    this.isRunning = false;
  },

  gameWin() {
    this.stopTimer();
    updateHeaderAndCodexUI();
    sound.playFanfare();

    const overlay = document.getElementById('card-gameover-overlay');
    document.getElementById('card-final-time').textContent = `${this.seconds}s`;
    document.getElementById('card-final-moves').textContent = this.moves;

    let stars = '⭐⭐⭐';
    if (this.moves > this.totalPairsCount * 1.8) stars = '⭐';
    else if (this.moves > this.totalPairsCount * 1.3) stars = '⭐⭐';
    document.getElementById('card-final-stars').textContent = stars;

    // 暫存本次成績供登錄極速榜
    this.lastResult = {
      seconds: this.seconds,
      moves: this.moves,
      stars: stars,
      level: this.selectedLevel
    };

    const nameInput = document.getElementById('card-player-name');
    const submitBtn = document.getElementById('btn-submit-card-score');
    const msgEl = document.getElementById('card-submit-msg');
    if (nameInput) nameInput.value = localStorage.getItem(KEY_SAVED_PLAYER_NAME) || '';
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = '登錄極速榜 ⚡';
    }
    if (msgEl) {
      msgEl.classList.add('hidden');
      msgEl.textContent = '';
    }

    overlay.classList.remove('hidden');
  }
};

function setupDualMatchGame() {
  dualMatchGame.init();
}
