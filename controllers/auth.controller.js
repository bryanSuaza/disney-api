const { response, required } = require('express');
const user = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt');

const getUserId = async() => {
    let userId = 1;
    const users = await user.findAll();

    if(users.length > 0){
        userId = users[users.length - 1].user_id + 1;
    }

    return userId;
}

const setRegister = async(req = required, res = response) => {

    const { name, username, email, state } = req.body;

    try {
        const currentUser = await user.findAll({
            where: {
                username,
                email,
                name
            }
        });

        if(currentUser.length > 0){
            res.status(400).json({
                success: false,
                message: 'Ya existe un usuario con las misma caracteristicas',
            })
            return;
        }

        const userId = await getUserId();

        const newUser = await user.create({
            user_id: userId,
            state: state || 1,
            ...req.body
        })

        res.status(200).json({
            success: true,
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(`Ocurrio una inconsistencia ${error}`);
    }
}

const setLogin = async(req = required, res = response) => {
    const { username, email, password } = req.body;

    try {
        let currentUser = [];

        if(username){
            currentUser = await user.findAll({
                where: { password, username }
            });
        }

        if(email){
            currentUser = await user.findAll({
                where: { password, email }
            });
        }

        if(!currentUser.length){
            res.status(404).json({
                success: false,
                message: 'Datos incorrectos por favor verifica',
            });
            return;
        }

        const payloadJWT = {
            user_id: currentUser[0].user_id,
            name: currentUser[0].name,
            email: currentUser[0].email,
            username: currentUser[0].username
        }

        //generar el JWT
        const token = await generateJWT(payloadJWT);

        res.status(200).json({
            success: true,
            x_token: token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(`Ocurrio una inconsistencia ${error}`);
    }
}

module.exports = {
    setRegister,
    setLogin
}
