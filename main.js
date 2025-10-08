// Main engine v3: Final-score popup only + responsive

const SCORES = ["minat","keseimbangan","penghasilan","nilai","kepuasan"];

let state = null;        // current game state
let scenes = null;       // scene database
let startScene = "start";
let rng = Math.random;   // can be seeded later if needed

const els = {
  btnNew: document.getElementById('btn-new'),
  btnContinue: document.getElementById('btn-continue'),
  btnRestart: document.getElementById('btn-restart'),
  btnExport: document.getElementById('btn-export'),
  btnHelp: document.getElementById('btn-help'),
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
  end: document.getElementById('end-screen'),
  reflections: document.getElementById('reflections'),
  btnPlayAgain: document.getElementById('btn-play-again'),
  dlgHelp: document.getElementById('dlg-help'),
  btnCloseHelp: document.getElementById('btn-close-help'),

  // summary dialog (final only)
  dlgSummary: document.getElementById('dlg-summary'),
  sumTitle: document.getElementById('sum-title'),
  sumSubtitle: document.getElementById('sum-subtitle'),
  sumTable: document.getElementById('sum-table'),
  sumNote: document.getElementById('sum-note'),
  btnSumReplay: document.getElementById('btn-sum-replay'),
  btnSumFinish: document.getElementById('btn-sum-finish'),
};

function newState() {
  return {
    sessionId: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    sceneId: startScene,
    scores: {minat:0, keseimbangan:0, penghasilan:0, nilai:0, kepuasan:0},
    log: [],           // chronological list of steps
    ended: false,
    startedAt: new Date().toISOString()
  };
}

function persist() {
  localStorage.setItem('kp_state', JSON.stringify(state));
  const logs = JSON.parse(localStorage.getItem('kp_logs') || '[]');
  const existingIdx = logs.findIndex(l => l.sessionId === state.sessionId);
  if (existingIdx >= 0) logs[existingIdx] = state;
  else logs.push(state);
  localStorage.setItem('kp_logs', JSON.stringify(logs));
}

