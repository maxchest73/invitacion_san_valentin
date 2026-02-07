document.addEventListener("DOMContentLoaded", () => {
  const girlfriendName = "Mi Bebita Hermosa";
  const correctAnswer = "ui"; // exacto

  const yesMessage = `Tal vez no sepa programar el futuro,
pero si de algo estoy seguro es que te quiero
en cada versión de mi vida. 💖


Te espero para nuestra cita sera este 14 de febrero en Tongoy 🌊✨

Te amo mucho, mi vida 💋❤️`;

  const PLAY_SONG_ON_YES = true;
  const SONG_START = 14;
  const SONG_END = 230;

  // Frases fotos 1-8 (edítalas tú)
  const photoCaptions = {
    foto1: "Dia de pichina con la bebita, tan guapa ñau.😍",
    foto2: "Lit somos un tuyo, pero siempre tuyo y de nadie mas.😜",
    foto3: "Primer dia de pichina, estuvo muy bonito, me dejo lokito mi serenita.🤤",
    foto4: "Mi mujel y de nadie mas, NADIE MAS.💍",
    foto5: "Ese dia hicimos un cambio hasta el dia de hoy y lo seguiremos haciendo.💪",
    foto6: "Nuestra primera fotito de un atardecer en el depa, muy tierno.🌇",
    foto7: "Nuestro primer San Valentin juntitos, fue algo muy especial para los 2, sobretodo para mi ya que pude contarle algo sobre mi que no me dejaba ser yo, Gracias mi Amorcito.🥰😘",
    foto8: "Siempre chulitos, Respeta el flow.😎",
  };

  const $ = (id) => document.getElementById(id);

  const nameEl = $("name");
  const yesBtn = $("yesBtn");
  const noBtn = $("noBtn");
  const specialBtn = $("specialBtn");

  const resultEl = $("result");
  const finalYesEl = $("finalYes");

  const questionBox = $("questionBox");
  const answerInput = $("answerInput");
  const answerBtn = $("answerBtn");
  const answerResult = $("answerResult");

  const modal9 = $("modal");
  const closeModal9 = $("closeModal");

  const imgModal = $("imgModal");
  const imgModalPhoto = $("imgModalPhoto");
  const imgModalText = $("imgModalText");
  const closeImgModal = $("closeImgModal");

  const loveLayer = $("loveLayer");
  const heartBig = $("heartBig");
  const song = $("song");

  if (nameEl) nameEl.textContent = girlfriendName;

  // ===== Modal fotos 1-8 =====
  document.querySelectorAll(".pic.clickable").forEach((img) => {
    img.addEventListener("click", () => {
      if (!imgModal) return;
      const key = img.getAttribute("data-key");
      imgModalPhoto.src = img.src;
      imgModalText.textContent = photoCaptions[key] ?? "Escribe tu frase aquí ✍️";
      imgModal.style.display = "flex";
      imgModal.setAttribute("aria-hidden", "false");
    });
  });

  function hideImgModal() {
    if (!imgModal) return;
    imgModal.style.display = "none";
    imgModal.setAttribute("aria-hidden", "true");
    imgModalPhoto.src = "";
    imgModalText.textContent = "";
  }

  closeImgModal?.addEventListener("click", hideImgModal);
  imgModal?.addEventListener("click", (e) => { if (e.target === imgModal) hideImgModal(); });

  // ===== Corazón sin delay: se construye al cargar =====
  let heartBuilt = false;

  // Construir en segundo plano apenas carga
  setTimeout(() => {
    buildHeartOnce();
  }, 60);

  function showHeartNow() {
    if (!heartBig) return;
    heartBig.style.display = "block"; // ✅ instantáneo
    if (!heartBuilt) buildHeartOnce(); // respaldo
  }

  function buildHeartOnce() {
    if (!heartBig || heartBuilt) return;
    heartBuilt = true;

    // lo dejamos oculto mientras lo construimos
    const prev = heartBig.style.display;
    heartBig.style.display = "none";

    const points = [];
    const steps = 220; // ✅ menos puntos = más rápido
    for (let i = 0; i < steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
      points.push({ x, y });
    }

    const w = window.innerWidth;
    const h = window.innerHeight;

    // ✅ más grande y más ARRIBA
    const scale = Math.min(w, h) / 30;
    const cx = w / 2;
    const cy = h / 2.55; // ✅ arriba del recuadro

    for (const p of points) {
      const s = document.createElement("span");
      s.className = "heartDot";
      s.textContent = Math.random() < 0.14 ? "💋" : "❤️";
      s.style.left = (cx + p.x * scale) + "px";
      s.style.top  = (cy - p.y * scale) + "px";
      s.style.fontSize = (14 + Math.random() * 16) + "px";
      heartBig.appendChild(s);
    }

    heartBig.style.display = prev; // vuelve como estaba
  }

  // ===== Sí =====
  let launchedOnce = false;

  yesBtn?.addEventListener("click", async () => {
    hideQuestion();
    if (resultEl) resultEl.textContent = yesMessage;

    spawnLoveBurst(1600); // emojis siempre
    showHeartNow();       // ✅ corazón instantáneo

    if (!launchedOnce) {
      launchedOnce = true;

      if (PLAY_SONG_ON_YES && song) {
        try {
          song.volume = 0.18;
          song.currentTime = SONG_START;
          await song.play();

          const stopAt = () => {
            if (song.currentTime >= SONG_END) {
              song.pause();
              song.removeEventListener("timeupdate", stopAt);
            }
          };
          song.addEventListener("timeupdate", stopAt);
        } catch (e) {
          console.log("Audio bloqueado/no disponible:", e);
        }
      }

      if (finalYesEl) setTimeout(() => { finalYesEl.textContent = "Sí 💍"; }, 2600);
    }
  });

  // ===== No =====
  const noMessages = [
    "Ups… creo que te equivocaste 😅",
    "Ese click no era el que querías 👀",
    "Jajaja intentaste apretar 'No' pero tu corazón dijo otra cosa 💖",
    "Ya po… era broma 😌"
  ];
  let noCount = 0;

  noBtn?.addEventListener("click", () => {
    hideQuestion();
    if (resultEl) resultEl.textContent = noMessages[Math.min(noCount, noMessages.length - 1)];
    noCount++;

    const rect = noBtn.getBoundingClientRect();
    const maxX = Math.max(0, window.innerWidth - rect.width);
    const maxY = Math.max(0, window.innerHeight - rect.height);

    noBtn.style.position = "fixed";
    noBtn.style.left = (Math.random() * maxX) + "px";
    noBtn.style.top = (Math.random() * maxY) + "px";
    noBtn.style.zIndex = "99999";
  });

  // ===== Pregunta =====
  specialBtn?.addEventListener("click", () => {
    if (resultEl) resultEl.textContent = "";
    if (finalYesEl) finalYesEl.textContent = "";
    if (questionBox) questionBox.style.display = "block";
    if (answerResult) answerResult.textContent = "";
    if (answerInput) { answerInput.value = ""; answerInput.focus(); }
  });

  answerBtn?.addEventListener("click", () => {
    const userAnswer = (answerInput?.value ?? "").trim(); // case-sensitive
    if (userAnswer === correctAnswer) {
      if (answerResult) answerResult.textContent = "Acceso concedido 💖";
      setTimeout(() => { if (modal9) modal9.style.display = "flex"; }, 1000);
    } else {
      if (answerResult) answerResult.textContent = "❌ Incorrecto… me debes un sentón jejeje 😈, vas bien pero no le decimos asi";
    }
  });

  function hideModal9() {
    if (!modal9) return;
    modal9.style.display = "none";
    hideQuestion();
  }
  closeModal9?.addEventListener("click", hideModal9);
  modal9?.addEventListener("click", (e) => { if (e.target === modal9) hideModal9(); });

  function hideQuestion() {
    if (questionBox) questionBox.style.display = "none";
    if (answerInput) answerInput.value = "";
    if (answerResult) answerResult.textContent = "";
  }

  // ===== Emojis del Sí =====
  function spawnLoveBurst(durationMs = 1500) {
    if (!loveLayer) return;
    const emojis = ["❤️","💖","💘","💝","💞","💓","💋","🎈","✨"];
    const start = performance.now();

    const timer = setInterval(() => {
      if (performance.now() - start > durationMs) {
        clearInterval(timer);
        return;
      }
      for (let i = 0; i < 3; i++) {
        const span = document.createElement("span");
        span.className = "float";
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.left = (Math.random() * 100) + "vw";
        span.style.fontSize = (22 + Math.random() * 26) + "px";
        const dur = 2.8 + Math.random() * 2.8;
        span.style.animationDuration = dur + "s";
        loveLayer.appendChild(span);
        setTimeout(() => span.remove(), (dur * 1000) + 300);
      }
    }, 55);
  }
});

