const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  // accept image files only
  if (
  file.mimetype.startsWith('image/') ||
  file.mimetype.startsWith('video/')
) {
  cb(null, true);
} else {
  cb(new Error('Only image or video files are allowed'), false);
}

};

const upload = multer({ storage, fileFilter });

module.exports = upload;
