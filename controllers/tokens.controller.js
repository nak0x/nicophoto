// This file is in charge of managing the JWT tokens such as generation, check and other

const jwt = require("jsonwebtoken");

exports.genAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"});
};

exports.genAdminToken = (admin) => {
  return jwt.sign(admin, process.env.ADMIN_TOKEN_SECRET, {expiresIn: '1h'});
}

exports.genRenewToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1h"});
}

exports.readAdminToken = (token) => {
  try{
    return jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);
  }catch(err){
    return {error: true, ...err};
  }
}

exports.readAccessToken = (token) => {
  try{
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  }catch(err){
    return {error: true, ...err};
  }
}

exports.readRenewToken = (token) => {
  try{
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  }catch(err){
    return {error: true, ...err};
  }
}