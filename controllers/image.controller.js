const { v4: uuidv4, validate } = require("uuid");
const multer = require("multer");
const fs = require("fs");
const Database = require("../database/database");
const { compressImage } = require("../controllers/compressor.controller");
const { getAlbumInfosByURL } = require("./album.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `albums/${req.identifier}`);
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}.${file.originalname.split(".").pop()}`);
  },
});

const upload = multer({ storage: storage });

exports.createImage = async (req, res) => {
  try {
    let identifier = req.params.album_uid;
    if (!validate(identifier)) {
      const albumInfos = await getAlbumInfosByURL(identifier);
      if (!albumInfos.success) {
        return res.status(404).send({
          ...albumInfos,
        });
      }
      identifier = albumInfos.data.uid;
    }
    req.identifier = identifier;
    if (!fs.existsSync(`albums/${identifier}`) || !identifier) {
      return res.status(404).send({
        success: false,
        error: { code: 404, message: "Album not found" },
      });
    }

    upload.single("image")(req, res, async (err) => {
      try {
        if (err) {
          throw new Error("Error uploading image");
        }

        if(!req.file) throw new Error("No file uploaded");

        const preview = await compressImage(req.file.path);
        console.log('Image compressed')
        const mime_type = req.file.mimetype;

        const query =
          "INSERT INTO image (uid, name, preview, pinned, album_uid, mime_type) VALUES (?, ?, ?, ?, ?, ?)";
        const params = [
          req.file.filename.split(".").shift(),
          req.body.name,
          preview,
          req.body.pinned,
          identifier,
          mime_type,
        ];

        await new Promise((resolve, reject) => {
          Database.run(query, params, (err) => {
            if (err) {
              reject(err);
            }
            resolve();
          });
        });

        res.send({
          success: true
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          error: { code: 500, message: error.message },
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: { code: 500, message: error.message },
    });
  }
};

exports.getImage = async (req, res) => {
  try {
    const query = "SELECT * FROM image WHERE uid = ? AND album_uid = ?";
    const params = [req.params.image_uid, req.params.album_uid];

    const row = await new Promise((resolve, reject) => {
      Database.get(query, params, (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });

    if (!row) {
      throw new Error("Image not found");
    }

    if (req.query.url) {
      res.setHeader("Content-Type", "image/webp");
      res.send(Buffer.from(row.preview, "base64"));
    } else {
      res.send({
        success: true,
        data: row,
      });
    }
  } catch (error) {
    res.status(404).send({
      success: false,
      error: { code: 404, message: error },
    });
  }
};

exports.getRandomImageFromAlbumUID = (albumUID) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT preview FROM image WHERE album_uid = ? ORDER BY RANDOM()";
    const params = [albumUID];

    Database.get(query, params, (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
};

exports.updateImage = async (req, res) => {
  try {
    const body = req.body;
    for (let [key, value] of Object.entries(body)) {
      if (value) {
        const query = `UPDATE image SET ${key} = ? WHERE uid = ?`;
        const params = [value, req.params.image_uid];

        await new Promise((resolve, reject) => {
          Database.run(query, params, (err) => {
            if (err) {
              reject(err);
            }
            resolve();
          });
        });
      }
    }

    res.send({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      error: { code: 404, message: error },
    });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const querySelect =
      "SELECT mime_type FROM image WHERE uid = ? AND album_uid = ?";
    const paramsSelect = [req.params.image_uid, req.params.album_uid];

    const row = await new Promise((resolve, reject) => {
      Database.get(querySelect, paramsSelect, (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });

    const query = "DELETE FROM image WHERE uid = ? AND album_uid = ?";
    const params = [req.params.image_uid, req.params.album_uid];

    await new Promise((resolve, reject) => {
      Database.run(query, params, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });

    fs.unlinkSync(
      `albums/${req.params.album_uid}/${req.params.image_uid}.${row.mime_type
        .split("/")
        .pop()}`
    );

    res.send({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      error: { code: 404, message: error },
    });
  }
};
