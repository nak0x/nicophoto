const slugify = require("slugify");
const Database = require("../database/database");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const {
  albumSchemaPost,
  albumSchemaPatch,
} = require("../validators/album.validator");

const { getImageUIDsByAlbumUID } = require("./images.controller");

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
      body.password,
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
    res.status(400).send({
      success: false,
      error: { code: 400, message: JSON.stringify(error.message) },
    });
  }
};

exports.getAlbum = async (albumUID) => {
  try {
    const query = `SELECT * FROM album WHERE uid = ?`;
    const params = [albumUID];

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

    return {
      success: true,
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      error: { code: 400, message: error },
    };
  }
};

// TODO : getAlbum for API

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

exports.getAlbumInfosByURL = async (slug) => {
  try {
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

    if (!row) throw new Error("No album found");

    return {
      success: true,
      data: row,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

exports.renderAlbumPageByAlbumURL = async (req, res, next) => {
  const albumInfos = await this.getAlbumInfosByURL(req.params.albumURL);
  if (!albumInfos.success) {
    return next();
  }

  const imageUIDs = await getImageUIDsByAlbumUID(albumInfos.data.uid);
  if (!imageUIDs.success) {
    return next();
  }

  res.render("client", {
    albumInfos: albumInfos.data,
    imageUIDs: [
      "55baf720-d315-464c-8129-4ef5e4e39eff",
      "63f87ebe-70eb-4c1c-b239-420890a63ce2",
      "6558e9f2-d05e-42f5-8eaf-a72281897368",
      "65c26371-3afc-410b-a119-8279d7e2e9cf",
      "6efc923f-39a3-4159-8ed9-f49d19dc178d",
      "7e695872-59fa-436e-be0e-09bffc71556b",
      "914a6371-f957-4028-89de-87956d6bae8a",
      "e6fc6209-13a3-4e93-8321-d0b0067c992a"
  ],
  });
};

exports.renderAlbumPage = async (req, res, next) => {
  const albumInfos = await this.getAlbum(req.params.albumUID);
  if (!albumInfos.success) {
    return next();
  }

  const imageUIDs = await getImageUIDsByAlbumUID(req.params.albumUID);
  if (!imageUIDs.success) {
    return next();
  }

  res.render("album", {
    albumInfos: albumInfos.data,
    imageUIDs: imageUIDs.data,
  });
};
