const jwt = require('jsonwebtoken')
const user = require('../models/user.model');

const validateJWT = async(req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Ususario no autorizado'
        })
    }

    try {
        const { user_id } = jwt.verify(token, process.env.PRIVATEKEYUUID);

        //leer el usuario que corresponde a user_id
        const userAuth = await user.findByPk(user_id);

        if (!userAuth.lenght) {
            res.status(401).json({
                msg: 'Token no valido'
            });
            return;
        }

        //verificar si el user_id tiene estado true
        if (!userAuth[0].status) {
            res.status(401).json({
                msg: "Token es valido, el usuario está inhabilitado"
            });
            return;
        }
        req.userAuth = userAuth;
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
        throw new Error(`Ocurrio una inconsistencia ${error}`);
    }


}

module.exports = {
    validateJWT
}