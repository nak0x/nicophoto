const slugify = require("slugify");
const Database = require("../database/database");
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

    const result = Database.run(
      "INSERT INTO album (title, desc, pass, date, uri) VALUES (?, ?, ?, ?, ?)",
      [
        body.title,
        body.desc,
        body.pass,
        body.date,
        body.uri ?? slugify(body.title, { lower: true }),
      ]
    );

    if (result.error) {
      throw new Error(result.error);
    }

    res.send({
      success: true,
      data: result.data,
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
    const selectValues = req.isAdmin ? "*" : "id, title, desc, date, uri";
    const result = Database.run(
      `SELECT ${selectValues} FROM album WHERE id = ?`,
      [req.params.uid]
    );

    if (result.error) {
      throw new Error(result.error);
    }

    res.send({
      success: true,
      data: result.data,
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

    for (const [key, value] of Object.entries(body)) {
      if (value) {
        if (key == "uri") {
          value = slugify(value, { lower: true });
        }
        const result = Database.run(
          `UPDATE album SET ${key} = ? WHERE id = ?`,
          [value, req.params.uid]
        );

        if (result.error) {
          throw new Error(result.error);
        }
      }
    }

    if (result.error) {
      throw new Error(result.error);
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
    const result = Database.run("DELETE FROM album WHERE id = ?", [
      req.params.uid,
    ]);

    if (result.error) {
      throw new Error(result.error);
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
