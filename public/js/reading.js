/**
 * Adrian | SecLog - Reading Article Page Controller (reading.js)
 * Standalone JavaScript for Halaman Reading (reading_article_clean_editorial_layout/index.html)
 * Tailwind CSS + DaisyUI Standalone Implementation
 */

// Immediate Theme Initialization (prevents FOUC on page load)
(function initThemeEarly() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  initThemeController();
  initClipboardCopy();
  initShareButton();
  initBookmarkButton();
  initTableOfContentsScrollSpy();
  addMarginScroll();
});

// add margin scroll for h2
function addMarginScroll() {
  const header = document.querySelector("header");

  if (header) {
    // Ambil tinggi asli header saat ini di layar browser
    const headerHeight = header.offsetHeight;

    // Tambahkan bonus jarak aman 20px agar judul tidak menempel ketat di bawah header
    const totalMargin = headerHeight + 20;

    // Cari semua tag h2 di halaman, lalu pasang style scroll-margin-top secara dinamis
    const allH2 = document.querySelectorAll("h2");
    allH2.forEach((h2) => {
      h2.style.scrollMarginTop = `${totalMargin}px`;
    });
  }
}

/**
 * DaisyUI Theme Controller & Storage Sync
 */
function initThemeController() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const controllers = document.querySelectorAll(".theme-controller");

  // Sync initial state of checkbox toggles
  controllers.forEach((toggle) => {
    if (toggle.value === "light") {
      toggle.checked = savedTheme === "light";
    } else if (toggle.value === "dark") {
      toggle.checked = savedTheme === "dark";
    }
  });

  // Global change listener for theme-controller checkbox
  document.addEventListener("change", (e) => {
    if (e.target && e.target.matches(".theme-controller")) {
      let newTheme = "dark";
      if (e.target.value === "light") {
        newTheme = e.target.checked ? "light" : "dark";
      } else {
        newTheme = e.target.checked ? e.target.value : "dark";
      }

      applyTheme(newTheme);
      showToast(
        newTheme === "light"
          ? "Mode terang diaktifkan"
          : "Mode gelap diaktifkan",
        "info",
      );
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("theme", theme);

  // Sync all theme-controller toggles on page
  document.querySelectorAll(".theme-controller").forEach((toggle) => {
    if (toggle.value === "light") {
      toggle.checked = theme === "light";
    } else if (toggle.value === "dark") {
      toggle.checked = theme === "dark";
    }
  });
}

/**
 * Toast Notification Helper (DaisyUI compatible)
 */
function showToast(message, type = "success") {
  let toastContainer = document.getElementById("seclog-toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "seclog-toast-container";
    toastContainer.className =
      "toast toast-top toast-end z-50 fixed top-4 right-4 flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(toastContainer);
  }

  const alert = document.createElement("div");
  const alertColor =
    type === "success"
      ? "bg-primary text-on-primary border-primary"
      : type === "error"
        ? "bg-error text-on-error border-error"
        : "bg-surface-container-high text-on-surface border-outline-variant";

  alert.className = `alert ${alertColor} shadow-xl py-2.5 px-4 rounded-lg text-xs font-mono flex items-center gap-2.5 border transition-all duration-300 transform translate-y-[-10px] opacity-0 pointer-events-auto`;
  alert.innerHTML = `
    <span class="material-symbols-outlined text-sm shrink-0">${type === "success" ? "check_circle" : type === "error" ? "error" : "info"}</span>
    <span class="font-medium">${message}</span>
  `;

  toastContainer.appendChild(alert);

  // Animate in
  requestAnimationFrame(() => {
    alert.classList.remove("translate-y-[-10px]", "opacity-0");
  });

  // Remove after 2.5s
  setTimeout(() => {
    alert.classList.add("opacity-0", "translate-y-[-10px]");
    setTimeout(() => alert.remove(), 300);
  }, 2500);
}

/**
 * Code Copy Button Handler
 */
function initClipboardCopy() {
  document.querySelectorAll("button").forEach((btn) => {
    const text = btn.innerText.trim();
    if (text.includes("Salin") || text.includes("Copy")) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const container = btn.closest(
          ".rounded, .overflow-hidden, article, section",
        );
        let codeText = "";

        if (container) {
          const codeEl = container.querySelector("code, pre");
          if (codeEl) {
            codeText = codeEl.innerText.replace(/^\$\s*/gm, ""); // Strip leading bash prompts
          }
        }

        if (!codeText) {
          codeText = btn.getAttribute("data-copy-target") || "";
        }

        if (codeText) {
          navigator.clipboard
            .writeText(codeText.trim())
            .then(() => {
              const originalHTML = btn.innerHTML;
              btn.innerHTML = `<span class="material-symbols-outlined text-[14px]">check</span><span>Tersalin!</span>`;
              showToast("Kode berhasil disalin ke papan klip", "success");
              setTimeout(() => {
                btn.innerHTML = originalHTML;
              }, 2000);
            })
            .catch(() => {
              showToast("Gagal menyalin kode ke papan klip", "error");
            });
        }
      });
    }
  });
}

