import express, { Router } from 'express';
const jwt = require('jsonwebtoken');

import usersController from '../controllers/usersController';

class UsersRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', usersController.list);
        // this.router.get('/profile', verifyToken, usersController.findOne);
        this.router.post('/signin',usersController.signin)
        this.router.post('/', usersController.create);
        this.router.put('/:id', usersController.update);
        this.router.delete('/:id', usersController.delete);
    }

}

 

export default new UsersRoutes().router;

function verifyToken(req:any, res:any, next:Function) {
    if(!req.headers.authorization){
        return res.status(401).send('unauthorize');
    } 

    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null'){
        return res.status(401).send('unauthorize');
    }
    const payload = jwt.verify(token, 'secretKey');
    req.payload = payload;

    next();
}