const sequelize = require("../Utils/DB");
const Sequelize = require("sequelize");

const Tour = require("./Tour");
const Tourist = require("./Tourist");
const TourTourist = sequelize.define("tourTourist", {
  touristId: {
    type: Sequelize.UUID,
    references:{
      key:"userId",
      model:Tourist
    }
  },
  tourId: {type:Sequelize.INTEGER,

    references:{
      key:"id",
      model:Tour
    }

  },
 

});

module.exports = TourTourist;
