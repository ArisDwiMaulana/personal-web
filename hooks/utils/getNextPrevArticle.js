function getNextPrevArticle(currentRecord) {
  const rawDate = currentRecord.getString("date");

  let prev = null;
  let next = null;

  if (!rawDate) return { prev, next };

  // 1. CARI ARTIKEL SEBELUMNYA (Urutkan "-date" agar dapat artikel terdekat sebelum tanggal ini)
  try {
    const prevRecords = $app.findRecordsByFilter(
      "articles",
      "date > {:dateTarget}",
      "date", // Sort descending
      1, // Limit 1
      0, // Offset 0
      { dateTarget: rawDate },
    );

    if (prevRecords.length > 0) {
      prev = {
        title: prevRecords[0].getString("title"),
        slug: prevRecords[0].getString("slug"),
      };
    }
  } catch (e) {
    console.log("Error prev article:", e);
    prev = null;
  }

  // 2. CARI ARTIKEL SELANJUTNYA (Urutkan "date" agar dapat artikel terdekat setelah tanggal ini)
  try {
    const nextRecords = $app.findRecordsByFilter(
      "articles",
      "date < {:dateTarget}",
      "-date", // Sort ascending
      1, // Limit 1
      0, // Offset 0
      { dateTarget: rawDate },
    );

    if (nextRecords.length > 0) {
      next = {
        title: nextRecords[0].getString("title"),
        slug: nextRecords[0].getString("slug"),
      };
    }
  } catch (e) {
    console.log("Error next article:", e);
    next = null;
  }

  return { prev, next };
}

module.exports = getNextPrevArticle;
