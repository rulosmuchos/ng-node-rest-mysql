"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var database_1 = require("../database");
var jwt = require('jsonwebtoken');
var ProductsController = /** @class */ (function () {
    function ProductsController() {
    }
    ProductsController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].query('SELECT * FROM products WHERE createdby = ? ORDER BY created_at DESC', [req.payload._id])];
                    case 1:
                        products = _a.sent();
                        res.json(products);
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.getOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, database_1["default"].query('SELECT * FROM products WHERE id = ?', [id])];
                    case 1:
                        products = _a.sent();
                        console.log(products.length);
                        if (products.length > 0) {
                            return [2 /*return*/, res.json(products[0])];
                        }
                        res.status(404).json({ text: "The product doesn't exits" });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.body.createdby = req.payload._id;
                        return [4 /*yield*/, database_1["default"].query('INSERT INTO products set ?', [req.body])];
                    case 1:
                        result = _a.sent();
                        console.log(req.body);
                        res.json({ message: 'Product Saved' });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, oldProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        oldProduct = req.body;
                        return [4 /*yield*/, database_1["default"].query('UPDATE products set ? WHERE id = ?', [req.body, id])];
                    case 1:
                        _a.sent();
                        res.json({ message: "The product was Updated" });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype["delete"] = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, database_1["default"].query('DELETE FROM products WHERE id = ?', [id])];
                    case 1:
                        _a.sent();
                        // await pool.query('UPDATE products SET enable = IF(enable=1, 0, 1) WHERE ID = ?;', [id]);
                        res.json({ message: "The product was deleted" });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.enable = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        // await pool.query('DELETE FROM products WHERE id = ?', [id]);
                        return [4 /*yield*/, database_1["default"].query('UPDATE products SET enable = IF(enable=1, 0, 1) WHERE ID = ?;', [id])];
                    case 1:
                        // await pool.query('DELETE FROM products WHERE id = ?', [id]);
                        _a.sent();
                        res.json({ message: "The product was toggled enabled" });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.trash = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        // await pool.query('UPDATE products SET status = "trash" WHERE ID = ?;', [id]);
                        return [4 /*yield*/, database_1["default"].query('UPDATE products SET enable = IF(enable=1, 0, 1) WHERE ID = ?;', [id])];
                    case 1:
                        // await pool.query('UPDATE products SET status = "trash" WHERE ID = ?;', [id]);
                        _a.sent();
                        res.json({ message: "The product was sent to trash" });
                        return [2 /*return*/];
                }
            });
        });
    };
    return ProductsController;
}());
var productsController = new ProductsController;
exports["default"] = productsController;
