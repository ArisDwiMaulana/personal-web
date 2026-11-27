function tagOdd(item) {
  return `
          <span
            class="px-2.5 py-1 rounded text-xs sm:text-body-sm bg-secondary/10 text-secondary border border-secondary/30 font-mono"
          >
            ${item}
          </span>

  `;
}

function tagEven(item) {
  return `
          <span
            class="px-2.5 py-1 rounded text-xs sm:text-body-sm bg-surface-container text-on-surface-variant font-mono"
          >
            ${item}
          </span>

  `;
}

function article_header(tags, title, author, date, reading_time) {
  const tagsArray = tags ? tags.trim().split(/\s+/) : [];
  let tagsHtml = "";
  tagsArray.forEach((tag, index) => {
    tagsHtml += index % 2 == 0 ? tagOdd(tag) : tagEven(tag);
  });
  return `
      <!-- 2. Article Meta Header Section -->
      <header
        class="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-outline-variant/40"
      >
        <div class="flex flex-wrap items-center gap-2 mb-4">
          ${tagsHtml}
        </div>
        <h1
          class="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-on-surface mb-6 tracking-tight leading-tight md:text-[36px] font-semibold"
        >
          ${title}
        </h1>
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-outline-variant/30"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-surface-container-high border border-outline flex items-center justify-center text-primary font-medium text-body-md font-mono shrink-0"
            >
              ADM
            </div>
            <div>
              <div class="font-medium text-on-surface text-sm sm:text-body-md">
                ${author}
              </div>
              <div
                class="text-xs sm:text-body-sm text-outline flex items-center gap-1.5 font-mono"
              >
                <span>${date}</span>
                <span>·</span>
                <span>${reading_time}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container hover:bg-surface-container-high border border-outline-variant text-on-surface-variant hover:text-on-surface text-xs sm:text-body-sm transition-colors cursor-pointer"
              title="Bagikan Artikel"
            >
              <span class="material-symbols-outlined text-[16px]">share</span>
              <span>Bagikan</span>
            </button>
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container hover:bg-surface-container-high border border-outline-variant text-on-surface-variant hover:text-on-surface text-xs sm:text-body-sm transition-colors cursor-pointer"
              title="Simpan Artikel"
            >
              <span class="material-symbols-outlined text-[16px]"
                >bookmark</span
              >
              <span>Simpan</span>
            </button>
          </div>
        </div>
      </header>
  `;
}

module.exports = article_header;
