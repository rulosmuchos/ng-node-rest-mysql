"use strict";
exports.__esModule = true;
var express_1 = require("express");
var productsController_1 = require("../controllers/productsController");
var jwt = require('jsonwebtoken');
var ProductsRoutes = /** @class */ (function () {
    function ProductsRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    ProductsRoutes.prototype.config = function () {
        this.router.get('/', verifyToken, productsController_1["default"].list);
        this.router.get('/:id', productsController_1["default"].getOne);
        this.router.post('/', verifyToken, productsController_1["default"].create);
        this.router.put('/:id', productsController_1["default"].update);
        this.router["delete"]('/:id', productsController_1["default"]["delete"]);
    };
    return ProductsRoutes;
}());
exports["default"] = new ProductsRoutes().router;
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('unauthorize');
    }
    var token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('unauthorize');
    }
    var payload = jwt.verify(token, 'secretKey');
    req.payload = payload;
    next();
}
