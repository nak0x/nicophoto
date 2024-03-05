// This file is in charge of managing the JWT tokens such as generation, check and other

const jwt = require("jsonwebtoken");

exports.genUserToken = async (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"});
};

exports.genAdminToken = async (admin) => {
  return jwt.sign(admin, proccess.env.ADMIN_TOKEN_SECRET, {expiresIn: '1h'});
}

exports.genRenewToken = async (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1h"});
}

exports.readAdminToken = async (token) => {
  return jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);
}

exports.readAccessToken = async (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

exports.readRenewToken = async (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}