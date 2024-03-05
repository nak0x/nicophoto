const Database = require("../database/database");

exports.getAlbums = async (req, res, next) => {
  try {
    Database.all("SELECT uid FROM album", [], (err, rows) => {
      if (err) {
        throw new Error(err);
      }
      res.send({
        success: true,
        data: rows.map((obj) => obj.uid),
      });
    });
  } catch (error) {
    res.send({
      success: false,
      error: { code: 500, message: error },
    });
  }
};
