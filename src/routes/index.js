const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const journalRoutes = require('./journalRoutes');
const analysisRoutes = require('./analysisRoutes');

router.use('/auth', authRoutes);
router.use('/journal', journalRoutes);
router.use('/analyze', analysisRoutes);

module.exports = router; 