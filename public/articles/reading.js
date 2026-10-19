/**
 * Adrian | SecLog - Reading Article Page Controller (reading.js)
 * Digunakan oleh template.html (halaman reading artikel dinamis via PocketBase)
 * Tailwind CSS + DaisyUI Standalone Implementation
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
  initAutoTOC();
  initClipboardCopy();
  initShareButton();
  initBookmarkButton();
  initReadingProgress();
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
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
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

  const icon = { success: 'check_circle', error: 'error', info: 'info' };

  const alert = document.createElement('div');
  alert.className = `alert ${colorMap[type] || colorMap.info} shadow-xl py-2.5 px-4 rounded-lg text-xs font-mono flex items-center gap-2.5 border transition-all duration-300 transform translate-y-[-10px] opacity-0 pointer-events-auto`;
  alert.innerHTML = `
    <span class="material-symbols-outlined text-sm shrink-0">${icon[type] || 'info'}</span>
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
// Auto Table of Contents Generator (from h2 inside #article-content)
// ─────────────────────────────────────────────────────────────────────────────
function initAutoTOC() {
  const content = document.getElementById('article-content');
  const tocContainer = document.getElementById('toc');
  if (!content || !tocContainer) return;

  const headings = content.querySelectorAll('h2');
  if (!headings.length) {
    const sidebar = document.getElementById('toc-sidebar');
    if (sidebar) sidebar.classList.add('hidden');
    return;
  }

  const nav = document.createElement('ul');
  nav.className = 'space-y-1 text-sm';

  const sections = [];

  headings.forEach((h, i) => {
    // Ensure each heading has an id
    if (!h.id) h.id = `section-${i}`;

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    a.className = 'block py-1 text-base-content/60 hover:text-primary transition-colors';
    a.addEventListener('click', (e) => {
      e.preventDefault();
      h.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    li.appendChild(a);
    nav.appendChild(li);
    sections.push({ el: h, link: a });
  });

  tocContainer.innerHTML = '<p class="text-xs font-mono text-base-content/40 uppercase tracking-widest mb-3">Daftar Isi</p>';
  tocContainer.appendChild(nav);

  // ScrollSpy
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sections.forEach(({ el, link }) => {
            if (el === entry.target) {
              link.className = 'block py-1 text-primary font-medium transition-colors';
            } else {
              link.className = 'block py-1 text-base-content/60 hover:text-primary transition-colors';
            }
          });
        }
      });
    },
    { root: null, rootMargin: '-20% 0px -70% 0px', threshold: 0 }
  );

  sections.forEach(({ el }) => observer.observe(el));
}

// ─────────────────────────────────────────────────────────────────────────────
// Clipboard Copy for Code Blocks
// ─────────────────────────────────────────────────────────────────────────────
function initClipboardCopy() {
  const content = document.getElementById('article-content');
  if (!content) return;

  content.querySelectorAll('pre').forEach((pre) => {
    // Wrap pre in a relative container
    const wrapper = document.createElement('div');
    wrapper.className = 'relative group';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity btn btn-xs btn-ghost font-mono gap-1';
    btn.innerHTML = '<span class="material-symbols-outlined text-[12px]">content_copy</span><span>Salin</span>';
    btn.addEventListener('click', () => {
      const code = pre.querySelector('code') || pre;
      navigator.clipboard.writeText(code.innerText.trim()).then(() => {
        btn.innerHTML = '<span class="material-symbols-outlined text-[12px]">check</span><span>Tersalin!</span>';
        showToast('Kode berhasil disalin', 'success');
        setTimeout(() => {
          btn.innerHTML = '<span class="material-symbols-outlined text-[12px]">content_copy</span><span>Salin</span>';
        }, 2000);
      }).catch(() => showToast('Gagal menyalin kode', 'error'));
    });
    wrapper.appendChild(btn);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Share Button
// ─────────────────────────────────────────────────────────────────────────────
function initShareButton() {
  const btn = document.querySelector('[data-share-btn]');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({ title: document.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('Tautan disalin ke papan klip', 'success');
      }).catch(() => showToast('Gagal menyalin tautan', 'error'));
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Bookmark Button (localStorage)
// ─────────────────────────────────────────────────────────────────────────────
function initBookmarkButton() {
  const btn = document.querySelector('[data-bookmark-btn]');
  if (!btn) return;

  const key = 'seclog_bookmark_' + window.location.pathname.split('/').filter(Boolean).pop();
  let saved = localStorage.getItem(key) === 'true';

  function render(state) {
    const icon = btn.querySelector('.material-symbols-outlined');
    const label = btn.querySelector('[data-bookmark-label]');
    if (icon) icon.textContent = state ? 'bookmark_added' : 'bookmark';
    if (label) label.textContent = state ? 'Tersimpan' : 'Simpan';
    if (state) {
      btn.classList.add('btn-primary');
    } else {
      btn.classList.remove('btn-primary');
    }
  }

  render(saved);
  btn.addEventListener('click', () => {
    saved = !saved;
    localStorage.setItem(key, saved ? 'true' : 'false');
    render(saved);
    showToast(saved ? 'Artikel disimpan ke bacaan lokal' : 'Artikel dihapus dari bacaan', saved ? 'success' : 'info');
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Reading Progress Bar
// ─────────────────────────────────────────────────────────────────────────────
function initReadingProgress() {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(100, progress)}%`;
  }, { passive: true });
}
