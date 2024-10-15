const {Guide} = require('../Models/index'); // Import the Guide model

// Create a new guide (CREATE)
exports.createGuide = async (req, res) => {
  try {
    const { fName, lName, address, mobile, description } = req.body;
    const newGuide = await Guide.create({
      fName,
      lName,
      address,
      mobile,
      description
    });
    res.status(201).json({ message: 'Guide created successfully!', guide: newGuide });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all guides (READ)
exports.getAllGuides = async (req, res) => {
  try {
    const guides = await Guide.findAll();
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific guide by ID (READ)
exports.getGuideById = async (req, res) => {
  try {
    const { id } = req.params;
    const guide = await Guide.findByPk(id);
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found!' });
    }
    res.status(200).json(guide);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a guide (UPDATE)
exports.updateGuide = async (req, res) => {
  try {
    const { id } = req.params;
    const { fName, lName, address, mobile, description } = req.body;
    const guide = await Guide.findByPk(id);
    
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found!' });
    }

    guide.fName = fName;
    guide.lName = lName;
    guide.address = address;
    guide.mobile = mobile;
    guide.description = description;
    
    await guide.save();
    res.status(200).json({ message: 'Guide updated successfully!', guide });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a guide (DELETE)
exports.deleteGuide = async (req, res) => {
  try {
    const { id } = req.params;
    const guide = await Guide.findByPk(id);
    
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found!' });
    }

    await guide.destroy();
    res.status(200).json({ message: 'Guide deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
