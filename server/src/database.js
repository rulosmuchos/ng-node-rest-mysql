"use strict";
exports.__esModule = true;
var promise_mysql_1 = require("promise-mysql");
var keys_1 = require("./keys");
var pool = promise_mysql_1["default"].createPool(keys_1["default"].database);
pool.getConnection()
    .then(function (connection) {
    pool.releaseConnection(connection);
    console.log('DB is Connected');
});
exports["default"] = pool;
