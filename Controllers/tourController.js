const e = require('express');
const {Tour,TourTourist,Driver} = require('../Models/index'); 
const { Op } = require('sequelize');
exports.createTour = async (req, res) => {
  try {
    const { guideId, driverId, programmeId, price, number,startDate,endDate } = req.body;
    const newTour = await Tour.create({
      guideId,
      driverId,
      programmeId,
      price,
      number,
      startDate,
      endDate
    });
    res.status(201).json({ message: 'Tour created successfully!', tour: newTour });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.findAll();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findByPk(id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found!' });
    }
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const { guideId, driverId, programmeId, price, number,isOpen,startDate,endDate } = req.body;
    const tour = await Tour.findByPk(id);
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found!' });
    }

    tour.guideId = guideId;
    tour.driverId = driverId;
    tour.programmeId = programmeId;
    tour.price = price;
    tour.number = number;
    tour.isOpen=isOpen;
    tour.startDate = startDate;
    tour.endDate = endDate;
    
    await tour.save();
    res.status(200).json({ message: 'Tour updated successfully!', tour });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findByPk(id);
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found!' });
    }

    await tour.destroy();
    res.status(200).json({ message: 'Tour deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registeringOnTour = async (req, res,next) => {

const {tourId} = req.body;

Tour.findByPk(tourId).then((tour) => {
if(!tour.isOpen)
{
  var error =new Error("tour not open yet")
  
  next(error)
}
else{
  TourTourist.create({touristId:req.userId,tourId:tourId}).then(result=>{
    if(result){
      res.json({ message: 'your request was successful'});
    }
    else{
      res.json({message: 'your request failed'})
    }
  }).catch(error=>{
    next(error)
  })
}
})

}





exports.getTourCountByDriver = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

   
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Both startDate and endDate are required!" });
    }

    
    const tourReport = await Tour.findAll({
      where: {
        startDate: {
          [Op.gte]: new Date(startDate), 
        },
        endDate: {
          [Op.lte]: new Date(endDate), 
        },
      },
      attributes: [
        'driverId',  
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'tourCount'] 
      ],
      group: ['driverId'],
      include: [
        {
          model: Driver, 
          attributes: ['fName', 'lName', 'plateNumber'], 
        },
      ],
    });

    if (tourReport.length === 0) {
      return res.status(404).json({ message: "No tours found in the specified date range." });
    }

    res.status(200).json(tourReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};









