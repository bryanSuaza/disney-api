const { response, required } = require('express');
const user = require('../models/user.model');

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
        throw new Error(`Ocurrio una inconsistencia ${error}`);
    }
}

module.exports = {
    setRegister
}
