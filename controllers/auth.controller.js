 /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
const jwt = require("jsonwebtoken");
const joi = require("joi");
const { Database } = require("../database/database");

exports.auth = ()=>{return}
function getAdminById(id){
  try{
    const result = Database.run(`
      SELECT * FROM admins WHERE login_id = ?;
    `, [id]);
    console.log(result);
  }catch(err){
    return {}
  }
}