function loadPersisted() {
  const raw = localStorage.getItem('kp_state');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function updateScoreboard() {
  for (const k of SCORES) {
    const el = els.scoreboard[k];
    const newVal = state.scores[k] || 0;
    el.textContent = newVal;
  }
}

function applyEffects(effects) {
  if (!effects) return;
  for (const [k,v] of Object.entries(effects)) {
    if (SCORES.includes(k)) state.scores[k] = (state.scores[k] || 0) + Number(v || 0);
  }
}

function maybeFireRandom(scene) {
  if (!scene.random_events) return [];
  const fired = [];
  for (const ev of scene.random_events) {
    const p = Number(ev.p ?? 0);
    if (rng() < p) {
      applyEffects(ev.effects);
      fired.push(ev.text);
    }
  }
  return fired;
}

function reflect(scores) {
  const msgs = [];
  if (scores.minat > 50 && scores.nilai > 50) {
    msgs.push("Kamu cocok sebagai pendidik berdedikasi.");
  }
  if (scores.penghasilan > 100 && scores.kepuasan > 50) {
    msgs.push("Kamu mencapai kesuksesan finansial dan kepuasan karir.");
  }
  if (scores.keseimbangan > 50) {
    msgs.push("Kamu berhasil menyeimbangkan karir dan kehidupan pribadi.");
  }
  if (msgs.length === 0) msgs.push("Perjalananmu masih dinamis—coba eksplorasi pilihan lain.");
  return msgs;
}

// Final-score popup only
function openFinalSummary(scores) {
  const tbody = els.sumTable.querySelector('tbody');
  tbody.innerHTML = '';
  const dims = ["minat","keseimbangan","penghasilan","nilai","kepuasan"];
  for (const k of dims) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${k[0].toUpperCase()+k.slice(1)}</td><td>${Number(scores[k]||0)}</td>`;
    tbody.appendChild(tr);
  }
  els.dlgSummary.showModal();
}

function renderScene() {
  const sc = scenes[state.sceneId];
  if (!sc) {
    console.error("Scene not found:", state.sceneId);
    return;
  }
  els.scene.hidden = false;
  els.end.hidden = true;
  els.sceneId.textContent = state.sceneId;
  els.sceneText.textContent = sc.text;
  els.choices.innerHTML = '';
  els.rnd.hidden = true;
  els.rnd.textContent = '';

  sc.choices.forEach((ch, idx) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = `<div>${ch.label}</div>` + (ch.hint ? `<small>${ch.hint}</small>` : '');
    btn.addEventListener('click', () => {
      // apply effects and log
      applyEffects(ch.effects);
      const fired = maybeFireRandom(sc);
      state.log.push({
        t: new Date().toISOString(),
        scene: state.sceneId,
        choice: ch.label,
        effects: ch.effects || {},
        randoms: fired || []
      });
      updateScoreboard();
      persist();
      if (fired && fired.length) {
        els.rnd.textContent = `[Peristiwa] ${fired.join(" | ")}`;
        els.rnd.hidden = false;
      }

      if (ch.to === "END") {
        // show final summary, then let user choose Finish (go to reflections) or Replay
        openFinalSummary(state.scores);
      } else {
        state.sceneId = ch.to;
        renderScene();
      }
    });
    li.appendChild(btn);
    els.choices.appendChild(li);
  });

  updateScoreboard();
  els.btnRestart.disabled = false;
}

function endGame() {
  state.ended = true;
  persist();
  els.scene.hidden = true;
  els.end.hidden = false;
  const msgs = reflect(state.scores);
  els.reflections.innerHTML = '';
  for (const m of msgs) {
    const li = document.createElement('li');
    li.textContent = m;
    els.reflections.appendChild(li);
  }
}

function exportLogsCsv() {
  const logs = JSON.parse(localStorage.getItem('kp_logs') || '[]');
  const rows = [["session_id","started_at","ended","scores","steps"]];
  for (const s of logs) {
    rows.push([
      s.sessionId,
      s.startedAt || "",
      String(!!s.ended),
      JSON.stringify(s.scores),
      JSON.stringify(s.log),
    ]);
  }
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], {type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'karirmu-pilihanmu-logs.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function restart() {
  if (!confirm("Mulai ulang sesi ini? Progres sesi akan direset.")) return;
  state = newState();
  persist();
  renderScene();
  els.btnContinue.disabled = false;
}

function init() {
  scenes = window.GAME_DATA.scenes;
  startScene = window.GAME_DATA.start || "start";

  const saved = loadPersisted();
  if (saved && !saved.ended) {
    state = saved;
    els.btnContinue.disabled = false;
  }

  els.btnNew.addEventListener('click', () => {
    state = newState();
    persist();
    renderScene();
    els.btnContinue.disabled = false;
  });
  els.btnContinue.addEventListener('click', () => {
    if (!state) {
      const s = loadPersisted();
      if (s) state = s;
    }
    if (state.ended) {
      state = newState();
    }
    renderScene();
  });
  els.btnRestart.addEventListener('click', restart);
  els.btnExport.addEventListener('click', exportLogsCsv);
  els.btnHelp.addEventListener('click', () => els.dlgHelp.showModal());
  els.btnCloseHelp.addEventListener('click', () => els.dlgHelp.close());

  // final summary actions
  els.btnSumReplay.addEventListener('click', () => {
    els.dlgSummary.close();
    state = newState();
    persist();
    renderScene();
  });
  els.btnSumFinish.addEventListener('click', () => {
    els.dlgSummary.close();
    endGame();
  });

  // Auto-start if no save
  if (!saved) {
    state = newState();
    persist();
    renderScene();
  }
}

document.addEventListener('DOMContentLoaded', init);
