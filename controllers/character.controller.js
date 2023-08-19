const { response, required } = require('express');
const character = require('../models/character.model');
const { getCharacterDetailDB, getCharacterSearchDB } = require('../helpers/queries');
const { Op } = require('sequelize');

const getCharacterId = async() => {
    let characterId = 1;
    const characters = await character.findAll();

    if(characters.length > 0){
        characterId = characters[characters.length - 1].character_id + 1;
    }
    return characterId;
}

const createCharacter = async(req = required, res = response) => {
    const { name } = req.body;

    try {
        const currentCharacter = await character.findAll({
            where: { name }
        });

        if(currentCharacter.length > 0){
            res.status(400).json({
                success: false,
                message: 'Ya existe un personaje con el mismo nombre',
            })
            return;
        }

        const characterId = await getCharacterId();

        const newCharacter = await character.create({
            character_id: characterId,
            ...req.body
        })

        res.status(200).json({
            success: true,
            character: newCharacter
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(`Ocurrio una inconsistencia ${error}`);
    }
}

const updateCharacter = async(req = required, res = response) => {
    const { character_id } = req.params;

    try {
        const currentCharacter = await character.findByPk(character_id);

        if(!currentCharacter){
            res.status(400).json({
                success: false,
                message: `No existe un personaje con el id ${character_id}`,
            })
            return;
        }

        await character.update({ ...req.body }, { where: { character_id } }); 

        const updatedCharacterData = await character.findOne({
            where: { character_id }
        });

        res.status(200).json({
            success: true,
            character: updatedCharacterData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(`Ocurrio una inconsistencia ${error}`);
    }
}

const getCharacters = async(req = required, res = response) => {
    try {
        const allCharacters = await character.findAll({
            attributes: ['image', 'name'],
        });

        res.status(200).json({
            success: true,
            characters: allCharacters
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(`Ocurrio una inconsistencia ${error}`);
    }
}

const getCharacterDetail = async(req = required, res = response) => {

    const { character_id } = req.params;

    try {
        const currentCharacter = await character.findByPk(character_id);

        if(!currentCharacter){
            res.status(400).json({
                success: false,
                message: `No existe un personaje con el id ${character_id}`,
            })
            return;
        }

        const characterDetail = await getCharacterDetailDB(character_id);

        res.status(200).json({
            success: true,
            character: characterDetail
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(`Ocurrio una inconsistencia ${error}`);
    }
}

const deleteCharacter = async(req = required, res = response) => {
    const { character_id } = req.params;

    try {
        const currentCharacter = await character.findByPk(character_id);

        if(!currentCharacter){
            res.status(400).json({
                success: false,
                message: `No existe un personaje con el id ${character_id}`,
            })
            return;
        }

        await character.destroy({
            where: { character_id }
        })
        
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(`Ocurrio una inconsistencia ${error}`);
    }
}

const searchCharacter = async(req = required, res = response) => {
    const { name, age, movies } = req.query;

    let characters = [];

    if(name){
        characters = await character.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })
    }

    if(age){
        characters = await character.findAll({
            where: {
                age: {
                    [Op.like]: `%${age}%`
                }
            }
        })
    }

    if(movies){
        characters = await getCharacterSearchDB(movies);
    }

    res.status(200).json({
        success: true,
        characters
    });
}

module.exports = {
    createCharacter,
    updateCharacter,
    getCharacters,
    getCharacterDetail,
    deleteCharacter,
    searchCharacter
}