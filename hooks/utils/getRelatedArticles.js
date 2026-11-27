function getRelatedArticlesByTags(currentRecord) {
  const currentId = currentRecord.id;
  const rawTags = currentRecord.getString("tags");

  // 1. Ekstrak string tags menjadi array
  const tagList = rawTags ? rawTags.trim().split(/\s+/) : [];

  // Jika artikel ini tidak punya tag, kembalikan array kosong
  if (tagList.length === 0) {
    return [];
  }

  try {
    // 2. Buat filter dynamic untuk PocketBase
    const tagConditions = tagList
      .map((_, index) => `tags ~ {:t${index}}`)
      .join(" || ");
    const filterQuery = `id != {:currentId} && status = "published" && (${tagConditions})`;

    // 3. Menyusun parameter binding
    const queryParams = { currentId: currentId };
    tagList.forEach((tag, index) => {
      queryParams[`t${index}`] = tag;
    });

    // 4. Eksekusi Query ke PocketBase (Limit diisi 0 untuk mengambil semua data)
    const relatedRecords = $app.findRecordsByFilter(
      "articles",
      filterQuery,
      "-date", // Urutkan dari yang terbaru
      0, // Limit 0 = Mengambil seluruh data yang cocok tanpa batasan
      0, // Offset
      queryParams,
    );

    // 5. Mapping seluruh data hasil query
    return relatedRecords.map((rec) => ({
      title: rec.getString("title"),
      slug: rec.getString("slug"),
      reading_time: rec.getString("reading_time"),
      date: rec.getString("date"),
      tags: rec.getString("tags")
        ? rec.getString("tags").trim().split(/\s+/)
        : [],
    }));
  } catch (e) {
    console.log("Error getting related articles by tags:", e);
    return [];
  }
}

module.exports = getRelatedArticlesByTags;
