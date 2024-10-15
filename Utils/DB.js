const {Sequelize} = require("sequelize");
if (process.env.NODE_ENV !== "production") {
  console.log("here")
  require("dotenv").config();
}
const sequelize = new Sequelize(DB_NAME, process.env.DB_USER, DB_PASSWORD, {
  dialect: process.env.DIALECT,
  host:process.env.DB_HOST,
});

module.exports=sequelize