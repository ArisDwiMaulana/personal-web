/// <reference path="../pb_data/types.d.ts" />

// ─────────────────────────────────────────────────────────────────────────────
// Helper: generate URL-friendly slug from title
// ─────────────────────────────────────────────────────────────────────────────
function generateSlug(title) {
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-+/g, "-");
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook: auto-generate slug on article create (if slug field is empty)
// ─────────────────────────────────────────────────────────────────────────────
onRecordCreate((e) => {
  const title = e.record.get("title");
  const slug = e.record.get("slug");
  if (title && !slug) {
    e.record.set("slug", generateSlug(title));
  }
  e.next();
}, "articles");

// ─────────────────────────────────────────────────────────────────────────────
// Hook: auto-generate slug on article update (if slug field is empty)
// ─────────────────────────────────────────────────────────────────────────────
onRecordUpdate((e) => {
  const title = e.record.get("title");
  const slug = e.record.get("slug");
  if (title && !slug) {
    e.record.set("slug", generateSlug(title));
  }
  e.next();
}, "articles");

// ─────────────────────────────────────────────────────────────────────────────
// Route: GET /articles/{slug} — render article reading page
// ─────────────────────────────────────────────────────────────────────────────
routerAdd("GET", "/articles/{slug}", (e) => {
  const slug = e.request.pathValue("slug");

  try {
    const article = $app.findFirstRecordByFilter(
      "articles",
      "slug = {:slug} && status = 'published'",
      { slug: slug },
    );

    const html = $template
      .loadFiles(`${__hooks}/../pb_public/articles/template.html`)
      .render({
        title: article.get("title"),
        content: article.get("content"),
        author: article.get("author") || "Adrian Pratama",
        reading_time: article.get("reading_time") || "",
        category: article.get("category") || "",
        tags: article.get("tags") || "",
        created: article.get("created"),
      });

    return e.html(200, html);
  } catch (err) {
    console.log("[articles route] error:", err);
    return e.html(
      404,
      `<div style="text-align:center;padding:80px 20px;font-family:sans-serif;background:#0f1117;color:#e5e7eb;min-height:100vh;">
        <h1 style="font-size:2rem;margin-bottom:1rem;">404 — Artikel Tidak Ditemukan</h1>
        <p style="color:#9ca3af;margin-bottom:2rem;">Artikel dengan slug "<strong>${slug}</strong>" tidak tersedia.</p>
        <a href="/articles/" style="color:#6366f1;text-decoration:underline;">← Kembali ke daftar artikel</a>
      </div>`,
    );
  }
});
