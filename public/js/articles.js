/**
 * Adrian | SecLog - Articles Page Controller (articles.js)
 */

// State terpusat untuk menangani pencarian, filter, dan pagination
const state = {
  page: 1,
  perPage: 12, // Mengatur 6 artikel per halaman sesuai UI
  category: "semua",
  q: "",
};

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
  renderDropDownItems();
  fetchArticles(); // Memanggil data artikel utama
  initSearch();
  initFilterDropdown();
});

function initThemeController() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const controllers = document.querySelectorAll(".theme-controller");

  controllers.forEach((toggle) => {
    if (toggle.value === "light") {
      toggle.checked = savedTheme === "light";
    } else if (toggle.value === "dark") {
      toggle.checked = savedTheme === "dark";
    }
  });

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

  document.querySelectorAll(".theme-controller").forEach((toggle) => {
    if (toggle.value === "light") {
      toggle.checked = theme === "light";
    } else if (toggle.value === "dark") {
      toggle.checked = theme === "dark";
    }
  });
}

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

  requestAnimationFrame(() => {
    alert.classList.remove("translate-y-[-10px]", "opacity-0");
  });

  setTimeout(() => {
    alert.classList.add("opacity-0", "translate-y-[-10px]");
    setTimeout(() => alert.remove(), 300);
  }, 2500);
}

/**
 * Fetch Data Terpusat dari PocketBase
 */
function fetchArticles() {
  let filters = [];

  if (state.category && state.category !== "semua") {
    filters.push(`tags ~ "${state.category}"`);
  }

  if (state.q) {
    filters.push(
      `(title ~ "${state.q}" || summary ~ "${state.q}" || tags ~ "${state.q}")`,
    );
  }

  let queryParams = `page=${state.page}&perPage=${state.perPage}&sort=-date`;
  if (filters.length > 0) {
    queryParams += `&filter=${encodeURIComponent(filters.join(" && "))}`;
  }

  fetch(`/api/collections/articles/records?${queryParams}`)
    .then((response) => response.json())
    .then((data) => {
      renderCards(data.items);
      renderPagination(data);
    })
    .catch((err) => console.error("Gagal mengambil data artikel:", err));
}

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

function renderCards(items) {
  const card_body = document.getElementById("articles-container");
  if (!items || items.length === 0) {
    card_body.innerHTML = `<p class="col-span-full text-center text-on-surface-variant font-mono py-12">Tidak ada artikel yang ditemukan.</p>`;
    return;
  }

  let articleCards = "";
  items.forEach((item) => {
    articleCards += articleCard(
      item.date.slice(0, 10),
      item.reading_time,
      item.title,
      item.summary,
      item.slug,
      item.tags,
    );
  });
  card_body.innerHTML = articleCards;
}

function renderDropDownItems() {
  const selectTag = document.getElementById("filter-input");
  if (!selectTag) {
    return;
  }

  fetch("/api/collections/articles/records?fields=tags")
    .then((res) => res.json())
    .then((data) => {
      // 1. Ambil semua tag dari artikel dan gabungkan
      const allTags = data.items
        .flatMap((item) => (item.tags ? item.tags.trim().split(/\s+/) : []))
        .filter((tag) => tag.length > 0);

      // 2. Ambil hanya tag yang unik (hapus duplikat)
      const uniqueTags = [...new Set(allTags)].sort();

      // 3. Masukkan ke dalam dropdown
      let optionsHtml = `<option selected value="semua">Semua</option>`;
      uniqueTags.forEach((tag) => {
        optionsHtml += `<option value="${tag}">${tag}</option>`;
      });

      selectTag.innerHTML = optionsHtml;
    })
    .catch((err) => console.error("Gagal memuat tag:", err));
}

/**
 * Logika Render Pagination Dinamis
 */
function renderPagination(data) {
  const paginationContainer = document.getElementById("pagination-container");
  const paginationInfo = document.querySelector(
    ".border-t span.text-on-surface-variant",
  );
  if (!paginationContainer) return;

  const { page, totalPages, totalItems, perPage } = data;

  // Update statistik teks "Menampilkan X - Y dari Z artikel"
  if (paginationInfo) {
    const startItem = totalItems > 0 ? (page - 1) * perPage + 1 : 0;
    const endItem = Math.min(page * perPage, totalItems);
    paginationInfo.textContent = `Menampilkan ${startItem} - ${endItem} dari ${totalItems} artikel`;
  }

  if (totalPages <= 1) {
    paginationContainer.innerHTML = "";
    return;
  }

  let buttonsHtml = "";

  // Tombol Sebelumnya
  if (page > 1) {
    buttonsHtml += `
      <button data-page="${page - 1}" class="px-3 h-8 rounded-full bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-primary transition-colors flex items-center gap-1 cursor-pointer">
        <span class="material-symbols-outlined text-xs">arrow_back</span>
        <span>Sebelumnya</span>
      </button>
    `;
  }

  // Tombol Angka Halaman
  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === page;
    const activeClass = isActive
      ? "bg-primary text-on-primary font-medium"
      : "bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-primary transition-colors";

    buttonsHtml += `
      <button data-page="${i}" class="w-8 h-8 rounded-full ${activeClass} flex items-center justify-center cursor-pointer">
        ${i}
      </button>
    `;
  }

  // Tombol Selanjutnya
  if (page < totalPages) {
    buttonsHtml += `
      <button data-page="${page + 1}" class="px-3 h-8 rounded-full bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-primary transition-colors flex items-center gap-1 cursor-pointer">
        <span>Selanjutnya</span>
        <span class="material-symbols-outlined text-xs">arrow_forward</span>
      </button>
    `;
  }

  paginationContainer.innerHTML = buttonsHtml;

  // Listener Klik Tombol Pagination
  paginationContainer.querySelectorAll("button[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetPage = parseInt(btn.getAttribute("data-page"));
      if (targetPage && targetPage !== state.page) {
        state.page = targetPage;
        fetchArticles();
        showToast(`Beralih ke halaman ${targetPage}`, "info");
        document
          .getElementById("articles-container")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/**
 * Filter & Event Listeners
 */
function debounce(fn, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function initSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  searchInput.addEventListener(
    "input",
    debounce((e) => {
      state.q = e.target.value.trim();
      state.page = 1; // Reset ke halaman pertama saat melakukan pencarian baru
      fetchArticles();
    }, 300),
  );
}

function initFilterDropdown() {
  const selectTag = document.getElementById("filter-input");
  if (!selectTag) return;

  selectTag.addEventListener("change", (e) => {
    state.category = e.target.value;
    state.page = 1; // Reset ke halaman pertama saat ganti kategori
    fetchArticles();
  });
}
