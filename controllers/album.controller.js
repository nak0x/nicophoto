const Joi = require("joi");

const slugify = require("slugify");

const Database = require("../database/database");

const albumSchema = Joi.object({
  title: Joi.string().required(),

  desc: Joi.string().required(),

  pass: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
      )
    ),
  // 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character

  date: Joi.date().required(),

  uri: Joi.string().allow(null),
});

const createAlbum = async (req, res, next) => {
  const body = req.body;

  try {
    const response = await albumSchema.validateAsync({ ...body });

    if (response.error) {
      throw new Error(response.error);
    }

    const result = await Database.run(
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
  } catch (error) {
    res.send({
      success: false,
      error: { code: 400, message: error },
    });
  }
};

module.exports = { createAlbum };
