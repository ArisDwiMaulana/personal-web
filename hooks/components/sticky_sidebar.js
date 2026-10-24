function sticky_sidebar(items) {
  let anchor = ``;
  items.forEach((element, index) => {
    anchor += `
      <a
        class="block py-1 text-on-surface-variant hover:text-primary transition-colors"
        href="#${element.targetId}">
        ${index + 1}. ${element.text}
      </a>
 
    `;
  });
  return `
<!-- Right Column: Sticky Sidebar (Spans 4 columns) -->
        <aside class="lg:col-span-4 space-y-6 w-full lg:sticky lg:top-20">
          <!-- Daftar Isi -->
          <div
            class="p-5 rounded bg-surface-container border border-outline-variant/40"
          >
            <h3
              class="font-medium text-xs sm:text-body-sm text-on-surface uppercase tracking-wider mb-3 pb-2 border-b border-outline-variant/30 font-mono"
            >
              Daftar Isi
            </h3>
            <nav class="space-y-1.5 text-xs sm:text-body-sm">
              ${anchor}
            </nav>
          </div>

          <!-- Topik Terkait -->
          <div
            class="p-5 rounded bg-surface-container border border-outline-variant/40 space-y-3"
          >
            <h3
              class="font-medium text-xs sm:text-body-sm text-on-surface uppercase tracking-wider pb-2 border-b border-outline-variant/30 font-mono"
            >
              Artikel Terkait
            </h3>
            <a class="block group py-1.5" href="../">
              <div
                class="text-xs sm:text-body-sm text-on-surface group-hover:text-primary transition-colors font-medium mb-1"
              >
                Practical Zero-Trust Architecture in Microk8s Clusters
              </div>
              <div class="text-xs text-outline font-mono">
                12 Sep 2025 · 6 min read
              </div>
            </a>
            <div class="border-t border-outline-variant/20"></div>
            <a class="block group py-1.5" href="../">
              <div
                class="text-xs sm:text-body-sm text-on-surface group-hover:text-primary transition-colors font-medium mb-1"
              >
                Automated TLS Rotation with ACME &amp; Systemd
              </div>
              <div class="text-xs text-outline font-mono">
                03 Agu 2025 · 5 min read
              </div>
            </a>
          </div>
        </aside>
  `;
}

module.exports = sticky_sidebar;
