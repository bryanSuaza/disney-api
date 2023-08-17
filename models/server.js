const express = require('express');
const db = require('../database/connection');
const cors = require('cors')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.auth = '/v1/auth';
        this.connectionDB();
        this.middlewares()
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


    routes () {
        this.app.use(this.auth, require('../routes/auth.routes'));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Run server in port', this.port)
        })
    }

}

module.exports = Server;