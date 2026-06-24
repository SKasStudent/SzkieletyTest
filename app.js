/* =========================================================
   Testy – Szkielety programistyczne
   Logika: losowanie pytań, pamięć przerobionych (localStorage),
   ocenianie, reset puli.
   ========================================================= */

const STORAGE_KEY = "szkielety_used_questions_v1";
const LETTERS = "ABCDEFGHIJ".split("");

// --- Elementy DOM ---
const el = (id) => document.getElementById(id);
const screens = {
  home: el("screen-home"),
  quiz: el("screen-quiz"),
  results: el("screen-results"),
};

let currentQuiz = []; // pytania bieżącego testu (z przetasowanymi opcjami)
let currentIndex = 0; // numer aktualnie wyświetlanego pytania
let score = 0; // liczba poprawnych odpowiedzi
let reviewData = []; // dane do końcowego podsumowania

/* ---------------- localStorage: przerobione pytania ---------------- */
function getUsedIds() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(raw) ? new Set(raw) : new Set();
  } catch {
    return new Set();
  }
}
function saveUsedIds(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}
function markUsed(ids) {
  const set = getUsedIds();
  ids.forEach((id) => set.add(id));
  saveUsedIds(set);
}
function resetPool() {
  localStorage.removeItem(STORAGE_KEY);
}
function getRemainingQuestions() {
  const used = getUsedIds();
  return QUESTIONS.filter((q) => !used.has(q.id));
}

/* ---------------- Narzędzia ---------------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.add("hidden"));
  screens[name].classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------------- Ekran startowy ---------------- */
function renderHome() {
  const total = QUESTIONS.length;
  const remaining = getRemainingQuestions();
  const used = total - remaining.length;

  el("stat-total").textContent = total;
  el("stat-used").textContent = used;
  el("stat-remaining").textContent = remaining.length;
  el("progress-fill").style.width = (used / total) * 100 + "%";

  const slider = el("count-slider");
  const sliderWrap = el("slider-wrap");
  const emptyMsg = el("empty-pool-msg");
  const btnStart = el("btn-start");

  if (remaining.length === 0) {
    sliderWrap.classList.add("hidden");
    emptyMsg.classList.remove("hidden");
    btnStart.disabled = true;
  } else {
    sliderWrap.classList.remove("hidden");
    emptyMsg.classList.add("hidden");
    btnStart.disabled = false;

    const max = remaining.length;
    slider.max = max;
    el("slider-max").textContent = max;

    // domyślnie 10 pytań (lub mniej, jeśli tyle nie zostało)
    let val = Math.min(10, max);
    if (Number(slider.value) > max || Number(slider.value) < 1) slider.value = val;
    el("count-value").textContent = slider.value;

    renderQuickButtons(max, Number(slider.value));
  }

  el("footer-note").textContent =
    `Baza: ${total} pytań • Dane zapisywane lokalnie w tej przeglądarce.`;
}

function renderQuickButtons(max, current) {
  const presets = [5, 10, 20, 30, max].filter(
    (v, i, arr) => v >= 1 && v <= max && arr.indexOf(v) === i
  );
  const wrap = el("quick-buttons");
  wrap.innerHTML = "";
  presets.forEach((v) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (v === current ? " active" : "");
    b.textContent = v === max ? `Wszystkie (${max})` : v;
    b.onclick = () => {
      el("count-slider").value = v;
      el("count-value").textContent = v;
      renderQuickButtons(max, v);
    };
    wrap.appendChild(b);
  });
}

/* ---------------- Start testu ---------------- */
function startTest(count) {
  const remaining = getRemainingQuestions();
  const picked = shuffle(remaining).slice(0, count);

  currentQuiz = picked.map((q) => {
    // przetasuj opcje, zapamiętaj które są poprawne
    const opts = q.options.map((text, idx) => ({
      text,
      correct: q.correct.includes(idx),
    }));
    return {
      id: q.id,
      question: q.question,
      code: q.code || null,
      options: shuffle(opts),
      multiple: q.correct.length > 1,
    };
  });

  currentIndex = 0;
  score = 0;
  reviewData = [];

  renderQuestion();
  showScreen("quiz");
}

