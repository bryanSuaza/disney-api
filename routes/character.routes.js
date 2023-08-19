const { Router } = require("express");
const { 
    createCharacter, 
    updateCharacter, 
    getCharacters, 
    getCharacterDetail, 
    deleteCharacter,
    searchCharacter
} = require("../controllers/character.controller");
const { validateJWT } = require("../middlewares/validate-jwt");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.get('/', [validateJWT], getCharacters);

router.get('/search', [validateJWT], searchCharacter);

router.get('/:character_id', [ 
    check('character_id', 'El id es obligatorio').not().isEmpty(),
    check('character_id', 'El id debe ser un número').isNumeric(),
    validateFields,
    validateJWT 
], getCharacterDetail);


router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('age', 'La edad es obligatoria').not().isEmpty(),
    check('weight', 'El peso es obligatorio').not().isEmpty(),
    check('history', 'La historia es obligatoria').not().isEmpty(),
    validateFields,
    validateJWT
], createCharacter);

router.patch('/:character_id', [ 
    check('character_id', 'El id es obligatorio').not().isEmpty(),
    check('character_id', 'El id debe ser un número').isNumeric(),
    validateFields,
    validateJWT 
], updateCharacter);

router.delete('/:character_id', [ 
    check('character_id', 'El id es obligatorio').not().isEmpty(),
    check('character_id', 'El id debe ser un número').isNumeric(),
    validateFields,
    validateJWT 
], deleteCharacter);

module.exports = router;