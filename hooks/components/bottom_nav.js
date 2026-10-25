function linkPrev(prev) {
  return `
          <a
            class="p-4 sm:p-5 rounded bg-surface-container border border-outline-variant/40 hover:border-primary/50 transition-colors group flex flex-col justify-between"
            href="/articles/${prev.slug}/"
          >
            <span class="text-xs text-outline mb-1 font-mono"
              >← Artikel Sebelumnya</span
            >
            <span
              class="text-sm sm:text-body-md font-medium text-on-surface group-hover:text-primary transition-colors"
            >
              ${prev.title}
            </span>
          </a>

  `;
}

function linkNext(next) {
  return `
          <a
            class="p-4 sm:p-5 rounded bg-surface-container border border-outline-variant/40 hover:border-primary/50 transition-colors group flex flex-col justify-between md:text-right"
            href="/articles/${next.slug}/"
          >
            <span class="text-xs text-outline mb-1 font-mono"
              >Artikel Selanjutnya →</span
            >
            <span
              class="text-sm sm:text-body-md font-medium text-on-surface group-hover:text-primary transition-colors"
            >
              ${next.title}
            </span>
          </a>
  `;
}

function bottom_nav(prevArticle, nextArticle) {
  let anchorPrev = ``;
  let anchorNext = ``;
  if (prevArticle != null && nextArticle != null) {
    anchorNext = linkNext(nextArticle);
    anchorPrev = linkPrev(prevArticle);
  } else if (prevArticle != null) {
    anchorPrev = linkPrev(prevArticle);
    anchorNext = "<div></div>";
  } else if (nextArticle != null) {
    anchorNext = linkNext(nextArticle);
    anchorPrev = "<div></div>";
  }
  return `
    <!-- 4. Bottom Navigation & Discussion Section -->
      <div
        class="mt-12 sm:mt-16 pt-8 border-t border-outline-variant/40 space-y-8"
      >
        <!-- Navigasi Artikel -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${anchorPrev}
          ${anchorNext}
        </div>

        <!-- Diskusi & Feedback -->
        <div
          class="p-5 sm:p-6 rounded bg-surface-container border border-outline-variant/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6"
        >
          <div class="space-y-1">
            <h3
              class="text-base sm:text-headline-sm font-medium text-on-surface"
            >
              Diskusi &amp; Tanggapan
            </h3>
            <p class="text-xs sm:text-body-sm text-on-surface-variant max-w-xl">
              Punya pertanyaan seputar panduan konfigurasi ini atau ingin
              berbagi pengalaman? Berikan tanggapan Anda.
            </p>
          </div>
          <div class="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              class="px-4 py-2 rounded bg-surface-container-high border border-outline-variant text-xs sm:text-body-sm text-on-surface hover:text-primary hover:border-primary transition-colors w-full sm:w-auto text-center"
              href="../../#contact"
            >
              Tulis Komentar
            </a>
          </div>
        </div>
      </div>

  `;
}

module.exports = bottom_nav;
