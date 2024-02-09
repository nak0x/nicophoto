//  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
const jwt = require("jsonwebtoken");
const joi = require("joi");
const { Database } = require("../database/database");

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

exports.authToken = (req, res, next)=>{

    // Pickup the token into the headers
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Bearer qlljmlqkjenkjlgqsg6q5erqe54qdhg

    // Check if the token exsist
    if(!token) return res.sendStatus(401)

    // If it was an admin token
    jwt.verify(token, process.env.ADMIN_TOKEN_SECRET, (err, admin)=>{
        if(!err){
            req.user = {...admin, admin: true}
            next()
        }else{

            // Verify the token and go to the next middleware or req/res function
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
                if(err) return res.sendStatus(401)
                req.user = user
                next();
            })
        }
    })

}
