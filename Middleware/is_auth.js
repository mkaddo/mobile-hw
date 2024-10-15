const jwt = require("jsonwebtoken");
const Users = require("../Models/Tourist");
const {Users} = require("../Models/index");
const { toString } = require("express-validator/src/utils");

exports.isAuth = (req, res, next) => {
  var token = req.get("Authorization");
  token=toString(token)
  token=token.split(' ')[1]
  if (!token) {
    const error = new Error("token_mandatory");
    error.status = 401;
    throw error;
  }

  var decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    error.status = 401;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error();
    error.status = 401;
    throw error;
  }

  Users.findByPk(decodedToken.UserId)
    .then((result) => {
      
      if (!result) {
        const error = new Error("token_version");
        error.status = 401;
        throw error;
      }
     
      req.UserId=decodedToken.UserId
      next();
    })
    .catch((error) => {
      next(error);
    });
};
