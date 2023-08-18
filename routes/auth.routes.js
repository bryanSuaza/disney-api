const { Router } = require('express');
const { setRegister, setLogin } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/register',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('username', 'El username es obligatorio').not().isEmpty(),
    validateFields
], setRegister);

router.post('/login', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
],setLogin);


module.exports = router;