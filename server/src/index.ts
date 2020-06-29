import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import productsRoutes from './routes/productsRoutes';
import usersRoutes from './routes/usersRoutes';
import uploadRoutes from './routes/uploadRoutes';



class Server {

    public app: Application;
    
    constructor() {
        this.app = express();
        this.app.use('/',express.static('public'));
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 8002);
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
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();