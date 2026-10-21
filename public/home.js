/**
 * Adrian | SecLog - Home Page Controller (home.js)
 * Standalone JavaScript for Halaman Utama (index.html)
 * Tailwind CSS + DaisyUI Standalone Implementation
 */

// Immediate Theme Initialization (prevents FOUC on page load)
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
  initContactForm();
  initSmoothScroll();
});

/**
 * DaisyUI Theme Controller & Storage Sync
 */
function initThemeController() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const controllers = document.querySelectorAll('.theme-controller');

  // Sync initial state of checkbox toggles
  controllers.forEach((toggle) => {
    if (toggle.value === 'light') {
      toggle.checked = (savedTheme === 'light');
    } else if (toggle.value === 'dark') {
      toggle.checked = (savedTheme === 'dark');
    }
  });

  // Global change listener for theme-controller checkbox
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

  // Sync all theme-controller toggles on page
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
    ? 'bg-primary text-on-primary border-primary'
    : type === 'error'
      ? 'bg-error text-on-error border-error'
      : 'bg-surface-container-high text-on-surface border-outline-variant';

  alert.className = `alert ${alertColor} shadow-xl py-2.5 px-4 rounded-lg text-xs font-mono flex items-center gap-2.5 border transition-all duration-300 transform translate-y-[-10px] opacity-0 pointer-events-auto`;
  alert.innerHTML = `
    <span class="material-symbols-outlined text-sm shrink-0">${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}</span>
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
 * Contact Form Handler
 */
function initContactForm() {
  const form = document.querySelector('form[data-contact-form]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = form.querySelector('#caller_name');
    const emailInput = form.querySelector('#caller_email');
    const messageInput = form.querySelector('#transmission_body');

    if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
      showToast('Harap lengkapi semua kolom yang tersedia.', 'error');
      return;
    }

    const senderName = nameInput.value.trim();
    showToast(`Terima kasih, ${senderName}! Pesan Anda telah terkirim.`, 'success');
    form.reset();
  });
}

/**
 * Smooth Anchor Scrolling for Header Navigation
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
