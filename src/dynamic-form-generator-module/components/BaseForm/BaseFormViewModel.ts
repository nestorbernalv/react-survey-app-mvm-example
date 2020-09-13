import { observable, action } from "mobx";
import { eventBus } from "mobx-event-bus2";

import { IBaseFormViewModal } from "dynamic-form-generator-module/interfaces/IBaseFormViewModel";
import STermsTranslatorService from 'core-module/services/terms-translator/terms-translator-service';

export class BaseFormViewModel implements IBaseFormViewModal{

    termsTranslatorService: STermsTranslatorService;

    formId: string;
    @observable formTitle?: string | null;
    @observable formDescription?: string | null;
    @observable requiredFields? : string[];
    @observable fields? : any[] | null;
    @observable onResolveForm: Function;
    actions?: any[];
    boundaryId: string;
    @observable formData: any;
    @observable hasError: boolean;
    @observable errorMessage: string;
    uuid: string;
    scrollFunction: Function

    constructor(props: IBaseFormViewModal) {
        this.formId = ''; 
        this.formTitle = null;
        this.formDescription = null;
        this.requiredFields = [];
        this.fields = [];
        this.actions = [];
        this.boundaryId = '';
        this.hasError = false;
        this.errorMessage = '';
        this.uuid = '';
        this.scrollFunction = ()=>{};
        this.onResolveForm = ()=>{};
        this.termsTranslatorService = new STermsTranslatorService('country');
        this.updateContext(props);
    }

    @action
    updateContext = (props: IBaseFormViewModal) => {
        Object.assign(this, props);
        if (this.formTitle !== null) {
            eventBus.post('header-event-bus', {
                headerTitle: this.formTitle
            });
        }
        if (this.formData === undefined) {
            this.updateFormData();
        }
    }

    @action
    updateFormData = () => {
        if (this.fields !== undefined && this.fields !== null && this.formData === undefined) {
            this.formData = [];
            this.fields.map(
                (field, index) => {
                    this.formData[field.id] = field.currentValue;
                }
            );
        }
    }

    @action
    onUpdateFormValues = (fieldKey: string, currentValue: any) => {
        let value: number | string;
        if (isNaN(Number(currentValue))) {
            value = currentValue;
        } else {
            value = Number(currentValue);
        }
        this.formData[fieldKey] = value;
    }

    @action
    resolveForm = () => {
        let proceed: boolean = true;
        if (this.fields !== undefined && this.fields !== null && this.formData !== undefined) {
            
            this.fields.map(
                (field, index) => {
                    const fieldId: string = field.id;
                    Object.entries(this.formData).map(
                        ([key, value], indx, entries) => {
                            if (key === fieldId && field.required === true && value === null) {
                                proceed = false;
                            }
                        }
                    );
                }
            );
        }

        if(proceed) {
            this.hasError = false;
            this.onResolveForm(this.formData);
            this.scrollFunction();
        } else {
            this.termsTranslatorService.translate('form-generator', 'formErrorMessage')
            .then((message: string) => {
                this.errorMessage = message;
            })
            .finally(()=> {
                this.hasError = true;
                this.scrollFunction();
                eventBus.post('base-form-event-bus', {
                    formUuid: this.uuid,
                    status: 'error'
                });
            });
            
        }
    }

    @action
    rejectBaseForm = () => {
    }

    

}