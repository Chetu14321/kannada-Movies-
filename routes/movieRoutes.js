const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getAllMovies,
  getMovie,
  addMovie,
  deleteMovie,
} = require('../controllers/movieController');


router.post(
  '/add',
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'poster', maxCount: 1 },
  ]),
  addMovie
);


router.get('/getall', getAllMovies);
router.get('/:id', getMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
