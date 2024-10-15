const Programme = require('../Models/Programme'); // Import the Programme model

// Create a new programme (CREATE)
exports.createProgramme = async (req, res) => {
  try {
    const { type, name, description, startDate, endDate } = req.body;
    const newProgramme = await Programme.create({
      type,
      name,
      description,
      startDate,
      endDate
    });
    res.status(201).json({ message: 'Programme created successfully!', programme: newProgramme });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all programmes (READ)
exports.getAllProgrammes = async (req, res) => {
  try {
    const programmes = await Programme.findAll();
    res.status(200).json(programmes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific programme by ID (READ)
exports.getProgrammeById = async (req, res) => {
  try {
    const { id } = req.params;
    const programme = await Programme.findByPk(id);
    if (!programme) {
      return res.status(404).json({ message: 'Programme not found!' });
    }
    res.status(200).json(programme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a programme (UPDATE)
exports.updateProgramme = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, name, description, startDate, endDate } = req.body;
    const programme = await Programme.findByPk(id);
    
    if (!programme) {
      return res.status(404).json({ message: 'Programme not found!' });
    }

    programme.type = type;
    programme.name = name;
    programme.description = description;
    programme.startDate = startDate;
    programme.endDate = endDate;
    
    await programme.save();
    res.status(200).json({ message: 'Programme updated successfully!', programme });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a programme (DELETE)
exports.deleteProgramme = async (req, res) => {
  try {
    const { id } = req.params;
    const programme = await Programme.findByPk(id);
    
    if (!programme) {
      return res.status(404).json({ message: 'Programme not found!' });
    }

    await programme.destroy();
    res.status(200).json({ message: 'Programme deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get programmes within a specific date range
exports.getProgrammesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Check if both dates are provided
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Both startDate and endDate are required!" });
    }

    // Find all programmes within the specified date range
    const programmes = await Programme.findAll({
      where: {
        startDate: {
          [Sequelize.Op.gte]: new Date(startDate), // Greater than or equal to startDate
        },
        endDate: {
          [Sequelize.Op.lte]: new Date(endDate), // Less than or equal to endDate
        },
      },
    });

    // Check if no programmes are found
    if (programmes.length === 0) {
      return res.status(404).json({ message: "No programmes found in the specified date range." });
    }

    res.status(200).json(programmes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
