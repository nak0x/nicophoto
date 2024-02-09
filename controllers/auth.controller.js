//  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
const jwt = require("jsonwebtoken");
const joi = require("joi");
const { Database } = require("../database/database");

