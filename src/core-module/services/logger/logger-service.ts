import appEnvironment from "enviroments/env-handler";


class LoggerService {
    
    private static instance: LoggerService;
    private currentEnvironment: string;

    private constructor() {
        this.currentEnvironment = process.env.NODE_ENV;
    }

    static getInstance = () => {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }

    generateTrace = (level: string, message: string) => {
        if (appEnvironment.enableConsoleLogs) {
            this.printToConsole(level, message);
        }
        if (appEnvironment.useRemoteLoggerStore) {
            //TODO Must implement send logs to remote server according to value of "appEnvironment.remoteLoggerStoreUrl"
        }
    }

    private printToConsole = (level: string, message: string) => {
        switch (level) {
            case 'error':
                console.error(message);
            break;
            case 'warning':
                console.warn(message);
            break;
            case 'info':
                console.info(message);
            break;
        }
    }
}

const loggerService: LoggerService = LoggerService.getInstance();
export default loggerService;