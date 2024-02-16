// const Database = require("../database/database");
// const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `albums/${req.params.album_uid}`);
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}.${file.originalname.split(".").pop()}`);
  },
});

const upload = multer({ storage: storage });

exports.createImage = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      // Handle error
      console.error(err);
      return res.status(500).send("Error uploading file");
    }
    // File uploaded successfully
    res.send("Image created");
  });
};
