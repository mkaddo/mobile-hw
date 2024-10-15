const sequelize = require("../Utils/DB");
const Sequelize = require("sequelize");
const Programme = require("./Programme");
const Tour = require("./Tour");
const User = require("./User");
const Tourist = sequelize.define("tourist", {
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  userId: {
    type: Sequelize.UUID,
    references:{
      key:"id",
      model:User
    }
    
  },
  fName: Sequelize.STRING,
  lName: Sequelize.STRING,
  description: Sequelize.STRING,
  
  // tourId: {type: Sequelize.INTEGER,references:{key:'id', model: Tour}}
});

module.exports = Tourist;
