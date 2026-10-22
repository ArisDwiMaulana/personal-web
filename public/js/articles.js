/**
 * Adrian | SecLog - Articles Page Controller (articles.js)
 * Standalone JavaScript for Halaman Artikel (articles/index.html)
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
  //initArticleFiltersAndSearch();
  //initNewsletterForm();
  initPagination();
});

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
 * Combined Article Filter & Search Controller
 */
// function initArticleFiltersAndSearch() {
//   const searchInput = document.querySelector('input[data-article-search]');
//   const filterButtons = document.querySelectorAll('button[data-filter]');
//   const articlesContainer = document.getElementById('articles-container');
//   const articles = articlesContainer ? articlesContainer.querySelectorAll('article[data-category]') : [];
//   const countLabel = document.querySelector('.border-t span.font-mono');
//
//   if (!articles.length) return;
//
//   let activeCategory = 'all';
//   let searchQuery = '';
//
//   // Empty state container element
//   let emptyState = document.getElementById('articles-empty-state');
//   if (!emptyState && articlesContainer) {
//     emptyState = document.createElement('div');
//     emptyState.id = 'articles-empty-state';
//     emptyState.className = 'col-span-1 md:col-span-2 lg:col-span-3 p-8 rounded-xl bg-surface-container border border-outline-variant text-center space-y-3 hidden';
//     emptyState.innerHTML = `
//       <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-high text-outline">
//         <span class="material-symbols-outlined text-2xl">search_off</span>
//       </div>
//       <p class="text-on-surface font-medium text-sm">Tidak ditemukan artikel yang sesuai</p>
//       <p class="text-on-surface-variant text-xs font-mono">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
//     `;
//     articlesContainer.appendChild(emptyState);
//   }
//
//   function filterArticles() {
//     let visibleCount = 0;
//     const totalCount = articles.length;
//
//     articles.forEach((art) => {
//       const categoryData = (art.getAttribute('data-category') || '').toLowerCase();
//       const contentText = art.innerText.toLowerCase();
//
//       const matchesCategory = (activeCategory === 'all') || categoryData.includes(activeCategory.toLowerCase());
//       const matchesSearch = !searchQuery || contentText.includes(searchQuery);
//
//       if (matchesCategory && matchesSearch) {
//         art.classList.remove('hidden');
//         visibleCount++;
//       } else {
//         art.classList.add('hidden');
//       }
//     });
//
//     // Update empty state
//     if (emptyState) {
//       if (visibleCount === 0) {
//         emptyState.classList.remove('hidden');
//       } else {
//         emptyState.classList.add('hidden');
//       }
//     }
//
//     // Update counter label if present
//     if (countLabel) {
//       countLabel.textContent = `Menampilkan ${visibleCount} dari ${totalCount} artikel`;
//     }
//   }
//
//   // Filter buttons listener
//   filterButtons.forEach((btn) => {
//     btn.addEventListener('click', () => {
//       activeCategory = btn.getAttribute('data-filter') || 'all';
//
//       // Update button styling
//       filterButtons.forEach((b) => {
//         b.classList.remove('bg-primary', 'text-on-primary');
//         b.classList.add('bg-surface-container', 'border', 'border-outline-variant', 'text-on-surface-variant');
//       });
//       btn.classList.add('bg-primary', 'text-on-primary');
//       btn.classList.remove('bg-surface-container', 'border-outline-variant', 'text-on-surface-variant');
//
//       filterArticles();
//     });
//   });
//
//   // Search input listener
//   if (searchInput) {
//     searchInput.addEventListener('input', (e) => {
//       searchQuery = e.target.value.toLowerCase().trim();
//       filterArticles();
//     });
//   }
// }

/**
 * Newsletter Form Handler
 */
