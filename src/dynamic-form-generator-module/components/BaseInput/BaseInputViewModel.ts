import { observable, action } from "mobx";
import { subscribe, eventBus } from "mobx-event-bus2";


import STermsTranslatorService from 'core-module/services/terms-translator/terms-translator-service';

export class BaseInputViewModel {

    termsTranslatorService: STermsTranslatorService;

    formUuid: string;
    required: boolean;
    label: string;
    inputType: string;
    rows?: number;
    @observable currentValue: any;
    @observable onChange: Function;
    @observable validationHandler: {
        hasError: boolean,
        errorType: string,
        errorMessage: string
    }
    boundaryId: string;
    fieldId: string;

    constructor(props: any) {
        this.fieldId = '';
        this.required = false; 
        this.label = '';
        this.inputType = 'text';
        this.currentValue = null;
        this.boundaryId = '';
        this.validationHandler = {
            hasError: false,
            errorType: '',
            errorMessage: ''
        }
        this.formUuid = '';
        this.onChange = ()=>{};
        this.updateContext(props);
        this.termsTranslatorService = new STermsTranslatorService('country');
        eventBus.register(this);
    }

    @action
    updateContext = (props: any) => {
        Object.assign(this, props);
    }

    @action
    updateValue = (e: any) => {
        this.currentValue = e.target.value;
        this.handleValidationRules();
        this.onChange(this.fieldId, this.currentValue);
    }

    @action
    handleValidationRules = () => {
        if (this.required === true && this.currentValue === null) {
            this.validationHandler.hasError = true;
            this.validationHandler.errorType = 'required';
            this.termsTranslatorService.translate('form-generator', 'requiredFieldErrorMessage')
			.then((message: string) => {
				this.validationHandler.errorMessage = message;
			})
			.catch((error: any) => {
                this.validationHandler.errorMessage = '';
            });
        } else {
            this.validationHandler.hasError = false;
            this.validationHandler.errorType = '';
            this.validationHandler.errorMessage = '';
        }
    }

    @subscribe('base-form-event-bus')
	baseFormListener (event: any) {
		if (event.payload.formUuid === this.formUuid && event.payload.status === 'error') {
			this.handleValidationRules();
		}
	}


}