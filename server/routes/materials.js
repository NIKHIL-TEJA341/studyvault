const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get materials
// @route   GET /api/materials
// @access  Private
router.get('/', protect, async (req, res) => {
    const materials = await Material.find({ user: req.user.id });
    res.status(200).json(materials);
});

// @desc    Set material
// @route   POST /api/materials
// @access  Private
router.post('/', protect, async (req, res) => {
    const { subject, type, title, link, date, size, duration, domain } = req.body;

    if (!subject || !type || !title || !link || !date) {
        res.status(400).json({ message: 'Please add all required fields' });
        return;
    }

    const material = await Material.create({
        user: req.user.id,
        subject,
        type,
        title,
        link,
        date,
        size,
        duration,
        domain
    });

    res.status(200).json(material);
});

// @desc    Update material
// @route   PUT /api/materials/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
    const material = await Material.findById(req.params.id);

    if (!material) {
        res.status(400).json({ message: 'Material not found' });
        return;
    }

    // Check for user
    if (!req.user) {
        res.status(401).json({ message: 'User not found' });
        return;
    }

    // Make sure the logged in user matches the material user
    if (material.user.toString() !== req.user.id) {
        res.status(401).json({ message: 'User not authorized' });
        return;
    }

    const updatedMaterial = await Material.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedMaterial);
});

// @desc    Delete material
// @route   DELETE /api/materials/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    const material = await Material.findById(req.params.id);

    if (!material) {
        res.status(400).json({ message: 'Material not found' });
        return;
    }

    // Check for user
    if (!req.user) {
        res.status(401).json({ message: 'User not found' });
        return;
    }

    // Make sure the logged in user matches the material user
    if (material.user.toString() !== req.user.id) {
        res.status(401).json({ message: 'User not authorized' });
        return;
    }

    await material.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = router;
