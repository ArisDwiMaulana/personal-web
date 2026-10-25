/// <reference path="../data/types.d.ts" />

/* HTML COMPONENTS */

/* DINAMIC ROUTING */
routerAdd("GET", "/articles/{slug}/", (e) => {
  const slug = e.request.pathValue("slug");
  const header = require(`${__hooks}/components/header.js`);
  const breadcrumb = require(`${__hooks}/components/breadcrumb.js`);
  const article_header = require(`${__hooks}/components/article_header.js`);
  const article_content = require(`${__hooks}/components/article_content.js`);
  const sticky_sidebar = require(`${__hooks}/components/sticky_sidebar.js`);
  const bottom_nav = require(`${__hooks}/components/bottom_nav.js`);
  const footer = require(`${__hooks}/components/footer.js`);
  const parseH2AndSidebar = require(`${__hooks}/utils/parser.js`);
  const getNextPrevArticle = require(`${__hooks}/utils/getNextPrevArticle.js`);
  const getRelatedArticles = require(`${__hooks}/utils/getRelatedArticles.js`);

  try {
    // Cari artikel berdasarkan slug & status published
    const article = $app.findFirstRecordByFilter("articles", "slug = {:slug}", {
      slug: slug,
    });
    const title = article.get("title");
    const author = article.get("author");
    const reading_time = article.get("reading_time");
    const tags = article.get("tags");
    const date = article.get("date");
    const content = article.get("content");
    const { cleanHtml, sidebarItems } = parseH2AndSidebar(content);
    const { prev, next } = getNextPrevArticle(article);
    const relatedArticles = getRelatedArticles(article);

    const renderHeader = header();
    const renderBreadcrumb = breadcrumb(title);
    const renderArticleHeader = article_header(
      tags,
      title,
      author,
      date,
      reading_time,
    );
    const renderArticleContent = article_content(cleanHtml);
    const renderStickySidebar = sticky_sidebar(sidebarItems, relatedArticles);
    const renderBottomNav = bottom_nav(prev, next);
    const renderFooter = footer();

    // Render template HTML langsung dari server
    const html = `
<!doctype html>
<html class="dark" data-theme="dark" lang="id">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
    <link
      href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=JetBrains+Mono:wght@100..900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      rel="stylesheet"
    />  
    <script src="/js/reading.js" defer></script>
    <!-- CSS Tailwind yang sudah diproses -->
    <link rel="stylesheet" href="/output.css" />
  </head>
  <body class="bg-background text-on-surface p-6">
    ${renderHeader}
    <main class="grow max-w-7xl w-full mx-auto px-4 md:px-6 py-6 md:py-8">
      ${renderBreadcrumb}
      ${renderArticleHeader}

      <!-- 3. Two-Column Reading Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        ${renderArticleContent}
        ${renderStickySidebar}
      </div>
      ${renderBottomNav}
    </main>
    ${renderFooter}
  </body>
</html>`;

    return e.html(200, html);
  } catch (err) {
    console.log(err);
    return e.html(
      404,
      `
            <div style="text-align:center; padding:50px; font-family:sans-serif;">
                <h1>404 - Artikel Tidak Ditemukan</h1>
                <a href="/">Kembali ke beranda</a>
            </div>
        `,
    );
  }
});
