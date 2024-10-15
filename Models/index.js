const Driver=require('../Models/Driver.js')
const Guide=require('../Models/Guide.js')
const Programme=require('../Models/Programme.js')
const Tour=require('../Models/Tour.js')
const Tourist=require('../Models/Tourist.js')
const User = require('../Models/User.js')
const TourTourist = require('../Models/TourTourist.js')


Driver.hasMany(Tour)
Tour.belongsTo(Driver,{foreignKey:"driverId"})

Guide.hasMany(Tour)
Tour.belongsTo(Guide,{foreignKey:"guideId"})

Programme.hasMany(Tour)
Tour.belongsTo(Programme,{foreignKey:"programmeId"})


Tour.hasMany(Tourist)
Tourist.belongsTo(Tour,{foreignKey:"tourId"})

User.hasOne(Tourist,{foreignKey:"userId"})
Tour.belongsToMany(Tourist,{through:TourTourist})
Tourist.belongsToMany(Tour,{through:TourTourist})
module.exports={
    Driver,Guide,Programme,Tour,Tourist,User,TourTourist
}