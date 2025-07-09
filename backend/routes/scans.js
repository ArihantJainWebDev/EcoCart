const express = require('express');
const router = express.Router();
const Scan = require('../models/scan');

// POST /api/scans/add → Save a scan
router.post('/add', async (req, res) => {
  try {
    const scan = new Scan(req.body);
    await scan.save();
    res.status(201).json({ success: true, scan });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/scans → Get all scans
router.get('/', async (req, res) => {
  try {
    const scans = await Scan.find().sort({ date: -1 });
    res.json(scans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;