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
