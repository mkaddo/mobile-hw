const Driver = require('../Models/Driver'); // Import the Driver model

// Create a new driver (CREATE)
exports.createDriver = async (req, res) => {
  try {
    const { fName, lName, plateNumber, description } = req.body;
    const newDriver = await Driver.create({
      fName,
      lName,
      plateNumber,
      description
    });
    res.status(201).json({ message: 'Driver created successfully!', driver: newDriver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a list of all drivers (READ)
exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific driver by ID (READ)
exports.getDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findByPk(id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found!' });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a driver (UPDATE)
exports.updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { fName, lName, plateNumber, description } = req.body;
    const driver = await Driver.findByPk(id);
    
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found!' });
    }

    driver.fName = fName;
    driver.lName = lName;
    driver.plateNumber = plateNumber;
    driver.description = description;
    
    await driver.save();
    res.status(200).json({ message: 'Driver updated successfully!', driver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a driver (DELETE)
exports.deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findByPk(id);
    
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found!' });
    }

    await driver.destroy();
    res.status(200).json({ message: 'Driver deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
