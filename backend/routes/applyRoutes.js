const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary');
const CloudinaryStorage = require('multer-storage-cloudinary'); // v2.2.1 exports the class directly

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cusoc_resumes',
    resource_type: 'auto', // 'auto' lets Cloudinary detect PDF/raw files correctly (v2 requirement)
    format: async (req, file) => 'pdf',
    transformation: [{ quality: 'auto:eco' }]
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB limit before compression
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: PDFs Only!');
    }
  }
});

const { submitContributor, submitMentor, submitProject, sendOtp, verifyOtp } = require('../controllers/applyController');

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/contributor', upload.single('resume'), submitContributor);
router.post('/mentor', upload.single('resume'), submitMentor);
router.post('/project', submitProject);

module.exports = router;
