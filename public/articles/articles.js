/**
 * Adrian | SecLog - Articles Page Controller (articles.js)
 * Standalone JavaScript for Halaman Artikel (articles/index.html)
 * Data dimuat secara dinamis dari PocketBase REST API
 */

// ─────────────────────────────────────────────────────────────────────────────
// Immediate Theme Initialization (prevents FOUC)
// ─────────────────────────────────────────────────────────────────────────────
(function initThemeEarly() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  initThemeController();
  loadArticlesFromPocketBase();
  initNewsletterForm();
});

// ─────────────────────────────────────────────────────────────────────────────
// Theme Controller
// ─────────────────────────────────────────────────────────────────────────────
function initThemeController() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.querySelectorAll('.theme-controller').forEach((toggle) => {
    if (toggle.value === 'light') toggle.checked = (savedTheme === 'light');
    else if (toggle.value === 'dark') toggle.checked = (savedTheme === 'dark');
  });

  document.addEventListener('change', (e) => {
    if (e.target && e.target.matches('.theme-controller')) {
      let newTheme = 'dark';
      if (e.target.value === 'light') {
        newTheme = e.target.checked ? 'light' : 'dark';
      } else {
        newTheme = e.target.checked ? e.target.value : 'dark';
      }
      applyTheme(newTheme);
      showToast(newTheme === 'light' ? 'Mode terang diaktifkan' : 'Mode gelap diaktifkan', 'info');
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
  localStorage.setItem('theme', theme);
  document.querySelectorAll('.theme-controller').forEach((toggle) => {
    if (toggle.value === 'light') toggle.checked = (theme === 'light');
    else if (toggle.value === 'dark') toggle.checked = (theme === 'dark');
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Toast Notification
// ─────────────────────────────────────────────────────────────────────────────
function showToast(message, type = 'success') {
  let container = document.getElementById('seclog-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'seclog-toast-container';
    container.className = 'toast toast-top toast-end z-50 fixed top-4 right-4 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(container);
  }

  const colorMap = {
    success: 'bg-primary text-primary-content border-primary',
    error: 'bg-error text-error-content border-error',
    info: 'bg-base-300 text-base-content border-base-content/20',
  };
  const iconMap = { success: 'check_circle', error: 'error', info: 'info' };

  const alert = document.createElement('div');
  alert.className = `alert ${colorMap[type] || colorMap.info} shadow-xl py-2.5 px-4 rounded-lg text-xs font-mono flex items-center gap-2.5 border transition-all duration-300 transform translate-y-[-10px] opacity-0 pointer-events-auto`;
  alert.innerHTML = `
    <span class="material-symbols-outlined text-sm shrink-0">${iconMap[type] || 'info'}</span>
    <span class="font-medium">${message}</span>
  `;
  container.appendChild(alert);
  requestAnimationFrame(() => alert.classList.remove('translate-y-[-10px]', 'opacity-0'));
  setTimeout(() => {
    alert.classList.add('opacity-0', 'translate-y-[-10px]');
    setTimeout(() => alert.remove(), 300);
  }, 2500);
}

// ─────────────────────────────────────────────────────────────────────────────
// Category badge colour helper
// ─────────────────────────────────────────────────────────────────────────────
function categoryBadgeClass(cat) {
  const map = {
    linux: 'bg-secondary/10 text-secondary border-secondary/30',
    cybersecurity: 'bg-error/10 text-error border-error/30',
    networking: 'bg-primary/10 text-primary border-primary/30',
  };
  return map[cat] || 'bg-surface-container text-on-surface-variant border-outline-variant';
}

function categoryLabel(cat) {
  const map = {
    linux: 'Linux',
    cybersecurity: 'Cybersecurity',
    networking: 'Lab & Jaringan',
  };
  return map[cat] || cat;
}

// ─────────────────────────────────────────────────────────────────────────────
// Build one article card element
// ─────────────────────────────────────────────────────────────────────────────
function buildArticleCard(item) {
  const date = item.created
    ? new Date(item.created).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  const tags = (item.tags || '')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)
    .slice(0, 3)
    .map(t => `<span class="text-primary font-medium">#${t}</span>`)
    .join('');

  const article = document.createElement('article');
  article.className = 'group bg-surface-container-low border border-outline-variant hover:border-primary transition-all duration-150 rounded-xl p-5 sm:p-6 flex flex-col justify-between';
  article.setAttribute('data-category', item.category || '');
  article.setAttribute('data-tags', item.tags || '');
  article.setAttribute('data-title', (item.title || '').toLowerCase());
  article.setAttribute('data-summary', (item.summary || '').toLowerCase());

  article.innerHTML = `
    <div class="space-y-3">
      <div class="flex items-center gap-2 text-xs text-on-surface-variant font-mono">
        <span>${date}</span>
        ${item.reading_time ? `<span>•</span><span>${item.reading_time}</span>` : ''}
      </div>
      <h2 class="text-base sm:text-headline-sm font-headline-sm text-on-surface group-hover:text-primary transition-colors leading-snug font-medium">
        <a class="focus:outline-none" href="/articles/${item.slug}">${item.title}</a>
      </h2>
      ${item.summary ? `<p class="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed line-clamp-3">${item.summary}</p>` : ''}
    </div>
    <div class="mt-6 pt-4 border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant">
      <div class="flex gap-2 font-mono flex-wrap">${tags}</div>
      ${item.category ? `<span class="px-2 py-0.5 rounded border text-xs font-mono capitalize ${categoryBadgeClass(item.category)}">${categoryLabel(item.category)}</span>` : ''}
    </div>
  `;
  return article;
}

// ─────────────────────────────────────────────────────────────────────────────
// Load articles from PocketBase and wire up filter + search
// ─────────────────────────────────────────────────────────────────────────────
async function loadArticlesFromPocketBase() {
  const container = document.getElementById('articles-container');
  if (!container) return;

  // Show skeleton loader
  container.innerHTML = `
    <div class="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-16">
      <span class="loading loading-spinner loading-md text-primary"></span>
    </div>
  `;

  let allItems = [];

  try {
    const res = await fetch('/api/collections/articles/records?filter=(status%3D"published")&sort=-created&perPage=50');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    allItems = data.items || [];
  } catch (err) {
    console.error('[articles.js] Failed to load articles:', err);
    container.innerHTML = `
      <div class="col-span-1 md:col-span-2 lg:col-span-3 p-8 rounded-xl bg-surface-container border border-outline-variant text-center space-y-3">
        <span class="material-symbols-outlined text-3xl text-outline">cloud_off</span>
        <p class="text-on-surface font-medium text-sm">Gagal memuat artikel</p>
        <p class="text-on-surface-variant text-xs font-mono">Pastikan server PocketBase berjalan di port 8090.</p>
      </div>
    `;
    return;
  }

  // Empty state element (appended once)
  const emptyState = document.createElement('div');
  emptyState.id = 'articles-empty-state';
  emptyState.className = 'col-span-1 md:col-span-2 lg:col-span-3 p-8 rounded-xl bg-surface-container border border-outline-variant text-center space-y-3 hidden';
  emptyState.innerHTML = `
    <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-high text-outline">
      <span class="material-symbols-outlined text-2xl">search_off</span>
    </div>
    <p class="text-on-surface font-medium text-sm">Tidak ditemukan artikel yang sesuai</p>
    <p class="text-on-surface-variant text-xs font-mono">Coba ubah kata kunci atau pilih kategori lain.</p>
  `;

  // Counter label
  const countLabel = document.querySelector('.border-t span.font-mono');

  // Render & filter logic
  let activeCategory = 'all';
  let searchQuery = '';

  function render() {
    // Remove old cards (keep emptyState if already appended)
    container.querySelectorAll('article').forEach(el => el.remove());
    const emptyEl = container.querySelector('#articles-empty-state');
    if (emptyEl) emptyEl.remove();

    const filtered = allItems.filter(item => {
      const matchCat = activeCategory === 'all' || (item.category || '') === activeCategory;
      const searchIn = `${item.title} ${item.summary} ${item.tags}`.toLowerCase();
      const matchSearch = !searchQuery || searchIn.includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (!filtered.length) {
      container.appendChild(emptyState);
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
      filtered.forEach(item => container.appendChild(buildArticleCard(item)));
    }

    if (countLabel) {
      countLabel.textContent = `Menampilkan ${filtered.length} dari ${allItems.length} artikel`;
    }
  }

  render();

  // Filter buttons
  const filterButtons = document.querySelectorAll('button[data-filter]');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-filter') || 'all';
      filterButtons.forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary');
        b.classList.add('bg-surface-container', 'border', 'border-outline-variant', 'text-on-surface-variant');
      });
      btn.classList.add('bg-primary', 'text-on-primary');
      btn.classList.remove('bg-surface-container', 'border-outline-variant', 'text-on-surface-variant');
      render();
    });
  });

  // Search input
  const searchInput = document.querySelector('input[data-article-search]');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      render();
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Newsletter Form
// ─────────────────────────────────────────────────────────────────────────────
function initNewsletterForm() {
  const form = document.querySelector('#feed form');
  if (!form) return;
  form.removeAttribute('onsubmit');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    if (!emailInput?.value) return;
    showToast(`Terima kasih! Email ${emailInput.value} telah terdaftar.`, 'success');
    form.reset();
  });
}
