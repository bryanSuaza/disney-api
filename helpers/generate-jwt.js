const jwt = require('jsonwebtoken')

const generateJWT = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.PRIVATEKEYUUID, {
            expiresIn: '12h'
        }, (error, token) => {
            if (error) {
                console.log(error)
                reject('No se puedo generar el token de acceso');
            } else {
                resolve(token)
            }
        });
    })
}

module.exports = {
    generateJWT
}