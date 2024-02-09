const Joi = require("joi");
const slugify = require("slugify");
const Database = require("../database/database");

const albumSchemaPost = Joi.object({
  title: Joi.string().required(),
  desc: Joi.string().required(),
  pass: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
      )
    ),
  date: Joi.date().required(),
  uri: Joi.string().allow(null),
});

const albumSchemaPatch = Joi.object({
  title: Joi.string().allow(null),
  desc: Joi.string().allow(null),
  pass: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
      )
    )
    .allow(null),
  date: Joi.date().allow(null),
  uri: Joi.string().allow(null),
});

const createAlbum = async (req, res, next) => {
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

const getAlbum = async (req, res, next) => {
  // implement isAdmin in middleware to req.isAdmin
  try {
    const selectValues = req.isAdmin ? "*" : "id, title, desc, date, uri";
    const result = Database.run(
      `SELECT ${selectValues} FROM album WHERE id = ?`,
      [req.params.id]
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

const updateAlbum = async (req, res, next) => {
  const body = req.body;

  try {
    const response = await albumSchemaPatch.validateAsync({ ...body });

    if (response.error) {
      throw new Error(response.error);
    }

    // TODO : update only the fields that are not null

    // const result = Database.run(
    //   "UPDATE album SET title = ?, desc = ?, pass = ?, date = ?, uri = ? WHERE id = ?",
    //   [
    //     body.title,
    //     body.desc,
    //     body.pass,
    //     body.date,
    //     body.uri ?? slugify(body.title, { lower: true }),
    //     req.params.id,
    //   ]
    // );

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

module.exports = { createAlbum, getAlbum, updateAlbum };
