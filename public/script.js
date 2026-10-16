/**
 * Adrian | SecLog - Interactive Utilities
 * Tailwind CSS + DaisyUI Standalone Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  initClipboardCopy();
  initArticleFilters();
  initArticleSearch();
  initContactForm();
  initShareButtons();
  initTerminalButton();
});

/**
 * Toast Notification Helper (DaisyUI compatible)
 */
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('seclog-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'seclog-toast-container';
    toastContainer.className = 'toast toast-top toast-end z-50 fixed top-4 right-4 flex flex-col gap-2';
    document.body.appendChild(toastContainer);
  }

  const alert = document.createElement('div');
  const alertColor = type === 'success' ? 'bg-primary text-on-primary-fixed' : 'bg-surface-container-high text-on-surface';
  alert.className = `alert ${alertColor} shadow-lg py-2 px-4 rounded text-xs font-mono flex items-center gap-2 border border-outline-variant transition-all duration-300 transform translate-y-[-10px] opacity-0`;
  alert.innerHTML = `
    <span class="material-symbols-outlined text-sm">${type === 'success' ? 'check_circle' : 'info'}</span>
    <span>${message}</span>
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
  const copyButtons = document.querySelectorAll('button:has(.material-symbols-outlined:contains("content_copy")), button');

  document.querySelectorAll('button').forEach((btn) => {
    const text = btn.innerText.trim();
    if (text.includes('Salin') || text.includes('Copy')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const container = btn.closest('.rounded');
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
  const articles = document.querySelectorAll('article');

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
    const msgInput = form.querySelector('#transmission_body');

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