/**
 * Share Button Handler
 */
function initShareButton() {
  const shareBtn = document.querySelector('button[title*="Bagikan"]');
  if (!shareBtn) return;

  shareBtn.addEventListener("click", () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          showToast("Tautan artikel disalin ke papan klip", "success");
        })
        .catch(() => {
          showToast("Gagal menyalin tautan artikel", "error");
        });
    }
  });
}

/**
 * Bookmark Button Handler with Local Storage Persistence
 */
function initBookmarkButton() {
  const bookmarkBtn = document.querySelector('button[title*="Simpan"]');
  if (!bookmarkBtn) return;

  const storageKey =
    "seclog_bookmark_" +
    (window.location.pathname.split("/").filter(Boolean).pop() || "article");
  let isBookmarked = localStorage.getItem(storageKey) === "true";

  function updateButtonState(bookmarked) {
    const icon = bookmarkBtn.querySelector(".material-symbols-outlined");
    const label = bookmarkBtn.querySelector("span:last-child");
    if (bookmarked) {
      if (icon) icon.textContent = "bookmark_added";
      if (label) label.textContent = "Tersimpan";
      bookmarkBtn.classList.add("border-primary", "text-primary");
    } else {
      if (icon) icon.textContent = "bookmark";
      if (label) label.textContent = "Simpan";
      bookmarkBtn.classList.remove("border-primary", "text-primary");
    }
  }

  // Set initial state
  updateButtonState(isBookmarked);

  bookmarkBtn.addEventListener("click", () => {
    isBookmarked = !isBookmarked;
    localStorage.setItem(storageKey, isBookmarked ? "true" : "false");
    updateButtonState(isBookmarked);

    if (isBookmarked) {
      showToast("Artikel disimpan ke daftar bacaan lokal", "success");
    } else {
      showToast("Artikel dihapus dari daftar bacaan", "info");
    }
  });
}

/**
 * Table of Contents ScrollSpy & Smooth Scroll
 */
function initTableOfContentsScrollSpy() {
  const tocLinks = document.querySelectorAll('aside nav a[href^="#"]');
  if (!tocLinks.length) return;

  const sections = [];
  tocLinks.forEach((link) => {
    const id = link.getAttribute("href").replace("#", "");
    const targetSection = document.getElementById(id);
    if (targetSection) {
      sections.push({ id, link, el: targetSection });
    }

    // Smooth scroll on click
    link.addEventListener("click", (e) => {
      e.preventDefault();
      // 1. PINDAHKAN WARNA AKTIF DI SIDEBAR
      tocLinks.forEach((l) => {
        // Kembalikan semua menu ke warna NORMAL
        l.className =
          "block py-1 text-on-surface-variant hover:text-primary transition-colors";
      });
      // Beri warna AKTIF hanya pada menu yang baru saja diklik
      link.className =
        "block py-1 text-primary font-medium transition-colors font-bold";

      // 2. EFEK SMOOTH SCROLL DENGAN HITUNGAN TINGGI HEADER
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;
      const topOffset =
        targetSection.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: topOffset - headerHeight - 20, // Dikurangi tinggi header + jarak aman 20px
        behavior: "smooth",
      });

      // Update URL di browser tanpa reload halaman (opsional)
      history.pushState(null, null, `#${id}`);
    });
  });
}
