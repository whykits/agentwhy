/* Agent WHY · agentwhy.cn — 交互脚本 */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- 主题切换 ---------- */
  var metaTheme = document.querySelector('meta[name="theme-color"]');
  var toggle = document.getElementById("themeToggle");

  function applyThemeMeta(theme) {
    if (metaTheme) {
      metaTheme.setAttribute(
        "content",
        theme === "dark" ? "#0f1013" : "#fbfaf8"
      );
    }
  }

  if (toggle) {
    applyThemeMeta(root.dataset.theme);
    toggle.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      applyThemeMeta(next);
    });
  }

  /* ---------- 导航滚动态 ---------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 内容渲染（内容统一在 content.js 配置） ---------- */
  var SITE = window.SITE || {};

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;", "<": "&lt;", ">": "&gt;",
        '"': "&quot;", "'": "&#39;",
      }[c];
    });
  }

  if (SITE.github) {
    document.querySelectorAll('[data-site="github"]').forEach(function (a) {
      a.setAttribute("href", SITE.github);
    });
  }

  if (SITE.email) {
    var addr = document.querySelector('[data-site="email-text"]');
    if (addr) addr.textContent = SITE.email;
    var copyTarget = document.getElementById("copyEmail");
    if (copyTarget) copyTarget.setAttribute("data-email", SITE.email);
  }

  var cardsBox = document.getElementById("cards");
  if (cardsBox && Array.isArray(SITE.share) && SITE.share.length) {
    var ARROW =
      '<svg class="card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true" focusable="false"><path d="M7 17L17 7M8 7h9v9"/></svg>';
    cardsBox.innerHTML = SITE.share
      .map(function (item, i) {
        var tags = (item.tags || [])
          .map(function (t) { return "<li>" + escapeHtml(t) + "</li>"; })
          .join("");
        var href = item.link || SITE.github || "#";
        return (
          '<a class="card reveal d' + ((i % 3) + 1) + '" href="' + escapeHtml(href) +
          '" target="_blank" rel="noopener">' +
          '<div class="card-top"><h3>' + escapeHtml(item.title) + "</h3>" + ARROW + "</div>" +
          "<p>" + escapeHtml(item.desc) + "</p>" +
          '<ul class="tags mono">' + tags + "</ul></a>"
        );
      })
      .join("");
  }

  /* ---------- 滚动入场 ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 复制邮箱 ---------- */
  var copyBtn = document.getElementById("copyEmail");
  if (copyBtn) {
    var label = copyBtn.querySelector(".copy-label");
    copyBtn.addEventListener("click", function () {
      var text = copyBtn.dataset.email || "";
      var done = function () {
        copyBtn.classList.add("copied");
        if (label) label.textContent = "已复制";
        setTimeout(function () {
          copyBtn.classList.remove("copied");
          if (label) label.textContent = "复制";
        }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    });
  }

  /* ---------- 年份 ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