/* ---------------- Pojedyncze pytanie ---------------- */
function renderQuestion() {
  const q = currentQuiz[currentIndex];
  const total = currentQuiz.length;

  el("quiz-progress-text").textContent = `Pytanie ${currentIndex + 1} z ${total}`;
  el("quiz-score").textContent = `✔ ${score}`;
  el("quiz-progress-fill").style.width = (currentIndex / total) * 100 + "%";

  const inputType = q.multiple ? "checkbox" : "radio";
  const hint = q.multiple
    ? "Zaznacz wszystkie poprawne odpowiedzi"
    : "Zaznacz jedną odpowiedź";

  let html = `<div class="question-block" id="current-block">`;
  html += `<div class="q-number">PYTANIE ${currentIndex + 1} / ${total}</div>`;
  html += `<div class="q-text">${escapeHtml(q.question)}</div>`;
  if (q.code) html += `<pre class="code">${escapeHtml(q.code)}</pre>`;
  html += `<div class="q-hint">${hint}</div>`;

  q.options.forEach((opt, oi) => {
    const id = `opt_${oi}`;
    html += `
      <label class="option" for="${id}">
        <input type="${inputType}" name="answer" id="${id}" value="${oi}" />
        <span class="opt-letter">${LETTERS[oi]})</span>
        <span class="opt-text">${escapeHtml(opt.text)}</span>
      </label>`;
  });
  html += `</div>`;
  el("quiz-form").innerHTML = html;

  // reset przycisków i informacji zwrotnej
  el("quiz-feedback").className = "feedback hidden";
  el("quiz-feedback").innerHTML = "";
  el("btn-confirm").classList.remove("hidden");
  el("btn-confirm").disabled = true;
  el("btn-next").classList.add("hidden");
  el("btn-next").textContent =
    currentIndex === total - 1 ? "Zakończ test →" : "Następne pytanie →";

  // podświetlanie wyboru + odblokowanie przycisku Potwierdź
  const block = el("current-block");
  block.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      el("btn-confirm").disabled = false;
      if (input.type === "radio") {
        block.querySelectorAll(".option").forEach((o) => o.classList.remove("selected"));
      }
      block.querySelectorAll(".option").forEach((label) => {
        label.classList.toggle("selected", label.querySelector("input").checked);
      });
    });
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------------- Potwierdzenie odpowiedzi (informacja zwrotna) ---------------- */
function confirmAnswer() {
  const q = currentQuiz[currentIndex];
  const total = currentQuiz.length;
  const selected = [...document.querySelectorAll('input[name="answer"]:checked')].map((i) =>
    Number(i.value)
  );
  if (selected.length === 0) return; // wymagana co najmniej jedna odpowiedź

  const correctIdx = q.options.map((o, i) => (o.correct ? i : -1)).filter((i) => i >= 0);
  const isCorrect =
    selected.length === correctIdx.length && selected.every((s) => correctIdx.includes(s));
  if (isCorrect) score++;

  // zablokuj opcje i pokaż, które są poprawne / błędne
  const block = el("current-block");
  block.classList.add("locked");
  block.querySelectorAll(".option").forEach((label, oi) => {
    label.querySelector("input").disabled = true;
    label.classList.remove("selected");
    const isCorrectOpt = q.options[oi].correct;
    const wasSelected = selected.includes(oi);
    if (isCorrectOpt) {
      label.classList.add("correct");
      label.insertAdjacentHTML(
        "beforeend",
        `<span class="mark">${wasSelected ? "✓ Twój wybór (poprawny)" : "✓ Poprawna"}</span>`
      );
    } else if (wasSelected) {
      label.classList.add("wrong");
      label.insertAdjacentHTML("beforeend", `<span class="mark">✗ Twój wybór</span>`);
    }
  });

  // informacja zwrotna
  const fb = el("quiz-feedback");
  fb.className = "feedback " + (isCorrect ? "ok" : "bad");
  fb.textContent = isCorrect ? "✓ Poprawnie!" : "✗ Niepoprawnie.";

  // zapamiętaj wynik + oznacz pytanie jako przerobione
  reviewData.push({ q, selected, correctIdx, isCorrect });
  markUsed([q.id]);

  el("quiz-score").textContent = `✔ ${score}`;
  el("quiz-progress-fill").style.width = ((currentIndex + 1) / total) * 100 + "%";
  el("btn-confirm").classList.add("hidden");
  el("btn-next").classList.remove("hidden");
  el("btn-next").focus();
}

