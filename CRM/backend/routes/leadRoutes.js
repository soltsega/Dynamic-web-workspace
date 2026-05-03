const express = require('express');
const router = express.Router();
const {
    createLead,
    getLeads,
    updateLeadStatus,
    addLeadNote
} = require('../controllers/leadController');

const { protect } = require('../middleware/auth');

router.route('/')
    .post(protect, createLead)
    .get(protect, getLeads);

router.patch('/:id/status', protect, updateLeadStatus);
router.post('/:id/notes', protect, addLeadNote);

module.exports = router;
