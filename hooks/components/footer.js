function footer() {
  return `
<!-- Footer (Shared Component) -->
    <footer
      class="w-full bg-surface-container-lowest border-t border-outline-variant mt-12 sm:mt-16 transition-colors duration-200"
    >
      <div
        class="flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-6 py-6 max-w-7xl mx-auto gap-4 text-xs sm:text-body-sm text-on-surface-variant font-mono text-center sm:text-left"
      >
        <div>© 2025 Aris Dwi M. Dibuat dengan cermat untuk berbagi pengetahuan.</div>
        <div class="flex items-center gap-4 sm:gap-6">
          <a
            class="hover:text-primary transition-colors"
            href="https://github.com"
            rel="noreferrer"
            target="_blank"
            >GitHub</a
          >
          <a
            class="hover:text-primary transition-colors"
            href="https://linkedin.com"
            rel="noreferrer"
            target="_blank"
            >LinkedIn</a
          >
          <a class="hover:text-primary transition-colors" href="#contact"
            >Kontak</a
          >
        </div>
      </div>
    </footer>
  `;
}

module.exports = footer;
