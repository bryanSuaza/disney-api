const express = require('express');
const mongoose = require('mongoose');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.auth = '/v1/auth';
        this.connectionDB();
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