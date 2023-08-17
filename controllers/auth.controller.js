const { response } = require('express');


const setRegister = async(req, res = response) => {

    try {
        //validamos si existe el usuario
        
        if(!products){
            res.status(404).json({
                products: [],
                success: false
            });
        }
    
        res.status(200).json({
            products,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

module.exports = {
    getProducts
}
