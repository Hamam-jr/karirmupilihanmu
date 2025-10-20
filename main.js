// v5: Final summary includes rule-based career-fit recommendation (+reasons).
// Keep audio/TTS controls from v4 in minimal form to focus on fit logic.

const SCORES = ["minat","keseimbangan","penghasilan","nilai","kepuasan"];
const MAX_SCORE_PER_DIM = 120; // asumsi batas atas realistis untuk normalisasi (sesuaikan jika Anda mengubah efek)

// Profil jalur: bobot (jumlah=1) dan ambang minimal (threshold) per dimensi
const CAREER_PROFILES = {
  guru: {
    label: "Guru/ASN Pendidikan",
    weights: { minat:0.25, nilai:0.30, kepuasan:0.20, keseimbangan:0.15, penghasilan:0.10 },
    min: { minat:40, nilai:40, kepuasan:35 },
    notes: "Fokus pada panggilan mengajar (minat & nilai) dan kepuasan; keseimbangan penting, finansial tidak dominan."
  },
  wira: {
    label: "Wirausaha Teknologi",
    weights: { penghasilan:0.35, minat:0.25, kepuasan:0.15, nilai:0.15, keseimbangan:0.10 },
    min: { penghasilan:40, minat:35 },
    floor: { keseimbangan:20 }, // terima keseimbangan rendah, tapi jangan < 20
    notes: "Viabilitas finansial & dorongan internal utama; toleransi terhadap keseimbangan yang fluktuatif."
  },
  s2: {
    label: "Akademia (S2/riset)",
    weights: { minat:0.30, nilai:0.30, kepuasan:0.20, penghasilan:0.10, keseimbangan:0.10 },
    min: { minat:40, nilai:40 },
    notes: "Riset butuh minat & nilai yang kuat; kepuasan akademik sebagai penguat."
  },
  ind: {
    label: "Industri Non-Pendidikan",
    weights: { penghasilan:0.30, keseimbangan:0.25, minat:0.20, nilai:0.15, kepuasan:0.10 },
    min: { penghasilan:40, keseimbangan:35 },
    notes: "Stabilitas finansial & keseimbangan kerja-hidup penting; minat & nilai tetap relevan."
  }
};

// --- Audio/TTS minimal (placeholders ON/OFF) ---
let MUSIC_ON=false, SFX_ON=true, TTS_ON=false;
const els = {
  btnNew: document.getElementById('btn-new'),
  btnContinue: document.getElementById('btn-continue'),
  btnRestart: document.getElementById('btn-restart'),
  btnExport: document.getElementById('btn-export'),
  btnHelp: document.getElementById('btn-help'),
  btnMusic: document.getElementById('btn-music'),
  btnSfx: document.getElementById('btn-sfx'),
  btnTts: document.getElementById('btn-tts'),
  scoreboard: {
    minat: document.getElementById('sc-minat'),
    keseimbangan: document.getElementById('sc-keseimbangan'),
    penghasilan: document.getElementById('sc-penghasilan'),
    nilai: document.getElementById('sc-nilai'),
    kepuasan: document.getElementById('sc-kepuasan'),
  },
  scene: document.getElementById('scene'),
  sceneId: document.getElementById('scene-id'),
  sceneText: document.getElementById('scene-text'),
  rnd: document.getElementById('random-event'),
  choices: document.getElementById('choices'),
  portrait: document.getElementById('portrait-img'),
  portraitCap: document.getElementById('portrait-cap'),
  end: document.getElementById('end-screen'),
  reflections: document.getElementById('reflections'),
  btnPlayAgain: document.getElementById('btn-play-again'),
  dlgHelp: document.getElementById('dlg-help'),
  btnCloseHelp: document.getElementById('btn-close-help'),
  dlgSummary: document.getElementById('dlg-summary'),
  sumTitle: document.getElementById('sum-title'),
  sumSubtitle: document.getElementById('sum-subtitle'),
  sumTable: document.getElementById('sum-table'),
  sumNote: document.getElementById('fit-note'),
  btnSumReplay: document.getElementById('btn-sum-replay'),
  btnSumFinish: document.getElementById('btn-sum-finish'),
  fitTitle: document.getElementById('fit-title'),
  fitReasons: document.getElementById('fit-reasons'),
};

