"use strict";
exports.__esModule = true;
var express_1 = require("express");
var morgan_1 = require("morgan");
var cors_1 = require("cors");
var productsRoutes_1 = require("./routes/productsRoutes");
var usersRoutes_1 = require("./routes/usersRoutes");
var uploadRoutes_1 = require("./routes/uploadRoutes");
var categoriesRoutes_1 = require("./routes/categoriesRoutes");
'./routes/categoriesRoutes';
var fs = require('fs');
var http = require('http');
var https = require('https');
var Server = /** @class */ (function () {
    function Server() {
        this.options = {
            // key: fs.readFileSync('./ssl/privatekey.pem'),
            // cert: fs.readFileSync('./ssl/certificate.pem'),
            // Certificate
            key: fs.readFileSync('/etc/letsencrypt/live/app.avellanedacompras.com/privkey.pem', 'utf8'),
            cert: fs.readFileSync('/etc/letsencrypt/live/app.avellanedacompras.com/cert.pem', 'utf8'),
            ca: fs.readFileSync('/etc/letsencrypt/live/app.avellanedacompras.com/chain.pem', 'utf8')
        };
        this.app = express_1["default"]();
        this.app.use('/', express_1["default"].static('static'));
        this.app.use('/public', express_1["default"].static('public'));
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        this.app.set('port', process.env.PORT || 80);
        this.app.use(morgan_1["default"]('dev'));
        this.app.use(cors_1["default"]());
        this.app.use(express_1["default"].json());
        this.app.use(express_1["default"].urlencoded({ extended: false }));
    };
    Server.prototype.routes = function () {
        // this.app.use('/', indexRoutes);
        this.app.use('/api/products', productsRoutes_1["default"]);
        this.app.use('/api/users', usersRoutes_1["default"]);
        this.app.use('/upload', uploadRoutes_1["default"]);
        this.app.use('/api/categories', categoriesRoutes_1["default"]);
        this.app.use('*', express_1["default"].static('static'));
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log('HTTP Express server listening on port', _this.app.get('port'));
        });
        var port = 443; //this.app.get('port') + 1;
        var server = https.createServer(this.options, this.app).listen(port, function () {
            console.log("HTTPS Express server listening on port", port);
        });
    };
    return Server;
}());
var server = new Server();
server.start();
