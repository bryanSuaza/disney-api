const movie = require("../models/movie.model");

const getMovieId = async() => {
    let movieId = 1;
    const movies = await movie.findAll();

    if(movies.length > 0){
        movieId = movies[movies.length - 1].movie_id + 1;
    }
    return movieId;
}

const createMovie = async(req = required, res = response) => {
    const { title } = req.body;

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

        const newMovie = await movie.create({
            movie_id: movieId,
            ...req.body
        })

        res.status(200).json({
            success: true,
            movie: newMovie
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(`Ocurrio una inconsistencia ${error}`);
    }
}

const updateMovie = async(req = required, res = response) => {
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

        await movie.update({ ...req.body }, { where: { movie_id } }); 

        const updatedMovieData = await movie.findOne({
            where: { movie_id }
        });

        res.status(200).json({
            success: true,
            character: updatedMovieData
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
    createMovie,
    updateMovie
}