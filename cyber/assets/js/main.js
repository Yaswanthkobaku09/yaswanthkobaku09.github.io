/* ============================================================
   Yaswanth Kobaku — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Hero typing effect ---------- */
  var typed = document.getElementById("typed");
  if (typed) {
    var phrases = [
      "Penetration Tester // VAPT",
      "Web & Infra Exploitation",
      "AI-Driven Offensive Security",
      "OWASP Top 10 · WSTG",
      "Binary Exploitation · ROP",
    ];
    if (reduceMotion) {
      typed.textContent = phrases[0];
    } else {
      var pi = 0, ci = 0, deleting = false;
      (function tick() {
        var word = phrases[pi];
        typed.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
        var delay = deleting ? 40 : 78;
        if (!deleting && ci === word.length + 1) { deleting = true; delay = 1500; }
        else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 340; }
        setTimeout(tick, delay);
      })();
    }
  }

  /* ---------- Count-up stats ---------- */
  function runCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduceMotion) { el.textContent = target; return; }
    var start = 0, dur = 1200, t0 = performance.now();
    (function step(now) {
      var p = Math.min((now - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (target - start) * eased);
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ---------- Reveal on scroll + trigger counters ---------- */
  var revealEls = document.querySelectorAll(
    ".stat, .about, .tl, .ai-card, .card, .skillcol, .certs li, .research, .contact__row, .contact__intro"
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        var num = e.target.querySelector ? e.target.querySelector(".stat__num") : null;
        if (e.target.classList.contains("stat")) {
          var n = e.target.querySelector(".stat__num");
          if (n && !n.dataset.done) { n.dataset.done = "1"; runCount(n); }
        }
        io.unobserve(e.target);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
    document.querySelectorAll(".stat__num").forEach(runCount);
  }

  /* ---------- Project filters ---------- */
  var filters = document.querySelectorAll(".filter");
  var cards = document.querySelectorAll("#cards .card");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.classList.remove("is-active"); b.setAttribute("aria-selected", "false"); });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      var f = btn.getAttribute("data-filter");
      cards.forEach(function (card) {
        var show = f === "all" || card.getAttribute("data-cat") === f;
        card.hidden = !show;
      });
    });
  });
})();
