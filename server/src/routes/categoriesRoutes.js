"use strict";
exports.__esModule = true;
var express_1 = require("express");
var jwt = require('jsonwebtoken');
var categoriesController_1 = require("../controllers/categoriesController");
var CategoriessRoutes = /** @class */ (function () {
    function CategoriessRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    CategoriessRoutes.prototype.config = function () {
        this.router.get('/', categoriesController_1["default"].list);
    };
    return CategoriessRoutes;
}());
exports["default"] = new CategoriessRoutes().router;
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
