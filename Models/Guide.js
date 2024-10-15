const sequelize = require("../Utils/DB");

const Sequelize = require("sequelize");

const Guide = sequelize.define("guide", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,  
    primaryKey: true,
  },

  fName: Sequelize.STRING,
  lName: Sequelize.STRING,
  address:Sequelize.STRING,
  mobile:Sequelize.STRING,
  description: Sequelize.STRING 
 
}
);
module.exports=Guide