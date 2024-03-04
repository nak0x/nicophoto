const Database = require("../database/database");

exports.getAllAlbumImages = async (req, res) => {
  try {
    const query = "SELECT * FROM image WHERE album_uid = ?";
    const params = [req.params.album_uid];

    const rows = await new Promise((resolve, reject) => {
      Database.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });

    if (!rows) {
      throw new Error("No images found");
    }

    res.send({
      success: true,
      data: rows.map((row) => row.uid),
    });
  } catch (error) {
    res.send({
      success: false,
      error: { code: 404, message: error },
    });
  }
};
