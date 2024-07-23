const multer = require("multer");
const path = require("path");

// Function to sanitize the filename
const sanitizeFilename = (filename) => {
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
};

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const sanitizedFilename = sanitizeFilename(file.originalname);
    cb(null, `${Date.now()}-${sanitizedFilename}`);
  },
});

// File filter to validate file types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: File type not supported!");
  }
};

// Initialize multer with the defined storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