// function initNewsletterForm() {
//   const form = document.querySelector('#feed form');
//   if (!form) return;
//
//   // Remove inline onsubmit if present
//   form.removeAttribute('onsubmit');
//
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const emailInput = form.querySelector('input[type="email"]');
//     if (!emailInput?.value) return;
//
//     showToast(`Terima kasih! Email ${emailInput.value} telah terdaftar untuk berlangganan pembaruan artikel.`, 'success');
//     form.reset();
//   });
// }

/**
 * Pagination Click Interactivity
 */
function initPagination() {
  const paginationButtons = document.querySelectorAll(".border-t .flex button");
  if (!paginationButtons.length) return;

  paginationButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.innerText.trim();
      if (text === "1") {
        // Page 1 is active
        paginationButtons.forEach((b) => {
          if (b.innerText.trim() === "1") {
            b.className =
              "w-8 h-8 rounded-full bg-primary text-on-primary font-medium flex items-center justify-center cursor-pointer";
          } else if (["2", "3"].includes(b.innerText.trim())) {
            b.className =
              "w-8 h-8 rounded-full bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-primary transition-colors flex items-center justify-center cursor-pointer";
          }
        });
      } else if (["2", "3"].includes(text)) {
        paginationButtons.forEach((b) => {
          if (b.innerText.trim() === text) {
            b.className =
              "w-8 h-8 rounded-full bg-primary text-on-primary font-medium flex items-center justify-center cursor-pointer";
          } else if (["1", "2", "3"].includes(b.innerText.trim())) {
            b.className =
              "w-8 h-8 rounded-full bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-primary transition-colors flex items-center justify-center cursor-pointer";
          }
        });
        showToast(`Beralih ke halaman ${text}`, "info");
      } else if (text.includes("Selanjutnya")) {
        showToast("Halaman selanjutnya segera hadir", "info");
      }
    });
  });
}

// article card
function articleCard(tanggal, waktuBaca, judul, deskripsi, slug, tag) {
  return `
        <article
          class="group bg-surface-container-low border border-outline-variant hover:border-primary transition-all duration-150 rounded-xl p-5 sm:p-6 flex flex-col justify-between"
          data-category="linux ansible cis"
        >
          <div class="space-y-3">
            <div
              class="flex items-center gap-2 text-xs text-on-surface-variant font-mono"
            >
              <span>${tanggal}</span>
              <span>•</span>
              <span>${waktuBaca}</span>
            </div>
            <h2
              class="text-base sm:text-headline-sm font-headline-sm text-on-surface group-hover:text-primary transition-colors leading-snug font-medium"
            >
              <a
                class="focus:outline-none"
                href="/articles/${slug}/"
                >${judul}</a
              >
            </h2>
            <p
              class="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed line-clamp-3"
            >
              ${deskripsi}
            </p>
          </div>
          <div
            class="mt-6 pt-4 border-t border-outline-variant flex flex-col text-xs text-on-surface-variant"
          >
            <div class="flex gap-2 font-mono">
              <span>${tag}</span>
            </div>
            <br>
            <a
              class="text-primary font-medium group-hover:underline inline-flex items-center gap-1"
              href="/articles/${slug}/"
             >
              <span>Baca selengkapnya</span>
              <span
                class="material-symbols-outlined text-primary text-sm group-hover:translate-x-1 transition-transform"
                >arrow_forward</span
              >
            </a>
          </div>
        </article>
  `;
}

// fetch all articles
fetch("/api/collections/articles/records")
  .then((response) => response.json())
  .then((data) => {
    const articles = data.items;
    const newestArticles = articles.sort((a, b) =>
      b.date.localeCompare(a.date),
    );
    const card_body = document.getElementById("articles-container");
    let articleCards = "";

    newestArticles.forEach((items) => {
      articleCards += articleCard(
        items.date.slice(0, 10),
        items.reading_time,
        items.title,
        items.summary,
        items.slug,
        items.tags,
      );
    });
    card_body.innerHTML = articleCards;
  })
  .catch((err) => console.log(err));
