import express, { Router } from 'express';
const jwt = require('jsonwebtoken');

import categoriesController from '../controllers/categoriesController';

class CategoriessRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/',  categoriesController.list);
    }

}

export default new CategoriessRoutes().router;

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
