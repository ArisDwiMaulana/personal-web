// menambahkan id otomatis pada h2
// serta mengambil seluruh value h2 untuk sidebar
function parseH2AndSidebar(rawHtml) {
  let sidebarItems = [];
  let idCounts = {};

  // Regex dipersempit: hanya mencari <h2>...</h2>
  let cleanHtml = rawHtml.replace(/<h2>(.*?)<\/h2>/g, (match, text) => {
    // Membuat slug ID yang valid untuk anchor link
    let id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Antisipasi jika ada judul H2 yang duplikat
    if (idCounts[id]) {
      idCounts[id]++;
      id = `${id}-${idCounts[id]}`;
    } else {
      idCounts[id] = 1;
    }

    // Catat data untuk dikirim ke komponen sidebar
    sidebarItems.push({
      text: text,
      targetId: id,
    });

    // Kembalikan tag h2 yang sudah diberi ID
    return `<h2 id="${id}">${text}</h2>`;
  });

  return { cleanHtml, sidebarItems };
}

module.exports = parseH2AndSidebar;
