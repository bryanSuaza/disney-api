const { Router } = require('express');
const { setRegister, setLogin } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

/**
 * @swagger
 * /v1/auth/register:
 *   post:
 *     summary: Registrar usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *               username: 
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 */
router.post('/register',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('username', 'El username es obligatorio').not().isEmpty(),
    validateFields
], setRegister);

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               username: 
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: x-token parametro que se debe enviar en la cabecera para las demás peticiones
 */
router.post('/login', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
],setLogin);


module.exports = router;