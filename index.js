"use strict";
/**
 * MIT License
 *
 * Copyright (c) 2024 Masato Nakatsuji
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinuetServerModuleLogger = exports.MinuetLogger = void 0;
const fs = require("fs");
const path = require("path");
const minuet_server_1 = require("minuet-server");
class MinuetLogger {
    constructor(options) {
        this.tempDir = "logs";
        this.logs = [
            {
                name: "access",
                path: "access-{year}-{month}.log",
                format: "{datetime}:{millisecond} {remote-address} {host} {request-url} {method} {referer}",
            },
        ];
        if (options) {
            if (options.tempDir != undefined)
                this.tempDir = options.tempDir;
            if (options.logs != undefined)
                this.logs = options.logs;
        }
    }
    write(writeName, req, res, message) {
        let init;
        for (let n = 0; n < this.logs.length; n++) {
            const logger = this.logs[n];
            if (logger.name == writeName) {
                init = logger;
                break;
            }
        }
        if (!init) {
            return;
        }
        const filePath = this.format(this.tempDir + "/" + init.path, req, res, message);
        ;
        const output = this.format(init.format, req, res, message);
        (() => {
            if (!fs.existsSync(path.dirname(filePath)))
                fs.mkdirSync(path.dirname(filePath));
            fs.appendFile(filePath, output + "\n", () => { });
        })();
    }
    format(format, req, res, message) {
        const d_ = new Date();
        const datetime = d_.getFullYear() + "/" + ("0" + (d_.getMonth() + 1)).slice(-2) + "/" + ("0" + d_.getDate()).slice(-2)
            + " " + ("0" + d_.getHours()).slice(-2) + ":" + ("0" + d_.getMinutes()).slice(-2) + ":" + ("0" + d_.getSeconds()).slice(-2);
        format = format.split("{datetime}").join(datetime);
        format = format.split("{year}").join(d_.getFullYear().toString());
        format = format.split("{month}").join(("0" + (d_.getMonth() + 1)).slice(-2).toString());
        format = format.split("{date}").join(("0" + d_.getDate()).slice(-2).toString());
        format = format.split("{hour}").join(("0" + d_.getHours()).slice(-2).toString());
        format = format.split("{minute}").join(("0" + d_.getMinutes()).slice(-2).toString());
        format = format.split("{second}").join(("0" + d_.getSeconds()).slice(-2).toString());
        format = format.split("{millisecond}").join(("000" + d_.getMilliseconds().toString()).slice(-4));
        format = format.split("{method}").join(req.method);
        format = format.split("{host}").join(req.headers.host);
        format = format.split("{content-length}").join(req.headers["content-length"]);
        format = format.split("{request-url}").join(req.url);
        format = format.split("{remote-address}").join(req.socket.remoteAddress);
        format = format.split("{referer}").join(req.headers.referer);
        format = format.split("{user-agent}").join(req.headers["user-agent"]);
        if (res.statusCode) {
            format = format.split("{status-code}").join(res.statusCode.toString());
        }
        else {
            format = format.split("{status-code}").join("200");
        }
        if (res.statusMessage) {
            format = format.split("{status-message}").join(res.statusMessage.toString());
        }
        else {
            format = format.split("{status-code}").join("");
        }
        format = format.split("{message}").join(message);
        return format;
    }
}
exports.MinuetLogger = MinuetLogger;
class MinuetServerModuleLogger extends minuet_server_1.MinuetServerModuleBase {
    onBegin() {
        let init = this.init;
        if (!init.tempDir) {
            init.tempDir = "logs";
        }
        init.tempDir = this.sector.root + "/" + init.tempDir;
        this.logger = new MinuetLogger(init);
    }
    write(writeName, req, res, message) {
        this.logger.write(writeName, req, res, message);
    }
}
exports.MinuetServerModuleLogger = MinuetServerModuleLogger;
