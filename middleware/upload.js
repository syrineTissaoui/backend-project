const multer = require('multer');
const path = require('path');

// Define the storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Ensure this path is correct
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Example: filename will have a timestamp
  }
});

// Create the multer instance with storage settings
const upload = multer({ storage });

module.exports = upload;
