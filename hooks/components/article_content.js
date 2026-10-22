function article_content(content) {
  return `
  <div class="lg:col-span-8 w-full max-w-full space-y-6 sm:space-y-8 font-body-lg 
      text-sm sm:text-body-lg text-on-surface-variant leading-relaxed">
    <article
      class="prose prose-invert prose-headings:text-on-surface 
      prose-code:text-secondary prose-code:bg-surface-container 
      prose-pre:bg-surface-container-low">
      ${content}
    <article/>
  </div>
`;
}

module.exports = article_content;
