import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import productsRoutes from './routes/productsRoutes';
import usersRoutes from './routes/usersRoutes';
import uploadRoutes from './routes/uploadRoutes';
import categoriesRoutes from './routes/categoriesRoutes';
 './routes/categoriesRoutes';
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
        this.app.use('/api/categories', categoriesRoutes);
        this.app.use('*',express.static('static'));
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