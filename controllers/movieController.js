const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Movie = require('../models/Movie');

// Setup Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Store uploaded videos in the "uploads" directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Use a unique filename
    }
});

const upload = multer({ storage: storage });

// POST: Add a new movie (including file upload)
const addMovie = async (req, res) => {
    const { title, description, genre, thumbnailUrl, duration, rating } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'No video file uploaded' });
    }

    const newMovie = new Movie({
        title,
        description,
        genre,
        videoUrl: req.file.path,  // Save the path of the uploaded video
        thumbnailUrl,
        duration,
        rating
    });

    try {
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        console.error('Error adding movie:', err);
        res.status(500).json({ error: 'Something went wrong while adding the movie.' });
    }
};

// GET: Get all movies
const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (err) {
        console.error('Error fetching movies:', err);
        res.status(500).json({ error: 'Something went wrong while fetching movies.' });
    }
};

// GET: Get a movie by its ID
const getMovieById = async (req, res) => {
    const { movieId } = req.params;

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (err) {
        console.error('Error fetching movie:', err);
        res.status(500).json({ error: 'Something went wrong while fetching the movie.' });
    }
};

// DELETE: Delete a movie by ID
const deleteMovie = async (req, res) => {
    const { movieId } = req.params;

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Delete the movie file from the local storage
        fs.unlinkSync(movie.videoUrl);  // Delete the video file from disk

        // Delete the movie record from the database
        await movie.remove();
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (err) {
        console.error('Error deleting movie:', err);
        res.status(500).json({ error: 'Something went wrong while deleting the movie.' });
    }
};

// GET: Stream a movie video file
const streamMovie = async (req, res) => {
    const { movieId } = req.params;

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Set the correct content type (video/mp4 for example)
        res.setHeader('Content-Type', 'video/mp4');
        const videoPath = movie.videoUrl;

        // Check if the video file exists
        fs.stat(videoPath, (err, stats) => {
            if (err || !stats.isFile()) {
                return res.status(404).json({ error: 'Video file not found' });
            }

            const range = req.headers.range;
            if (!range) {
                return res.status(400).json({ error: 'Range header is required' });
            }

            // Parse the range (e.g., "bytes=0-1023")
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;

            // Set the range of bytes to send
            const chunkSize = end - start + 1;
            const fileStream = fs.createReadStream(videoPath, { start, end });

            res.status(206);  // Partial content status code
            res.setHeader('Content-Range', `bytes ${start}-${end}/${stats.size}`);
            res.setHeader('Content-Length', chunkSize);

            fileStream.pipe(res);
        });
    } catch (err) {
        console.error('Error streaming movie:', err);
        res.status(500).json({ error: 'Something went wrong while streaming the video.' });
    }
};

module.exports = {
    upload,
    addMovie,
    getAllMovies,
    getMovieById,
    deleteMovie,
    streamMovie
};
