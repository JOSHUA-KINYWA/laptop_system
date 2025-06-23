// controllers/laptopapplication.js

const LaptopApplication = require('../models/laptopapplication');
const Laptop = require('../models/laptop');

// Student: Apply for a laptop
exports.applyLaptop = async (req, res) => {
  try {
    console.log('📥 applyLaptop called:', req.body);

    // Ensure authenticated user exists
    if (!req.user) {
      console.error('❌ req.user is missing!');
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }
    console.log('✅ Authenticated user:', req.user);

    // Eligibility check: Only 1st to 3rd year students
    if (req.user.year === 4) {
      return res.status(403).json({
        success: false,
        message: "Only students from 1st to 3rd year are eligible for SmartLaptop financing."
      });
    }

    const { laptopId } = req.body;

    // Validate laptopId format
    if (!laptopId || !laptopId.match(/^[0-9a-fA-F]{24}$/)) {
      console.error('❌ Invalid laptopId:', laptopId);
      return res.status(400).json({ success: false, error: 'Invalid laptopId format' });
    }

    // Check if laptop exists and is available
    const laptop = await Laptop.findById(laptopId);
    if (!laptop) {
      return res.status(404).json({ success: false, error: 'Laptop not found' });
    }
    if (!laptop.available) {
      return res.status(400).json({ success: false, error: 'Laptop not available' });
    }

    // Check for existing pending application for the same laptop
    const existingApplication = await LaptopApplication.findOne({
      student: req.user.id,
      laptop: laptopId,
      status: 'Pending'
    });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        error: 'You already have a pending application for this laptop'
      });
    }

    // Create new laptop application
    const application = await LaptopApplication.create({
      student: req.user.id,
      laptop: laptopId
    });

    console.log('✅ Application created:', application);
    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });

  } catch (err) {
    console.error('❌ Error in applyLaptop:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Admin: Get all laptop applications (with optional filtering)
exports.getApplications = async (req, res) => {
  try {
    const query = req.query.status ? { status: req.query.status } : {};

    const applications = await LaptopApplication.find(query)
      .populate('student', 'name email year')
      .populate('laptop', 'model spec available');

    return res.status(200).json({
      success: true,
      applications
    });

  } catch (err) {
    console.error('❌ Error in getApplications:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Admin: Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['Pending', 'Approved', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status value' });
    }

    const updated = await LaptopApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('student', 'name email year')
     .populate('laptop', 'model spec');

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }

    console.log(`📤 Application status updated to "${status}"`);
    return res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      updated
    });

  } catch (err) {
    console.error('❌ Error in updateApplicationStatus:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};
