const { getMovieDetailDB } = require("../helpers/queries");
const character = require("../models/character.model");
const detail = require("../models/detail-movie-character.model");
const movie = require("../models/movie.model");

const getMovieId = async() => {
    let movieId = 1;
    const movies = await movie.findAll({
        paranoid: false
    });

    if(movies.length > 0){
        movieId = movies[movies.length - 1].movie_id + 1;
    }
    return movieId;
}

const getMovieDetailId = async() => {
    let detailMovieId = 1;
    const detailMovies = await detail.findAll();

    if(detailMovies.length > 0){
        detailMovieId = detailMovies[detailMovies.length - 1].detail_movie_character_id + 1;
    }
    return detailMovieId;
}

const getMovies = async(req = required, res = response) => {
    try {
        const allMovies = await movie.findAll({
            attributes: ['image', 'title', 'createdAt'],
        });

        res.status(200).json({
            success: true,
            movies: allMovies
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(`Ocurrio una inconsistencia ${error}`);
    }
}

const createMovie = async(req = required, res = response) => {
    const { title, characters } = req.body;

    try {
        const currentMovie = await movie.findAll({
            where: { title }
        });

        if(currentMovie.length > 0){
            res.status(400).json({
                success: false,
                message: 'Ya existe una pelicula con el mismo nombre',
            })
            return;
        }

        const movieId = await getMovieId();

        await movie.create({
            movie_id: movieId,
            ...req.body
        })

        if(characters && characters.length > 0){
            for(const representCharacter of characters){
                const movieDetailId = await getMovieDetailId();
                const currentCharacter = await character.findByPk(representCharacter);

                if(currentCharacter){
                    await detail.create({
                        detail_movie_character_id: movieDetailId,
                        character_id: representCharacter,
                        movie_id: movieId,
                    })
                }
            }
        }

        const movieDetail = await getMovieDetailDB(movieId);

        res.status(200).json({
            success: true,
            movie: movieDetail
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(`Ocurrio una inconsistencia al crear la pelicula ${error}`);
    }
}

const updateMovie = async(req = required, res = response) => {
    const { movie_id } = req.params;
    const { characters } = req.body;

    try {
        const currentMovie = await movie.findByPk(movie_id);

        if(!currentMovie){
            res.status(400).json({
                success: false,
                message: `No existe una pelicula con el id ${movie_id}`,
            })
            return;
        }

        await movie.update({ ...req.body }, { where: { movie_id } }); 

        if(characters && characters.length > 0){

            await detail.destroy({
                where: {
                    movie_id
                }
            })

            for(const representCharacter of characters){
                const movieDetailId = await getMovieDetailId();
                const currentCharacter = await character.findByPk(representCharacter);

                if(currentCharacter){
                    await detail.create({
                        detail_movie_character_id: movieDetailId,
                        character_id: representCharacter,
                        movie_id: movie_id,
                    })
                }
            }
        }

        const movieDetail = await getMovieDetailDB(movie_id);

        res.status(200).json({
            success: true,
            movie: movieDetail
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(`Ocurrio una inconsistencia ${error}`);
    }
}

const deleteMovie = async(req = required, res = response) => {
    const { movie_id } = req.params;

    try {
        const currentMovie = await movie.findByPk(movie_id);

        if(!currentMovie){
            res.status(400).json({
                success: false,
                message: `No existe una pelicula con el id ${movie_id}`,
            })
            return;
        }

        await movie.destroy({
            where: { movie_id }
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

const getMovieDetail = async(req = required, res = response) => {

    const { movie_id } = req.params;

    try {
        const currentMovie = await movie.findByPk(movie_id);

        if(!currentMovie){
            res.status(400).json({
                success: false,
                message: `No existe una pelicula con el id ${movie_id}`,
            })
            return;
        }

        const movieDetail = await getMovieDetailDB(movie_id);

        res.status(200).json({
            success: true,
            movie: movieDetail
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(`Ocurrio una inconsistencia ${error}`);
    }
}

const searchMovie = async(req = required, res = response) => {
    const { name, gender, order } = req.query;

    let movies = [];

    if(name){
        movies = await movie.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })
    }

    if(gender){
        movies = await movie.findAll({
            where: {
                gender_id: gender
            }
        })
    }

    if(order){
        movies = await movie.findAll({
            order: [
                ['createdAt', `${order}`]
            ]
        })
    }

    res.status(200).json({
        success: true,
        movies
    });
}

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovies,
    getMovieDetail,
    searchMovie
}