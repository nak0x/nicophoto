const slugify = require("slugify");
const Database = require("../database/database");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const bcrypt = require('bcrypt');

const {
  albumSchemaPost,
  albumSchemaPatch,
} = require("../validators/album.validator");

exports.createAlbum = async (req, res, next) => {
  const body = req.body;

  try {
    const response = await albumSchemaPost.validateAsync({ ...body });

    if (response.error) {
      throw new Error(response.error);
    }

    const query =
      "INSERT INTO album (uid, title, description, password, date, url) VALUES (?, ?, ?, ?, ?, ?)";

    const params = [
      uuidv4(),
      body.title,
      body.description,
      await bcrypt.hash(body.password, 10),
      body.date,
      body.url
        ? slugify(body.url, { lower: true })
        : slugify(body.title, { lower: true }),
    ];

    await new Promise((resolve, reject) => {
      Database.run(query, params, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });

    await new Promise((resolve, reject) => {
      fs.mkdir(`albums/${params[0]}`, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });

    res.send({
      success: true,
      data: {},
    });
  } catch (error) {
    res.send({
      success: false,
      error: { code: 400, message: error },
    });
  }
};

exports.getAlbum = async (req, res, next) => {
  try {
    req.user = {};
    req.user.admin = true;
    const selectValues = req.user.admin
      ? "*"
      : "uid, title, description, date, url";

    const query = `SELECT ${selectValues} FROM album WHERE uid = ?`;
    const params = [req.params.album_uid];

    const rows = await new Promise((resolve, reject) => {
      Database.get(query, params, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });

    if (!rows) {
      throw new Error("No album found");
    }

    res.send({
      success: true,
      data: rows,
    });
  } catch (error) {
    res.send({
      success: false,
      error: { code: 400, message: error },
    });
  }
};

exports.updateAlbum = async (req, res, next) => {
  const body = req.body;

  try {
    const response = await albumSchemaPatch.validateAsync({ ...body });

    if (response.error) {
      throw new Error(response.error);
    }

    for (let [key, value] of Object.entries(body)) {
      if (value) {
        if (key == "url") {
          value = slugify(value, { lower: true });
        }

        const query = `UPDATE album SET ${key} = ? WHERE uid = ?`;
        const params = [value, req.params.album_uid];

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
    res.send({
      success: false,
      error: { code: 400, message: error },
    });
  }
};

exports.deleteAlbum = async (req, res, next) => {
  try {
    const query = `DELETE FROM album WHERE uid = ?`;
    const params = [req.params.album_uid];

    await new Promise((resolve, reject) => {
      Database.run(query, params, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });

    res.send({
      success: true,
      data: {},
    });
  } catch (error) {
    res.send({
      success: false,
      error: { code: 400, message: error },
    });
  }
};

exports.getAlbumByURL = async (req, res) => {
  try {
    const slug = req.params.album_slug;
    const query = `SELECT * FROM album WHERE url = ?`;
    const params = [slug];
    const row = await new Promise((resolve, reject) => {
      Database.get(query, params, (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
    // console.log(slug);
    if (!row) return res.status(404).render('404');
    
    const getImagesByAlbumIdQuery = `SELECT uid FROM image WHERE album_uid = ?`;
    const getImagesByAlbumIdParam = [row.uid];
    const imageUids = await new Promise((resolve, reject) => {
      Database.all(
        getImagesByAlbumIdQuery,
        getImagesByAlbumIdParam,
        (err, images) => {
          if (err) {
            reject(err);
          }
          resolve(images);
        }
      );
    });
    console.log(imageUids);

    res.render("album", {
      albumInfo: row,
      imageUids: imageUids.map((row) => row.uid),
    });
  } catch (error) {
    return res.status(404).render('404');
  }
};

exports.getAlbumUidFromSlug = async(req,res) => {

}