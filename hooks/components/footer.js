function footer() {
  return `
<!-- ================= FOOTER (Shared Component) ================= -->
    <footer
      class="bg-surface-container-lowest border-t border-outline-variant mt-12 sm:mt-16 transition-colors duration-200"
    >
      <div
        class="flex flex-col md:flex-row justify-between items-center w-full px-4 sm:px-6 py-6 max-w-7xl mx-auto gap-4 text-xs font-mono text-center md:text-left"
      >
        <!-- Copyright / PGP verification status -->
        <div class="text-on-surface-variant">
          © 2025 Aris Dwi M. // PGP: 4A7F 92B1 C08D E351 // All logs verified.
        </div>

        <!-- Navigation links -->
        <div
          class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-on-surface-variant"
        >
          <a
            class="hover:text-primary transition-colors duration-150"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            >GitHub</a
          >
          <a
            class="hover:text-primary transition-colors duration-150"
            href="https://tryhackme.com"
            target="_blank"
            rel="noreferrer"
            >TryHackMe</a
          >
          <a
            class="hover:text-primary transition-colors duration-150"
            href="https://hackthebox.com"
            target="_blank"
            rel="noreferrer"
            >HackTheBox</a
          >
          <a
            class="hover:text-primary transition-colors duration-150"
            href="../#feed"
            >PGP Key</a
          >
        </div>
      </div>
    </footer>
  `;
}

module.exports = footer;
