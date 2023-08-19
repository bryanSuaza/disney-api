const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {  
    createMovie, 
    updateMovie, 
    deleteMovie, 
    getMovies, 
    getMovieDetail, 
    searchMovie 
} = require("../controllers/movie.controller");

const router = Router();

/**
 * @swagger
 * /v1/movies:
 *   get:
 *     summary: Obtener película
 *     parameters:
 *       - in: header
 *         name: x-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de autenticación
 *     responses:
 *       200:
 *         description: lista de película
 */
router.get('/', [validateJWT], getMovies);

/**
 * @swagger
 * /v1/movies/search?query:
 *   get:
 *     summary: Buscar película
 *     parameters:
 *       - in: header
 *         name: x-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de autenticación
 *     responses:
 *       200:
 *         description: información de la película
 */
router.get('/search', [validateJWT], searchMovie);

/**
 * @swagger
 * /v1/movies/:movie_id:
 *   get:
 *     summary: Obtener detalles de la pelicula
 *     parameters:
 *       - in: header
 *         name: x-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de autenticación
 *     responses:
 *       200:
 *         description: información de la película detallado
 */
router.get('/:movie_id', [ 
    check('movie_id', 'El id es obligatorio').not().isEmpty(),
    check('movie_id', 'El id debe ser un número entero').isNumeric(),
    validateFields,
    validateJWT 
], getMovieDetail);


/**
 * @swagger
 * /v1/movies:
 *   post:
 *     summary: Crear película
 *     parameters:
 *       - in: header
 *         name: x-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image: 
 *                 type: string
 *               rating:
 *                 type: string
 *               gender_id:
 *                 type: string
 *               characters:
 *                 type: array
 *                 items: 
 *                      type: integer
 *     responses:
 *       200:
 *         description: información de la película creado
 */
router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('rating', 'La calificacón es obligatoria').not().isEmpty(),
    check('gender_id', 'El id del genero es obligatorio').not().isEmpty(),
    validateFields,
    validateJWT
], createMovie);

/**
 * @swagger
 * /v1/movies/:movie_id:
 *   patch:
 *     summary: Actualizar película
 *     parameters:
 *       - in: header
 *         name: x-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de autenticación
    *     requestBody:
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               title:
    *                 type: string
    *               image: 
    *                 type: string
    *               rating:
    *                 type: string
    *               gender_id:
    *                 type: string
    *               characters:
    *                 type: array
    *                 items: 
    *                      type: integer
 *     responses:
 *       200:
 *         description: información de la pelicula actualizada
 */
router.patch('/:movie_id', [ 
    check('movie_id', 'El id es obligatorio').not().isEmpty(),
    check('movie_id', 'El id debe ser un número entero').isNumeric(),
    validateFields,
    validateJWT 
], updateMovie);

/**
 * @swagger
 * /v1/movies/:movie_id:
 *   delete:
 *     summary: Eliminar película
 *     parameters:
 *       - in: header
 *         name: x-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de autenticación
 *     responses:
 *       200:
 *         description: información del personaje eliminado
 */
router.delete('/:movie_id', [ 
    check('movie_id', 'El id es obligatorio').not().isEmpty(),
    check('movie_id', 'El id debe ser un número').isNumeric(),
    validateFields,
    validateJWT 
], deleteMovie);

module.exports = router;