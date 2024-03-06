const {
  fuzzyFindEntityByUniqueId,
  getAdminCredentials,
} = require("../database/database_utils");
const tokenController = require("../controllers/tokens.controller");

exports.login = async (req, res) => {
  // Read the req body
  const data = {
    id: req.body.id,
    pass: req.body.password,
  };

  // Auth the data is corresponding admin or album
  const entity = await fuzzyFindEntityByUniqueId(data.id);

  if (entity.error) {
    return res.sendStatus(403);
  }

  // Send the auth token
  if (entity.admin) {
    let token = `Bearer ${tokenController.genAdminToken(entity.admin)}`;
    req.session.token = token;
    return res.send({
      token: token,
    });
  }
  if (entity.album) {
    let token = `Bearer ${tokenController.genAccessToken(entity.album)}`;
    req.session.token = token;
    return res.send({
      token: token,
    });
  }
  return res.sendStatus(403);
};

exports.logout = (req, res) => {
  // Read the req.body
  const token = req.body.token;
  const session = req.body.session;

  // Check if the token is in session
  if (token == session.token) {
    // TRUE : Remove it
    req.session.token = "";
  }

  res.sendStatus(200);
  return;
};
