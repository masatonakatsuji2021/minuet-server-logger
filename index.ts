import { IncomingMessage, ServerResponse } from "http";
import { MinuetServerModuleBase } from "minuet-server";

export interface MinuetLoggerOption {
    name: string,
    path: string,
    format: string,
}

export class MinuetLogger {

    private loggers : Array<MinuetLoggerOption> = [];

    public constructor(options? : Array<MinuetLoggerOption>) {
        this.loggers = options;
    }

    public write(writeName : string, message : string) {

    }

}

export class MinuetServerModuleLogger extends MinuetServerModuleBase {

    public async onRequest(req: IncomingMessage, res: ServerResponse): Promise<boolean> {

        return false;
    }

}