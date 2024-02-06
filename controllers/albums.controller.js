const Database = require("../database/database");

const getAlbums = async (req, res, next) => {
  try {
    const albums = Database.run("SELECT * FROM album");

    if (!albums) {
      throw new Error("No albums found");
    }

    res.send({
      success: true,
      data: albums,
    });
  } catch (error) {
    res.send({
      success: false,
      error: { code: 500, message: error },
    });
  }
};

module.exports = { getAlbums };
