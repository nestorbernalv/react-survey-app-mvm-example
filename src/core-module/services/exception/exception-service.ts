
import loggerService from 'core-module/services/logger/logger-service';

class ExceptionService {

    private static instance: ExceptionService;

    private constructor() {
    }

    static getInstance = () => {
        if (!ExceptionService.instance) {
            ExceptionService.instance = new ExceptionService();
        }
        return ExceptionService.instance;
    }

    handleException = (error: any | string) => {
        let message = typeof error === 'string' ? error : this.getFullStringFromErrorObject(error);
        loggerService.generateTrace('error', message);
    }

    getFullStringFromErrorObject = (error: any) : string => {
        let errorString : string = error.message;
        if (error.response) {
            errorString += ' > ' + error.response.data.message;
        }
		return errorString;
    }
}

const exceptionService: ExceptionService = ExceptionService.getInstance();
export default exceptionService;