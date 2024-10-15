const sequelize = require("../Utils/DB");
const Sequelize = require("sequelize");

const Programme = sequelize.define("programme", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: Sequelize.STRING,

  name: Sequelize.STRING,

  description:Sequelize.STRING,
  startDate:Sequelize.DATE,
  endDate:Sequelize.DATE,
});

module.exports=Programme;