import * as http from "http";
import { MinuetLogger } from "minuet-server-logger";

const mlogger = new MinuetLogger();

const h = http.createServer((req, res) => {
    mlogger.write("access", req, res);
    res.end();
});
h.listen(8855);
console.log("Listen http://localhost:8855");