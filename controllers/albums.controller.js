const Database = require("../database/database");

exports.getAllAlbumUIDs = async () => {
  try {
    const rows = await new Promise((resolve, reject) => {
      Database.all("SELECT uid FROM album", [], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });

    return {
      success: true,
      data: rows.map((row) => row.uid),
    };
  } catch (error) {
    return {
      success: false,
      error: { code: 500, message: error },
    };
  }
};

exports.renderAlbumsPage = async (req, res) => {
  const albumUIDs = await this.getAllAlbumUIDs();

  if (!albumUIDs.success) {
    return res.redirect("/");
  }

  res.render("admin", {
    albumUIDs: albumUIDs.data,
  });
};
