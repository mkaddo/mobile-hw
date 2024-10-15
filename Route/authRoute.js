const express = require("express");

const authController = require("../Controllers/authController");
const router = express.Router();
const { body } = require("express-validator");
const Users = require("../Models/User");

router.post(
  "/signup",
  [
    body("fName")
      .notEmpty()
      .withMessage("notEmpty")
      .isString()
      .withMessage("string")
      .isAlpha()
      .withMessage("alpha"),
    body("lName")
      .notEmpty()
      .withMessage("notEmpty")
      .isString()
      .withMessage("string")
      .isAlpha()
      .withMessage("alpha"),
    body("description")
      .notEmpty()
      .withMessage("notEmpty")
      .isAlpha()
      .withMessage("string"),
    body("userName")
      .trim()
      .notEmpty()
      .withMessage("notEmpty")
      .custom((value, { req }) => {
        return Users.findOne({ where: { userName: value } }).then((user) => {
          if (user) {
            return Promise.reject("alreadyExists");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("notEmpty")
      .isString()
      .withMessage("string")
      .isLength({ min: 8 })
      .withMessage("at least 8 characters"),
  ],
  authController.signUp
);

router.put(
  "/login",
  [
    body("userName")
      .trim()
      .notEmpty()
      .withMessage("notEmpty")
      .custom((value) => {
        return Users.findOne({ where: { userName: value } }).then((user) => {
          if (!user) {
            return Promise.reject("404");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("notEmpty")
      .isString()
      .withMessage("string")
      .isLength({ min: 8 })
      .withMessage("at least 8 characters"),
  ],
  authController.logIn
);

module.exports = router;
