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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinuetServerModuleLogger = exports.MinuetLogger = void 0;
const minuet_server_1 = require("minuet-server");
class MinuetLogger {
    constructor(options) {
        this.loggers = [];
        this.loggers = options;
    }
    write(writeName, message) {
    }
}
exports.MinuetLogger = MinuetLogger;
class MinuetServerModuleLogger extends minuet_server_1.MinuetServerModuleBase {
    onRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
}
exports.MinuetServerModuleLogger = MinuetServerModuleLogger;
