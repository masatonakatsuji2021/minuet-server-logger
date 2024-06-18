"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const minuet_server_logger_1 = require("minuet-server-logger");
const mlogger = new minuet_server_logger_1.MinuetLogger();
const h = http.createServer((req, res) => {
    mlogger.write("access", req, res);
    res.end();
});
h.listen(8855);
console.log("Listen http://localhost:8855");