let state = null, scenes = null, startScene = "start";
function newState() {
  return {
    sessionId: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    sceneId: startScene,
    scores: {minat:0, keseimbangan:0, penghasilan:0, nilai:0, kepuasan:0},
    path: null, // 'guru' | 'wira' | 's2' | 'ind'
    log: [],
    ended: false,
    startedAt: new Date().toISOString()
  };
}
function persist() {
  localStorage.setItem('kp_state', JSON.stringify(state));
  const logs = JSON.parse(localStorage.getItem('kp_logs') || '[]');
  const idx = logs.findIndex(l => l.sessionId === state.sessionId);
  if (idx>=0) logs[idx] = state; else logs.push(state);
  localStorage.setItem('kp_logs', JSON.stringify(logs));
}
function loadPersisted() {
  const raw = localStorage.getItem('kp_state'); if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}
function updateScoreboard() {
  for (const k of SCORES) { els.scoreboard[k].textContent = state.scores[k] || 0; }
}
function applyEffects(effects) {
  if (!effects) return; for (const [k,v] of Object.entries(effects)) {
    if (SCORES.includes(k)) state.scores[k] = (state.scores[k] || 0) + Number(v || 0);
  }
}
function maybeFireRandom(scene) {
  const evts = scene.random_events || []; const fired = [];
  for (const ev of evts) {
    let p = 0; if (typeof ev.p === 'number') p = ev.p; if (typeof ev.pct === 'number') p = ev.pct/100; if (p>1) p/=100;
    if (Math.random() < p) { applyEffects(ev.effects); fired.push(ev.text); }
  } return fired;
}
function speak(text){ if(!TTS_ON) return; try{ const u=new SpeechSynthesisUtterance(text); const v=window.speechSynthesis.getVoices().find(v=>/id|indonesian/i.test(v.lang||v.name)); if(v) u.voice=v; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);}catch(e){}}

function applySceneTheme(scn) {
  const charMap = window.GAME_DATA.characters || {};
  const cid = scn.char || "guru"; const char = charMap[cid] || { label: "Karakter", portrait: "assets/characters/guru.svg" };
  els.portrait.src = char.portrait || "assets/characters/guru.svg";
  els.portrait.alt = char.label || "Karakter"; els.portraitCap.textContent = char.label || "Karakter";
}

