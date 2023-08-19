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


/**
 * @swagger
 * /v1/characters:
 *   get:
 *     summary: Obtener personajes
 *     parameters:
 *       - in: header
 *         name: x-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de autenticación
 *     responses:
 *       200:
 *         description: lista de personajes
 */
router.get('/', [validateJWT], getCharacters);


/**
 * @swagger
 * /v1/characters/search?query:
 *   get:
 *     summary: Buscar personajes
 *     parameters:
 *       - in: header
 *         name: x-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de autenticación
 *     responses:
 *       200:
 *         description: información del personaje
 */
router.get('/search', [validateJWT], searchCharacter);


/**
 * @swagger
 * /v1/characters/:character_id:
 *   get:
 *     summary: Obtener detalles del personaje
 *     parameters:
 *       - in: header
 *         name: x-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de autenticación
 *     responses:
 *       200:
 *         description: información del personaje detallado
 */
router.get('/:character_id', [ 
    check('character_id', 'El id es obligatorio').not().isEmpty(),
    check('character_id', 'El id debe ser un número').isNumeric(),
    validateFields,
    validateJWT 
], getCharacterDetail);


/**
 * @swagger
 * /v1/characters:
 *   post:
 *     summary: Crear personaje
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
 *             properties:
 *               name:
 *                 type: string
 *               image: 
 *                 type: string
 *               age:
 *                 type: string
 *               weight:
 *                 type: string
 *               history:
 *                 type: string
 *     responses:
 *       200:
 *         description: información del personaje creado
 */
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('age', 'La edad es obligatoria').not().isEmpty(),
    check('weight', 'El peso es obligatorio').not().isEmpty(),
    check('history', 'La historia es obligatoria').not().isEmpty(),
    validateFields,
    validateJWT
], createCharacter);


/**
 * @swagger
 * /v1/characters/:character_id:
 *   patch:
 *     summary: Actualizar personaje
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
 *             properties:
 *               name:
 *                 type: string
 *               image: 
 *                 type: string
 *               age:
 *                 type: string
 *               weight:
 *                 type: string
 *               history:
 *                 type: string
 *     responses:
 *       200:
 *         description: información del personaje actualizado
 */
router.patch('/:character_id', [ 
    check('character_id', 'El id es obligatorio').not().isEmpty(),
    check('character_id', 'El id debe ser un número').isNumeric(),
    validateFields,
    validateJWT 
], updateCharacter);

/**
 * @swagger
 * /v1/characters/:character_id:
 *   delete:
 *     summary: Eliminar personaje
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
router.delete('/:character_id', [ 
    check('character_id', 'El id es obligatorio').not().isEmpty(),
    check('character_id', 'El id debe ser un número').isNumeric(),
    validateFields,
    validateJWT 
], deleteCharacter);

module.exports = router;