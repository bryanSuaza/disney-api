const { Router } = require('express');
const { setRegister } = require('../controllers/auth.controller');

const router = Router();

router.post('/register', setRegister);


module.exports = router;