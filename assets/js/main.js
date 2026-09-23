/* Yaswanth Kobaku — Professional Portfolio interactions */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* Mobile nav */
  var t = document.getElementById("navToggle"), l = document.querySelector(".nav__links");
  if (t && l) {
    t.addEventListener("click", function () {
      var o = l.classList.toggle("open");
      t.setAttribute("aria-expanded", o ? "true" : "false");
    });
    l.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { l.classList.remove("open"); t.setAttribute("aria-expanded", "false"); });
    });
  }

  /* Rotating role */
  var rot = document.getElementById("rotator");
  if (rot) {
    var roles = ["Cybersecurity Engineer", "AI / ML Engineer", "Software Developer", "Security Researcher", "VAPT Specialist"];
    if (!reduce) {
      var i = 0;
      setInterval(function () {
        i = (i + 1) % roles.length;
        rot.style.opacity = 0;
        setTimeout(function () { rot.textContent = roles[i]; rot.style.opacity = 1; }, 220);
      }, 2400);
      rot.style.transition = "opacity .22s ease";
    }
  }

  /* Count up */
  function count(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduce) { el.textContent = target; return; }
    var t0 = performance.now(), dur = 1200;
    (function step(now) {
      var p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e);
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* Reveal + counters */
  var els = document.querySelectorAll(".stat, .about, .tl, .card, .skillgroup, .creds__col, .contact");
  els.forEach(function (e) { e.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        if (en.target.classList.contains("stat")) {
          var n = en.target.querySelector("b[data-count]");
          if (n && !n.dataset.done) { n.dataset.done = "1"; count(n); }
        }
        io.unobserve(en.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (e) { io.observe(e); });
  } else {
    els.forEach(function (e) { e.classList.add("in"); });
    document.querySelectorAll("b[data-count]").forEach(count);
  }

  /* Project filter */
  var filters = document.querySelectorAll(".filter"), cards = document.querySelectorAll("#cards .card");
  filters.forEach(function (b) {
    b.addEventListener("click", function () {
      filters.forEach(function (x) { x.classList.remove("is-active"); });
      b.classList.add("is-active");
      var f = b.getAttribute("data-filter");
      cards.forEach(function (c) { c.hidden = !(f === "all" || c.getAttribute("data-cat") === f); });
    });
  });
})();
