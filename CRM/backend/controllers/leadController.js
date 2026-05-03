const Lead = require('../models/Lead');

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Private
exports.createLead = async (req, res) => {
    try {
        // Add user to req.body
        req.body.user = req.user.id;
        
        const lead = await Lead.create(req.body);
        res.status(201).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all leads for logged in user
// @route   GET /api/leads
// @access  Private
exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find({ user: req.user.id }).sort('-createdAt');
        res.status(200).json({ success: true, count: leads.length, data: leads });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update lead status
// @route   PATCH /api/leads/:id/status
// @access  Private
exports.updateLeadStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['New', 'Contacted', 'Converted'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        let lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }

        // Make sure user owns the lead
        if (lead.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to update this lead' });
        }

        lead = await Lead.findByIdAndUpdate(req.params.id, { status }, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Add note to lead
// @route   POST /api/leads/:id/notes
// @access  Private
exports.addLeadNote = async (req, res) => {
    try {
        const { text } = req.body;
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }

        // Make sure user owns the lead
        if (lead.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to update this lead' });
        }

        lead.notes.push({ text });
        await lead.save();

        res.status(200).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
