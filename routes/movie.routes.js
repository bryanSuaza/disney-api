const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { createMovie, updateMovie } = require("../controllers/movie.controller");

const router = Router();

// router.get('/', [validateJWT], getCharacters);

// router.get('/search', [validateJWT], searchCharacter);

/* router.get('/:character_id', [ 
    check('character_id', 'El id es obligatorio').not().isEmpty(),
    check('character_id', 'El id debe ser un número').isNumeric(),
    validateFields,
    validateJWT 
], getCharacterDetail); */


router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('rating', 'La calificacón es obligatoria').not().isEmpty(),
    check('gender_id', 'El id del genero es obligatorio').not().isEmpty(),
    validateFields,
    validateJWT
], createMovie);

router.patch('/:movie_id', [ 
    check('movie_id', 'El id es obligatorio').not().isEmpty(),
    check('movie_id', 'El id debe ser un número entero').isNumeric(),
    validateFields,
    validateJWT 
], updateMovie);

/*router.delete('/:character_id', [ 
    check('character_id', 'El id es obligatorio').not().isEmpty(),
    check('character_id', 'El id debe ser un número').isNumeric(),
    validateFields,
    validateJWT 
], deleteCharacter); */

module.exports = router;