const { QueryTypes } = require("sequelize")
const db = require("../database/connection")

const getCharacterDetailDB = async(character_id) => {
    const select = `SELECT 
                        c.name, 
                        c.image, 
                        c.age, 
                        c.weight, 
                        c.history,
                        c.createdAt,
                        c.updatedAt,
                        (SELECT GROUP_CONCAT(m.title SEPARATOR ',') FROM movie m, detail_movie_character d WHERE m.movie_id = d.movie_id AND d.character_id = c.character_id) AS movies
                    FROM \`character\` c WHERE c.character_id = ${character_id}`
    const responseQuery = await db.query(select, { type: QueryTypes.SELECT })

    if (responseQuery.length === 0) {
        return {};   
    }

    if(!responseQuery[0].movies){
        return {
            ...responseQuery[0],
            movies: []
        }
    }

    const moviesArray = responseQuery[0].movies.split(',');
    return {
        ...responseQuery[0],
        movies: moviesArray
    };
}

const getCharacterSearchDB = async(movieId) => {

    const select = `SELECT 
                        m.title,
                        (SELECT c.name FROM \`character\` c, detail_movie_character d WHERE c.character_id = d.character_id AND d.movie_id = m.movie_id) as name,
                        (SELECT c.history FROM \`character\` c, detail_movie_character d WHERE c.character_id = d.character_id AND d.movie_id = m.movie_id) as history
                    FROM movie m WHERE m.movie_id = ${movieId}`
    const responseQuery = await db.query(select, { type: QueryTypes.SELECT })
    return responseQuery;
}

const getMovieDetailDB = async(movie_id) => {
    const select = `SELECT 
                        m.title, 
                        m.image, 
                        m.rating, 
                        (SELECT g.name FROM gender g WHERE g.gender_id = m.gender_id) AS genero,
                        m.createdAt,
                        m.updatedAt,
                        (SELECT GROUP_CONCAT(c.name SEPARATOR ',') FROM \`character\` c, detail_movie_character d WHERE c.character_id = d.character_id AND d.movie_id = m.movie_id) AS characters
                    FROM movie m WHERE m.movie_id = ${movie_id}`
    const responseQuery = await db.query(select, { type: QueryTypes.SELECT })

    if (responseQuery.length === 0) {
        return {};   
    }

    if(!responseQuery[0].characters){
        return {
            ...responseQuery[0],
            characters: []
        }
    }

    const charactersArray = responseQuery[0].characters.split(',');
    return {
        ...responseQuery[0],
        characters: charactersArray
    };
}

module.exports = {
    getCharacterDetailDB,
    getCharacterSearchDB,
    getMovieDetailDB
}