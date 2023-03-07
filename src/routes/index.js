const express = require('express');
const actorsRouter = require('./actors.routes');
const directorRouter = require('./director.routes');
const genreRouter = require('./genre.routes');
const movieRouter = require('./movie.routes');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres', genreRouter),
router.use('/actors', actorsRouter),
router.use('/movies', movieRouter),
router.use('/directors', directorRouter)


module.exports = router;