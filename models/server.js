const express = require('express');
const db = require('../database/connection');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.auth = '/v1/auth';
        this.character = '/v1/characters';
        this.movie = '/v1/movies';
        this.connectionDB();
        this.middlewares();
        this.swagger();
        this.routes();
        this.server = require('http').createServer(this.app);
    }

    async connectionDB() {
        try {
            await db.authenticate();
            console.log('Established connection database');
        } catch (error) {
            throw new Error(error)
        }
    }

    middlewares() {

        //cors
        this.app.use(cors());

        //lectura del body
        this.app.use(express.json());
    }

    swagger(){
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }

    routes () {
        this.app.use(this.auth, require('../routes/auth.routes'));
        this.app.use(this.character, require('../routes/character.routes'));
        this.app.use(this.movie, require('../routes/movie.routes'));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Run server in port', this.port)
        })
    }

}

module.exports = Server;