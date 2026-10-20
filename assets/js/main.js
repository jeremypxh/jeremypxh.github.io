/* Xinghao Peng · site interactions. No dependencies. */
(function () {
  "use strict";

  var root = document.documentElement;
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } }
  };
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Theme (light / dark) ---------- */
  var toggle = $("[data-theme-toggle]");
  var themeMeta = $('meta[name="theme-color"]');
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(t === "dark"));
      toggle.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
    if (themeMeta) themeMeta.setAttribute("content", t === "dark" ? "#0b1019" : "#f7f7f4");
  }
  applyTheme(root.getAttribute("data-theme") || "light");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      store.set("theme", next);
    });
  }
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var follow = function (e) { if (!store.get("theme")) applyTheme(e.matches ? "dark" : "light"); };
    if (mq.addEventListener) mq.addEventListener("change", follow);
    else if (mq.addListener) mq.addListener(follow);
  }

  /* ---------- Header border once the page scrolls ---------- */
  var header = $(".site-header");
  var onScroll = function () { if (header) header.classList.toggle("is-scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var menuBtn = $("[data-menu-toggle]");
  var nav = $("#site-nav");
  function closeMenu() {
    if (!nav || !menuBtn) return;
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
    document.addEventListener("click", function (e) { if (!nav.contains(e.target)) closeMenu(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- Highlight the section in view ---------- */
  var navLinks = $$('.nav a[href^="#"]');
  if ("IntersectionObserver" in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
        var link = byId[entry.target.id];
        if (link) { link.classList.add("is-active"); link.setAttribute("aria-current", "true"); }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); rio.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.04 });
    reveals.forEach(function (el) { rio.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Publication filters ---------- */
  var filters = $$("[data-filter]");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      filters.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      $$(".pub").forEach(function (p) {
        p.classList.toggle("is-hidden", f !== "all" && p.getAttribute("data-type") !== f);
      });
      $$(".pub-group").forEach(function (g) {
        g.classList.toggle("is-hidden", !g.querySelector(".pub:not(.is-hidden)"));
      });
    });
  });

  /* ---------- BibTeX: show / hide and copy ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
      resolve();
    });
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-bib-toggle]");
    if (t) {
      var box = document.getElementById(t.getAttribute("aria-controls"));
      if (box) {
        var willOpen = box.hidden;
        box.hidden = !willOpen;
        t.setAttribute("aria-expanded", String(willOpen));
      }
      return;
    }
    var c = e.target.closest("[data-copy]");
    if (c) {
      var src = document.getElementById(c.getAttribute("data-copy"));
      if (!src) return;
      var label = c.getAttribute("aria-label");
      copyText(src.textContent.trim()).then(function () {
        c.classList.add("is-copied");
        c.setAttribute("aria-label", "Copied");
        setTimeout(function () { c.classList.remove("is-copied"); c.setAttribute("aria-label", label); }, 1600);
      });
    }
  });

  /* ---------- Photo lightbox ---------- */
  var dlg = $("#lightbox");
  if (dlg && typeof dlg.showModal === "function") {
    var lbImg = $("img", dlg);
    var lbTitle = $(".lb-cap strong", dlg);
    var lbMeta = $(".lb-cap span", dlg);
    var lbCount = $(".lb-count", dlg);
    var group = [];
    var idx = 0;
    var show = function (i) {
      idx = (i + group.length) % group.length;
      var a = group[idx];
      var thumb = $("img", a);
      lbImg.src = a.getAttribute("href");
      lbImg.alt = thumb ? thumb.alt : "";
      lbTitle.textContent = a.getAttribute("data-title") || "";
      lbMeta.textContent = a.getAttribute("data-meta") || "";
      lbCount.textContent = (idx + 1) + " / " + group.length;
      dlg.classList.toggle("is-single", group.length < 2);
    };
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a[data-lightbox]");
      if (!a) return;
      e.preventDefault();
      group = $$('a[data-lightbox="' + a.getAttribute("data-lightbox") + '"]');
      show(group.indexOf(a));
      dlg.showModal();
    });
    $(".lb-close", dlg).addEventListener("click", function () { dlg.close(); });
    $(".lb-prev", dlg).addEventListener("click", function () { show(idx - 1); });
    $(".lb-next", dlg).addEventListener("click", function () { show(idx + 1); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.classList.contains("lb-figure")) dlg.close(); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(idx - 1);
      else if (e.key === "ArrowRight") show(idx + 1);
    });
    var blank = lbImg.getAttribute("src");
    dlg.addEventListener("close", function () { lbImg.src = blank; });
  }

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
