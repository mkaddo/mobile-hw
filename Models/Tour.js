const sequelize = require('../Utils/DB');
const Sequelize = require('sequelize');
const Programme = require('./Programme');
const Guide = require('./Guide');
const Driver = require('./Driver');
const Tour= sequelize.define('tour', {

id:{
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
}
,
// guidId:{type:Sequelize.INTEGER, references:{key: 'id', model: Guide}},
guideId:{type:Sequelize.INTEGER},
// driverId:{type:Sequelize.UUID, references:{key: 'id',model: Driver}},
driverId:{type:Sequelize.UUID},
programmeId:{type:Sequelize.INTEGER},
// ProgrammeId:{type:Sequelize.INTEGER, references:{key: 'id', model: Programme}},
price:Sequelize.DOUBLE,
number:Sequelize.INTEGER,
isOpen:{
    type:Sequelize.BOOLEAN,
    defaultValue:false
},
startDate:Sequelize.DATE,
endDate:Sequelize.DATE,
}
);



module.exports = Tour;