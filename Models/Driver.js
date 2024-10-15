const sequelize = require('../Utils/DB');
const Sequelize = require('sequelize');
const Driver= sequelize.define('driver', {

    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue:Sequelize.UUIDV1
        
    }
    ,
    fName: Sequelize.STRING,
    lName: Sequelize.STRING,
    plateNumber: Sequelize.STRING,
    description: Sequelize.STRING

});

module.exports = Driver;