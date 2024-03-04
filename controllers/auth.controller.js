const jwt = require("jsonwebtoken");
const database = require("../database/database_utils");

// Token managment

/**
 * authenticate a user
 * @param {Express.Request} req http request
 * @param {Express.Response} res http response
 * @returns void
 */
exports.auth = (req, res) => {
  // Try to find a user corresponding to his credidentials
  const data = req.body.data;

  switch (data.authType) {
    case "admin":
      let admin = database.getAdminCredentials(data.uuid);
      break;
  }

  // If there is a user, try his credidentials

  // If valid -> send a token

  return;
};
