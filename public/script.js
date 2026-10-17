/**
 * Adrian | SecLog - Interactive Utilities
 * Tailwind CSS + DaisyUI Standalone Implementation
 */

// Immediate Theme Initialization (runs as early as possible)
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
  initClipboardCopy();
  initArticleFilters();
  initArticleSearch();
  initContactForm();
  initShareButtons();
  initTerminalButton();
});

/**
 * DaisyUI Theme Controller & Storage Sync
 */
function initThemeController() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const controllers = document.querySelectorAll('.theme-controller');

  // Sync all theme-controller toggles with active theme
  controllers.forEach((toggle) => {
    // If the checkbox has value="light", it is checked when light mode is active
    if (toggle.value === 'light') {
      toggle.checked = (savedTheme === 'light');
    } else if (toggle.value === 'dark') {
      toggle.checked = (savedTheme === 'dark');
    }
  });

  // Global change listener for any theme-controller checkbox
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
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);

  // Sync all checkboxes on page
  document.querySelectorAll('.theme-controller').forEach((toggle) => {
    if (toggle.value === 'light') {
      toggle.checked = (theme === 'light');
    } else if (toggle.value === 'dark') {
      toggle.checked = (theme === 'dark');
    }
  });
}

/**
 * Toast Notification Helper (DaisyUI compatible)
 */
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('seclog-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'seclog-toast-container';
    toastContainer.className = 'toast toast-top toast-end z-50 fixed top-4 right-4 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const alert = document.createElement('div');
  const alertColor = type === 'success' 
    ? 'bg-primary text-on-primary-fixed border-primary' 
    : 'bg-surface-container-high text-on-surface border-outline-variant';
  alert.className = `alert ${alertColor} shadow-xl py-2.5 px-4 rounded-lg text-xs font-mono flex items-center gap-2.5 border transition-all duration-300 transform translate-y-[-10px] opacity-0 pointer-events-auto`;
  alert.innerHTML = `
    <span class="material-symbols-outlined text-sm shrink-0">${type === 'success' ? 'check_circle' : 'info'}</span>
    <span class="font-medium">${message}</span>
  `;

  toastContainer.appendChild(alert);

  // Animate in
  requestAnimationFrame(() => {
    alert.classList.remove('translate-y-[-10px]', 'opacity-0');
  });

  // Remove after 2.5s
  setTimeout(() => {
    alert.classList.add('opacity-0', 'translate-y-[-10px]');
    setTimeout(() => alert.remove(), 300);
  }, 2500);
}

/**
 * Code Copy Button Handler
 */
function initClipboardCopy() {
  document.querySelectorAll('button').forEach((btn) => {
    const text = btn.innerText.trim();
    if (text.includes('Salin') || text.includes('Copy')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const container = btn.closest('.rounded, .overflow-hidden, article, section');
        let codeText = '';

        if (container) {
          const codeEl = container.querySelector('code, pre');
          if (codeEl) {
            codeText = codeEl.innerText.replace(/^\$\s*/gm, ''); // remove leading prompt if bash
          }
        }

        if (!codeText) {
          codeText = btn.getAttribute('data-copy-target') || '';
        }

        if (codeText) {
          navigator.clipboard.writeText(codeText.trim()).then(() => {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `<span class="material-symbols-outlined text-[14px]">check</span><span>Tersalin!</span>`;
            showToast('Kode berhasil disalin ke papan klip');
            setTimeout(() => {
              btn.innerHTML = originalHTML;
            }, 2000);
          }).catch(() => {
            showToast('Gagal menyalin kode', 'error');
          });
        }
      });
    }
  });
}

/**
 * Article Filtering by Category Tag
 */
function initArticleFilters() {
  const filterButtons = document.querySelectorAll('button[data-filter]');
  const articles = document.querySelectorAll('article[data-category]');

  if (!filterButtons.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-filter');

      // Update button styles
      filterButtons.forEach((b) => {
        b.classList.remove('bg-primary', 'text-on-primary');
        b.classList.add('bg-surface-container', 'border', 'border-outline-variant', 'text-on-surface-variant');
      });
      btn.classList.add('bg-primary', 'text-on-primary');
      btn.classList.remove('bg-surface-container', 'border-outline-variant', 'text-on-surface-variant');

      // Filter articles
      articles.forEach((art) => {
        const cat = art.getAttribute('data-category') || '';
        if (targetCategory === 'all' || cat.toLowerCase().includes(targetCategory.toLowerCase())) {
          art.classList.remove('hidden');
        } else {
          art.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * Real-time Article Search
 */
function initArticleSearch() {
  const searchInput = document.querySelector('input[data-article-search]');
  const articles = document.querySelectorAll('#articles-container article, article[data-category]');

  if (!searchInput || !articles.length) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    articles.forEach((art) => {
      const text = art.innerText.toLowerCase();
      if (!query || text.includes(query)) {
        art.classList.remove('hidden');
      } else {
        art.classList.add('hidden');
      }
    });
  });
}

/**
 * Contact Form Handler
 */
function initContactForm() {
  const form = document.querySelector('form[data-contact-form]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = form.querySelector('#caller_name');
    const emailInput = form.querySelector('#caller_email');

    if (!nameInput?.value || !emailInput?.value) return;

    showToast(`Terima kasih, ${nameInput.value}! Pesan Anda telah terkirim.`);
    form.reset();
  });
}

/**
 * Share & Bookmark Buttons
 */
function initShareButtons() {
  document.querySelectorAll('button[title*="Bagikan"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          url: window.location.href,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('Tautan artikel disalin ke papan klip');
      }
    });
  });

  document.querySelectorAll('button[title*="Simpan"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      showToast('Artikel disimpan ke daftar bacaan lokal');
    });
  });
}

/**
 * Terminal Emulator Action
 */
function initTerminalButton() {
  const termBtn = document.querySelector('button[title*="Terminal"]');
  if (!termBtn) return;

  termBtn.addEventListener('click', () => {
    showToast('Terminal session: root@adrian:~# connected (PTY ready)', 'info');
  });
}
