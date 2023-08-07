"use strict";
exports.__esModule = true;
var express_1 = require("express");
var multer_1 = require("multer");
var ROOT_PATH = "/home/app/v1/ng-node-rest-mysql/server/";
var URL_PATH = "https://app.avellanedacompras.com/";
var UP_REL_PATH = "public/";
var UPLOAD_PATH = ROOT_PATH + UP_REL_PATH;
var UploadRoutes = /** @class */ (function () {
    function UploadRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    UploadRoutes.prototype.config = function () {
        var storage = multer_1["default"].diskStorage({
            destination: function (req, file, cb) {
                cb(null, UPLOAD_PATH);
            },
            filename: function (req, file, cb) {
                var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix);
            }
        });
        var fileFilter = function (req, file, cb) {
            if (file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg" ||
                file.mimetype === "image/png") {
                cb(null, true);
            }
            else {
                cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
            }
        };
        var upload = multer_1["default"]({ storage: storage, fileFilter: fileFilter });
        this.router.post('/', upload.single('file'), this.upHandling);
    };
    UploadRoutes.prototype.upHandling = function (req, res) {
        console.log(req.file.filename);
        var iurl = URL_PATH + UP_REL_PATH + req.file.filename;
        console.log(iurl);
        res.json({ filename: iurl });
    };
    return UploadRoutes;
}());
var uploadRoutes = new UploadRoutes();
exports["default"] = uploadRoutes.router;