function norm(v) { const x = Math.max(0, Math.min(v, MAX_SCORE_PER_DIM)); return (x / MAX_SCORE_PER_DIM) * 100; }
function balanceIndex(norms) { // 0..10 (10=merata)
  const arr = Object.values(norms); const min = Math.min(...arr), max = Math.max(...arr);
  if (max === 0) return 0; return (min / max) * 100;
}
function computeFit(scores, path) {
  const profile = CAREER_PROFILES[path] || CAREER_PROFILES.guru;
  const n = {}; for (const k of SCORES) n[k] = norm(scores[k]||0);
  // weighted score
  let ws = 0; for (const k of SCORES) { ws += (profile.weights[k]||0)*n[k]; }
  // thresholds
  let bonus = 0, threshOk = true, reasons = [];
  if (profile.min) {
    for (const [k,t] of Object.entries(profile.min)) {
      if (n[k] < t) { threshOk = false; reasons.push(`Nilai ${caps(k)} di bawah ambang (${n[k].toFixed(0)} < ${t}).`); }
    }
  }
  if (profile.floor) {
    for (const [k,t] of Object.entries(profile.floor)) {
      if (n[k] < t) { threshOk = false; reasons.push(`Nilai ${caps(k)} terlalu rendah untuk tahap awal (${n[k].toFixed(0)} < ${t}).`); }
    }
  }
  if (threshOk) bonus += 8; // semua ambang terpenuhi
  // balance
  const bi = balanceIndex(n);
  // penalty untuk ketimpangan ekstrem
  const lowDims = Object.entries(n).filter(([k,v]) => v < 25).map(([k])=>k);
  const highDims = Object.entries(n).filter(([k,v]) => v > 70).map(([k])=>k);
  let penalty = 0;
  if (lowDims.length>=2 && highDims.length>=2) penalty += 8;
  // final fit 0..100
  let fit = 0.6*ws + 0.3*bi + 0.1*(bonus - penalty);
  fit = Math.max(0, Math.min(100, fit));

  // derive verdict
  let verdict = ""; let label = "";
  if (fit >= 80) { verdict = "Sangat cocok"; label="✅"; }
  else if (fit >= 65) { verdict = "Cocok"; label="👍"; }
  else if (fit >= 50) { verdict = "Perlu eksplorasi lanjutan"; label="⚖️"; }
  else { verdict = "Kurang cocok saat ini"; label="⚠️"; }

  // build reasons: 2 kuat + 1-2 lemah
  const sorted = Object.entries(n).sort((a,b)=>b[1]-a[1]);
  const top2 = sorted.slice(0,2);
  const bottom2 = sorted.slice(-2);
  const posR = top2.map(([k,v])=>`Kekuatan: ${caps(k)} ${v.toFixed(0)} mendukung profil ${profile.label.toLowerCase()}.`);
  const negR = bottom2.map(([k,v])=>`Perlu perhatian: ${caps(k)} ${v.toFixed(0)} masih relatif rendah.`);
  const why = [];
  why.push(...posR);
  if (reasons.length) why.push(...reasons);
  else why.push(...negR);

  return { fit: Math.round(fit), verdict: '${label} ${verdict}', reasons: why, profile };
}
function caps(k){ return k[0].toUpperCase() + k.slice(1); }

