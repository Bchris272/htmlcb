(function () {
  "use strict";

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function closeNav() {
    var body = document.body;
    var toggle = qs(".nav-toggle");
    var nav = qs("#primary-navigation");
    if (!toggle || !nav) return;
    body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openNav() {
    var body = document.body;
    var toggle = qs(".nav-toggle");
    if (!toggle) return;
    body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  function initNav() {
    var toggle = qs(".nav-toggle");
    var nav = qs("#primary-navigation");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeNav();
      } else {
        openNav();
      }
    });

    qsa(".nav-list a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 900px)").matches) {
          closeNav();
        }
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeNav();
      }
    });

    window.addEventListener(
      "resize",
      function () {
        if (!window.matchMedia("(max-width: 900px)").matches) {
          closeNav();
        }
      },
      { passive: true }
    );
  }

  function initPageTransitions() {
    var internal =
      'a[href$=".html"]:not([data-no-transition]):not([target="_blank"])';
    qsa(internal).forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          anchor.hasAttribute("data-no-transition")
        ) {
          return;
        }
        var url = anchor.getAttribute("href");
        if (!url || url.indexOf("#") === 0) {
          return;
        }
        var dest = anchor.href;
        if (dest === window.location.href) {
          return;
        }
        e.preventDefault();
        document.body.classList.add("is-leaving");
        window.setTimeout(function () {
          window.location.href = url;
        }, 180);
      });
    });

    document.body.classList.add("is-entered");
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initPageTransitions();
  });
})();
function openLightbox(figure) {
  const img = figure.querySelector('img');
  const cap = figure.querySelector('figcaption');
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox-img').alt = img.alt;
  document.getElementById('lightbox-caption').textContent = cap ? cap.textContent : '';
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });