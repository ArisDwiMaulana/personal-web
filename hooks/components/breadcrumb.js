function breadcrumb(title) {
  return `
  <!-- 1. URL Path Indicator & Breadcrumb Simulation -->
      <nav
        class="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 text-xs sm:text-body-sm text-outline"
      >
        <a class="hover:text-primary transition-colors" href="../../"
          >Home</a
        >
        <span class="text-outline-variant">/</span>
        <a class="hover:text-primary transition-colors" href="../">Articles</a>
        <span class="text-outline-variant">/</span>
        <span class="text-on-surface-variant font-medium"
          >${title}</span
        >
      </nav>

  `;
}

module.exports = breadcrumb;