function openFinalSummary(scores) {
  // fill scores table
  const tbody = els.sumTable.querySelector('tbody'); tbody.innerHTML = '';
  const dims = ["minat","keseimbangan","penghasilan","nilai","kepuasan"];
  for (const k of dims) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${caps(k)}</td><td>${Number(scores[k]||0)}</td>`;
    tbody.appendChild(tr);
  }

  // determine path if not set
  if (!state.path) state.path = inferPathFromLog();
  const fit = computeFit(scores, state.path || 'guru');
  els.fitTitle.textContent = `${fit.verdict} — Skor Kecocokan ${fit.fit}/100 untuk jalur ${CAREER_PROFILES[state.path||'guru'].label}`;
  els.fitReasons.innerHTML = '';
  fit.reasons.slice(0,4).forEach(r=>{ const li=document.createElement('li'); li.textContent=r; els.fitReasons.appendChild(li); });

  els.dlgSummary.showModal();
}

function inferPathFromLog(){
  // cari scene pertama selain 'start' dari log, ambil prefix id: 'guru_', 'wira_', 's2_', 'ind_'
  for (const step of state.log) {
    const m = /^([a-z]+)_/i.exec(step.scene||"");
    if (m) {
      const key = m[1];
      if (["guru","wira","s2","ind"].includes(key)) return key;
    }
  }
  // fallback: pakai sceneId sekarang
  const m = /^([a-z]+)_/i.exec(state.sceneId||""); if (m) return m[1];
  return "guru";
}

function renderScene() {
  const sc = scenes[state.sceneId];
  if (!sc) { console.error("Scene not found:", state.sceneId); return; }
  els.scene.hidden = false; els.end.hidden = true;
  els.sceneId.textContent = state.sceneId;
  els.sceneText.textContent = sc.text;
  if (TTS_ON) speak(sc.text);
  els.choices.innerHTML = ''; els.rnd.hidden = true; els.rnd.textContent = '';

  applySceneTheme(sc);

  sc.choices.forEach((ch) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = `<div>${ch.label}</div>` + (ch.hint ? `<small>${ch.hint}</small>` : '');
    btn.addEventListener('click', () => {
      applyEffects(ch.effects);
      const fired = maybeFireRandom(sc);
      // set path when leaving 'start'
      if (!state.path && state.sceneId === 'start' && ch.to) {
        const m = /^([a-z]+)_/i.exec(ch.to||""); if (m) state.path = m[1];
      }
      state.log.push({ t: new Date().toISOString(), scene: state.sceneId, choice: ch.label, effects: ch.effects || {}, randoms: fired || [] });
      updateScoreboard(); persist();
      if (fired && fired.length) { els.rnd.textContent = `[Peristiwa] ${fired.join(" | ")}`; els.rnd.hidden = false; }
      if (ch.to === "END") { openFinalSummary(state.scores); } else { state.sceneId = ch.to; renderScene(); }
    });
    li.appendChild(btn); els.choices.appendChild(li);
  });

  updateScoreboard(); els.btnRestart.disabled = false;
}

function endGame() {
  state.ended = true; persist();
  els.scene.hidden = true; els.end.hidden = false;
  // optional: simple textual reflection
  els.reflections.innerHTML = '';
  const p = CAREER_PROFILES[state.path||'guru'];
  const li = document.createElement('li');
  li.textContent = `Terima kasih telah bermain. Pertimbangkan tips peningkatan sesuai jalur ${p.label.toLowerCase()} dan hasil rekomendasi.`;
  els.reflections.appendChild(li);
}

function exportLogsCsv() {
  const logs = JSON.parse(localStorage.getItem('kp_logs') || '[]');
  const rows = [["session_id","started_at","ended","path","scores","steps"]];
  for (const s of logs) rows.push([s.sessionId, s.startedAt || "", String(!!s.ended), s.path||"", JSON.stringify(s.scores), JSON.stringify(s.log)]);
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], {type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'karirmu-pilihanmu-logs.csv';
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function restart() {
  if (!confirm("Mulai ulang sesi ini? Progres sesi akan direset.")) return;
  state = newState(); persist(); renderScene(); els.btnContinue.disabled = false;
}

function init() {
  scenes = window.GAME_DATA.scenes; startScene = window.GAME_DATA.start || "start";

  const saved = loadPersisted();
  if (saved && !saved.ended) { state = saved; els.btnContinue.disabled = false; }

  els.btnNew.addEventListener('click', () => { state = newState(); persist(); renderScene(); els.btnContinue.disabled = false; });
  els.btnContinue.addEventListener('click', () => { if (!state) { const s = loadPersisted(); if (s) state = s; } if (state.ended) state = newState(); renderScene(); });
  els.btnRestart.addEventListener('click', restart);
  els.btnExport.addEventListener('click', exportLogsCsv);
  els.btnHelp.addEventListener('click', () => els.dlgHelp.showModal());
  els.btnCloseHelp.addEventListener('click', () => els.dlgHelp.close());
  els.btnSumReplay.addEventListener('click', () => { els.dlgSummary.close(); state = newState(); persist(); renderScene(); });
  els.btnSumFinish.addEventListener('click', () => { els.dlgSummary.close(); endGame(); });

  // Audio toggles (placeholders)
  els.btnMusic.addEventListener('click', ()=>{ MUSIC_ON=!MUSIC_ON; els.btnMusic.textContent = MUSIC_ON ? "🎵 Musik: ON" : "🎵 Musik: OFF"; });
  els.btnSfx.addEventListener('click', ()=>{ SFX_ON=!SFX_ON; els.btnSfx.textContent = SFX_ON ? "🔊 SFX: ON" : "🔊 SFX: OFF"; });
  els.btnTts.addEventListener('click', ()=>{ TTS_ON=!TTS_ON; els.btnTts.textContent = TTS_ON ? "🗣️ Narator: ON" : "🗣️ Narator: OFF"; });

  if (!saved) { state = newState(); persist(); renderScene(); }
}
document.addEventListener('DOMContentLoaded', init);
