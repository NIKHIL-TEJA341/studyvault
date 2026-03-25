const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        // Create unique filename: fieldname-timestamp.ext
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /pdf|jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Images and PDFs only!'));
    }
}

const upload = multer({
    storage,
    // limits: { fileSize: 10000000 }, // 10MB limit (optional)
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// Upload route
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }
    // Return the path relative to the server root, which will be served statically
    res.send(`/${req.file.filename}`);
});

module.exports = router;
