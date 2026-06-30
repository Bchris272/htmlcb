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

  function initContactForm() {
    var form = qs("#contact-form");
    var success = qs("#form-success");
    var tabs = qsa("[data-contact-tab]");
    var panels = qsa("[data-contact-panel]");
    var params = new URLSearchParams(window.location.search);

    if (params.get("sent") === "1" && success) {
      success.hidden = false;
      if (form) {
        form.hidden = true;
      }
      if (window.history.replaceState) {
        window.history.replaceState({}, "", window.location.pathname);
      }
    }

    if (form) {
      var nextField = qs("#form-next", form);
      if (nextField) {
        nextField.value =
          window.location.origin +
          window.location.pathname +
          "?sent=1#contact-form-heading";
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-contact-tab");
        tabs.forEach(function (item) {
          var isActive = item === tab;
          item.classList.toggle("is-active", isActive);
          item.setAttribute("aria-selected", isActive ? "true" : "false");
        });
        panels.forEach(function (panel) {
          var isActive = panel.getAttribute("data-contact-panel") === target;
          panel.hidden = !isActive;
        });
      });
    });
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
    initContactForm();
    initPageTransitions();
  });
})();
function openLightbox(figure) {
  var lightbox = document.getElementById("lightbox");
  var imgEl = document.getElementById("lightbox-img");
  var capEl = document.getElementById("lightbox-caption");
  if (!lightbox || !imgEl || !figure) return;
  var img = figure.querySelector("img");
  var cap = figure.querySelector("figcaption");
  if (!img) return;
  imgEl.src = img.src;
  imgEl.alt = img.alt;
  if (capEl) {
    capEl.textContent = cap ? cap.textContent : "";
  }
  lightbox.classList.add("open");
}
function closeLightbox() {
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.remove("open");
  }
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});