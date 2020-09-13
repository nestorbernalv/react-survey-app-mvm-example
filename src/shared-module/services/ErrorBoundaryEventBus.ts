import { observable, action } from 'mobx';

class ErrorBoundaryEventBus {
    private static instance: ErrorBoundaryEventBus;
    @observable
    private subject: any;

    private constructor() {
        this.subject = null;
    }

    static getInstance() {
        if (!ErrorBoundaryEventBus.instance) {
            ErrorBoundaryEventBus.instance = new ErrorBoundaryEventBus();
        }
        return ErrorBoundaryEventBus.instance;
    }

    susbcribe = () => {

    }

    @action
    update = (subject: any) => {
        if (this.subject !== subject) {
            this.subject = subject;
        }
    }
}
export const errorBoundaryEventBus: ErrorBoundaryEventBus = ErrorBoundaryEventBus.getInstance();
//export default {errorBoundaryEventBus};