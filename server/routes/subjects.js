const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const Material = require('../models/Material'); // To cascade delete
const { protect } = require('../middleware/authMiddleware');

// @desc    Get subjects
// @route   GET /api/subjects
// @access  Private
router.get('/', protect, async (req, res) => {
    const subjects = await Subject.find({ user: req.user.id });
    res.status(200).json(subjects);
});

// @desc    Set subject
// @route   POST /api/subjects
// @access  Private
router.post('/', protect, async (req, res) => {
    if (!req.body.title || !req.body.code) {
        res.status(400).json({ message: 'Please add title and code' });
        return;
    }

    const { title, code, iconName, color, textColor } = req.body;

    const subject = await Subject.create({
        user: req.user.id,
        title,
        code,
        iconName,
        color,
        textColor
    });

    res.status(200).json(subject);
});

// @desc    Update subject
// @route   PUT /api/subjects/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
        res.status(400).json({ message: 'Subject not found' });
        return;
    }

    // Check for user
    if (!req.user) {
        res.status(401).json({ message: 'User not found' });
        return;
    }

    // Make sure the logged in user matches the subject user
    if (subject.user.toString() !== req.user.id) {
        res.status(401).json({ message: 'User not authorized' });
        return;
    }

    const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedSubject);
});

// @desc    Delete subject
// @route   DELETE /api/subjects/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
        res.status(400).json({ message: 'Subject not found' });
        return;
    }

    // Check for user
    if (!req.user) {
        res.status(401).json({ message: 'User not found' });
        return;
    }

    // Make sure the logged in user matches the subject user
    if (subject.user.toString() !== req.user.id) {
        res.status(401).json({ message: 'User not authorized' });
        return;
    }

    await subject.deleteOne();

    // Also delete materials for this subject
    await Material.deleteMany({ subject: req.params.id });

    res.status(200).json({ id: req.params.id });
});

module.exports = router;
