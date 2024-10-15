const sequelize = require("../Utils/DB");
const Sequelize = require("sequelize");
const User = sequelize.define("User", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue:Sequelize.UUIDV1
  },
  userName: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
