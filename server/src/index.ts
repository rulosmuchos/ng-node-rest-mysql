import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import productsRoutes from './routes/productsRoutes';
import usersRoutes from './routes/usersRoutes';
import uploadRoutes from './routes/uploadRoutes';
const fs = require('fs');
const http = require('http');
const https = require('https');



class Server {

    public app: Application;
    private options = {
        // key: fs.readFileSync('./ssl/privatekey.pem'),
        // cert: fs.readFileSync('./ssl/certificate.pem'),
        // Certificate
        key : fs.readFileSync('/etc/letsencrypt/live/app.avellanedacompras.com/privkey.pem', 'utf8'),
        cert : fs.readFileSync('/etc/letsencrypt/live/app.avellanedacompras.com/cert.pem', 'utf8'),
        ca : fs.readFileSync('/etc/letsencrypt/live/app.avellanedacompras.com/chain.pem', 'utf8')
    };

    constructor() {
        this.app = express();
        this.app.use('/',express.static('static'));
        // this.app.use('*',express.static('static'));
        this.app.use('*',express.static('static'));
        this.app.use('/public',express.static('public'));
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 80);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        // this.app.use('/', indexRoutes);
        this.app.use('/api/products', productsRoutes);
        this.app.use('/api/users', usersRoutes);
        this.app.use('/upload', uploadRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('HTTP Express server listening on port', this.app.get('port'));
        });
        var port = 443; //this.app.get('port') + 1;
        var server = https.createServer(this.options, this.app).listen(port, function(){
            console.log("HTTPS Express server listening on port" , port);
          });
    }

}

const server = new Server();
server.start();

/* 

// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

app.use((req, res) => {
	res.send('Hello there !');
});

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

*/
