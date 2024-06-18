"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinuetServerModuleLogger = exports.MinuetLogger = void 0;
const fs = require("fs");
const minuet_server_1 = require("minuet-server");
const path = require("path");
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
        if (res.statusCode)
            format = format.split("{status-code}").join(res.statusCode.toString());
        if (res.statusMessage)
            format = format.split("{status-message}").join(res.statusMessage.toString());
        format = format.split("{message}").join(message);
        return format;
    }
}
exports.MinuetLogger = MinuetLogger;
class MinuetServerModuleLogger extends minuet_server_1.MinuetServerModuleBase {
    onBegin() {
        let init = this.init;
        this.logger = new MinuetLogger(init);
    }
    write(writeName, req, res, message) {
        this.logger.write(writeName, req, res, message);
    }
}
exports.MinuetServerModuleLogger = MinuetServerModuleLogger;
