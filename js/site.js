/* Narrow Path Medical Transport
   Small, dependency-free behaviour. Nothing here is required for the page
   to be readable or navigable; it is progressive enhancement only. */

(function () {
  "use strict";

  /* ---------------------------------------------------- mobile navigation */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });

    /* Close on navigation or Escape */
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-open") === "true") {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* --------------------------------------------------------- scroll reveal */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(
    ".band .card, .band .step, .band .standard, .band .section-head, .band .quote, .band .area-group"
  );

  if (reduced || !("IntersectionObserver" in window) || !targets.length) {
    return;
  }

  /* Opt in only now that we know we can undo it. */
  document.documentElement.classList.add("js-anim");

  Array.prototype.forEach.call(targets, function (el, i) {
    el.classList.add("reveal");
    el.style.transitionDelay = Math.min(i % 5, 4) * 60 + "ms";
  });

  /* Failsafe: whatever happens, nothing stays hidden for more than 3 seconds. */
  window.setTimeout(function () {
    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add("is-visible");
    });
  }, 3000);

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  Array.prototype.forEach.call(targets, function (el) {
    io.observe(el);
  });
})();