/* ---------------- Następne pytanie / koniec ---------------- */
function nextQuestion() {
  currentIndex++;
  if (currentIndex >= currentQuiz.length) {
    renderResults(score, reviewData);
    showScreen("results");
  } else {
    renderQuestion();
  }
}

function renderResults(score, review) {
  const total = review.length;
  const pct = Math.round((score / total) * 100);

  el("result-score").textContent = `${score} / ${total}`;
  el("result-percent").textContent = `${pct}%`;

  let note;
  if (pct === 100) note = "🏆 Perfekcyjnie! Komplet punktów.";
  else if (pct >= 75) note = "💪 Bardzo dobrze!";
  else if (pct >= 50) note = "🙂 Nieźle, ale warto powtórzyć.";
  else note = "📚 Czas na więcej nauki.";
  el("result-note").textContent = note;

  const container = el("results-review");
  container.innerHTML = "";

  review.forEach((r, idx) => {
    const block = document.createElement("div");
    block.className = "question-block";

    let html = `<div class="q-number">PYTANIE ${idx + 1} / ${total}</div>`;
    html += `<span class="review-status ${r.isCorrect ? "ok" : "bad"}">${
      r.isCorrect ? "✓ Poprawnie" : "✗ Błędnie"
    }</span>`;
    html += `<div class="q-text">${escapeHtml(r.q.question)}</div>`;
    if (r.q.code) html += `<pre class="code">${escapeHtml(r.q.code)}</pre>`;

    r.q.options.forEach((opt, oi) => {
      const isCorrectOpt = opt.correct;
      const wasSelected = r.selected.includes(oi);
      let cls = "option";
      let mark = "";
      if (isCorrectOpt) {
        cls += " correct";
        mark = wasSelected ? "✓ Twój wybór (poprawny)" : "✓ Poprawna";
      } else if (wasSelected) {
        cls += " wrong";
        mark = "✗ Twój wybór";
      }
      html += `
        <div class="${cls}">
          <span class="opt-letter">${LETTERS[oi]})</span>
          <span class="opt-text">${escapeHtml(opt.text)}</span>
          ${mark ? `<span class="mark">${mark}</span>` : ""}
        </div>`;
    });

    block.innerHTML = html;
    container.appendChild(block);
  });
}

/* ---------------- Pomocnicze ---------------- */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------------- Obsługa zdarzeń ---------------- */
el("count-slider").addEventListener("input", (e) => {
  const v = Number(e.target.value);
  el("count-value").textContent = v;
  renderQuickButtons(Number(e.target.max), v);
});

el("btn-start").addEventListener("click", () => {
  startTest(Number(el("count-slider").value));
});

el("btn-confirm").addEventListener("click", confirmAnswer);
el("btn-next").addEventListener("click", nextQuestion);

el("btn-abort").addEventListener("click", () => {
  if (
    confirm(
      "Przerwać test? Pytania, na które już odpowiedziano, pozostaną zapisane jako przerobione."
    )
  ) {
    renderHome();
    showScreen("home");
  }
});

el("btn-new-test").addEventListener("click", () => {
  renderHome();
  showScreen("home");
});

// Reset puli – z potwierdzeniem
el("btn-reset").addEventListener("click", () => el("confirm-overlay").classList.remove("hidden"));
el("confirm-no").addEventListener("click", () => el("confirm-overlay").classList.add("hidden"));
el("confirm-yes").addEventListener("click", () => {
  resetPool();
  el("confirm-overlay").classList.add("hidden");
  renderHome();
});

/* ---------------- Start ---------------- */
renderHome();
showScreen("home");
