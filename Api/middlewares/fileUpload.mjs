import multer from 'multer';

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where the uploaded files will be stored
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

// Define file filter to restrict file types if needed
const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error('Only JPEG and PNG images are allowed'), false);
  }
};

// Configure multer middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Export the middleware for use in routes
export default upload;
