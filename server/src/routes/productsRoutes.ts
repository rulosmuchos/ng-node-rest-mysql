import express, { Router } from 'express';

import productsController from '../controllers/productsController';

const jwt = require('jsonwebtoken');


class ProductsRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/',verifyToken, productsController.list);
        this.router.get('/:id', productsController.getOne);
        this.router.post('/',verifyToken, productsController.create);
        this.router.put('/:id', productsController.update);
        this.router.delete('/:id', productsController.delete);
    }

}

export default new ProductsRoutes().router;

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

