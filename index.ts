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