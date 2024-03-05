const Database = require("../database/database");
const fs = require("fs");
const archiver = require("archiver");

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

exports.downloadImages = async (req, res) => {
  try {
    const uids = req.body.image_uids;

    if (!uids || !Array.isArray(uids) || uids.length === 0) {
      throw new Error("Missing or invalid UIDs");
    }

    const placeholders = uids.map(() => "?").join(", ");
    const query = `SELECT * FROM image WHERE uid IN (${placeholders})`;

    const params = uids;

    const rows = await new Promise((resolve, reject) => {
      Database.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });

    if (!rows || rows.length === 0) {
      res.send({
        success: true,
        data: [],
      });
    } else {
      if (rows.length > 1) {
        const archive = archiver("zip", {
          zlib: { level: 9 },
        });
        rows.forEach((row) => {
          const file = fs.createReadStream(
            `albums/${req.params.album_uid}/${row.uid}.${row.mime_type
              .split("/")
              .pop()}`
          );
          archive.append(file, {
            name: `${row.name}.${row.mime_type.split("/").pop()}`,
          });
        });
        archive.finalize();
        res.attachment("images.zip");
        archive.pipe(res);
      } else {
        res.download(
          `albums/${req.params.album_uid}/${rows[0].uid}.${rows[0].mime_type
            .split("/")
            .pop()}`,
          `${rows[0].name}.${rows[0].mime_type.split("/").pop()}`
        );
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error: { code: 400, message: error },
    });
  }
};
