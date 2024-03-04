const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fs = require("fs");
const Database = require("../database/database");
const theUid = uuidv4();
const { compressImage } = require("../controllers/compressor.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `albums/${req.params.album_uid}`);
  },
  filename: function (req, file, cb) {
    cb(null, `${theUid}.${file.originalname.split(".").pop()}`);
  },
});

const upload = multer({ storage: storage });

exports.createImage = (req, res) => {
  // verify if the folder with the album uid exists
  try {
    if (
      !fs.existsSync(`albums/${req.params.album_uid}`) ||
      !req.params.album_uid
    ) {
      return res.status(404).send({
        success: false,
        error: { code: 404, message: "Album not found" },
      });
    }

    upload.single("image")(req, res, async (err) => {
      if (err) {
        throw new Error("Error uploading image");
      }

      const preview = compressImage(req.file.path);

      const query =
        "INSERT INTO image (uid, name, preview, pinned, album_uid) VALUES (?, ?, ?, ?, ?)";
      const params = [
        theUid,
        req.body.name,
        preview,
        req.body.pinned,
        req.params.album_uid,
      ];

      await new Promise((resolve, reject) => {
        Database.run(query, params, (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        });
      });

      // File uploaded successfully
      res.send("Image created");
    });
  } catch (error) {
    res.send({
      success: false,
      error: { code: 500, message: error },
    });
  }
};

// uid TINYTEXT PRIMARY KEY NOT NULL,
// name VARCHAR(255) DEFAULT NULL,
// preview BLOB,
// pinned BOOLEAN DEFAULT FALSE,
// album_uid INTEGER NOT NULL,
// FOREIGN KEY(album_uid) REFERENCES album(uid)
