"use strict";
exports.__esModule = true;
var express_1 = require("express");
var jwt = require('jsonwebtoken');
var usersController_1 = require("../controllers/usersController");
var UsersRoutes = /** @class */ (function () {
    function UsersRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    UsersRoutes.prototype.config = function () {
        // this.router.get('/', usersController.list);
        // this.router.get('/profile', verifyToken, usersController.findOne);
        this.router.post('/signin', usersController_1["default"].signin);
        this.router.post('/', usersController_1["default"].create);
        this.router.put('/:id', verifyToken, usersController_1["default"].update);
        this.router["delete"]('/:id', verifyToken, usersController_1["default"]["delete"]);
    };
    return UsersRoutes;
}());
exports["default"] = new UsersRoutes().router;
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
