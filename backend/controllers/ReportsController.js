const Report = require('../models/Report');

// Create a new report
exports.createReport = async (req, res) => {
  try {
    const report = new Report({
      userId: req.body.userId,
      reportType: req.body.reportType,
      data: req.body.data,
      format: req.body.format
    });
    await report.save();
    res.status(201).json({ message: 'Report created successfully', report });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all reports for a user
exports.getReportsByUserId = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.params.userId });
    res.status(200).json(reports);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a report by ID
exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a report
exports.updateReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.status(200).json({ message: 'Report updated successfully', report });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a report
exports.deleteReport = async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
