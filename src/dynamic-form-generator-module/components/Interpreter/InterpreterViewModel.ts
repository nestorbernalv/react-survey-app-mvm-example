import { observable, action } from "mobx";
//import uuidv1 from "uuid";
import uuidv1  from "uuid/v1";

import { IInterpreteViewModal } from "dynamic-form-generator-module/interfaces/IInterpreterViewModel";
import STermsTranslatorService from 'core-module/services/terms-translator/terms-translator-service';
//import termsTranslatorService from "core-module/services/terms-translator/terms-translator-service";

export class InterpreterViewModel implements IInterpreteViewModal{

    termsTranslatorService: STermsTranslatorService;

    @observable jsonSchema: any;
    @observable uiSchema: any;
    @observable dataSchema?: any;
    @observable throwErrorInvalidSchema?: boolean;
    @observable baseFormProperties: any;
    @observable productionMode: boolean;
    @observable onSaveEvent: Function;
    @observable invalidStatusTitle: string;
    @observable invalidStatusSubTitle: string;
    boundaryId: string;
    formUuid: string;

    constructor(props: IInterpreteViewModal) {
        this.jsonSchema = null;
        this.uiSchema = null;
        this.throwErrorInvalidSchema = true;
        this.baseFormProperties = null;
        this.boundaryId = '';
        this.productionMode = false;
        this.invalidStatusTitle = '';
        this.invalidStatusSubTitle = '';
        this.formUuid = uuidv1();
        this.onSaveEvent = ()=>{};
        this.termsTranslatorService = new STermsTranslatorService('country');
        this.updateContext(props);
    }

    @action
    updateContext = (props: IInterpreteViewModal) => {
        Object.assign(this, props);
        if (this.jsonSchema !== undefined && this.jsonSchema !== null && this.jsonSchema.type) {
            this.throwErrorInvalidSchema = false;
            this.interpreteBaseForm();
        } else {
            this.termsTranslatorService.translate('form-generator', 'invalidStatusTitle')
            .then((message: string) => {console.log('message ', message);
                this.invalidStatusTitle = message;
                return 'OK';
            })
            .then((success: any) => {
                this.termsTranslatorService.translate('form-generator', 'invalidStatusSubTitle')
                .then((message: string) => {
                    this.invalidStatusSubTitle = message;
                    this.throwErrorInvalidSchema = true;
                })
            });
        }
    }

    @action
    interpreteBaseForm = () => {
        this.baseFormProperties = {
            id: this.jsonSchema.stringKey,
            title: this.jsonSchema.title !== undefined ? this.jsonSchema.title : undefined,
            description: this.jsonSchema.description !== undefined ? this.jsonSchema.description : undefined,
            requiredFields: this.jsonSchema.required !== undefined ? this.jsonSchema.required : undefined,
            actions: this.jsonSchema.actions !== undefined ? this.jsonSchema.actions : undefined
        }
        if (this.jsonSchema.properties !== undefined && Object.entries(this.jsonSchema.properties).length > 0) {
            let fields: any[] = Object.entries(this.jsonSchema.properties).map(
                ([key, value], index, entries) => {
                    const fieldValue: any = value;
                    let field: any = {
                        id: key,
                        label: fieldValue.title,
                        position: fieldValue.position
                    };
                    if (fieldValue.questionId !== undefined && fieldValue.questionId !== null) {
                        field.questionId = fieldValue.questionId;
                    }
                    if (fieldValue.surveyQuestionId !== undefined && fieldValue.surveyQuestionId !== null) {
                        field.surveyQuestionId = fieldValue.surveyQuestionId;
                    }
                    if(this.jsonSchema.required !== undefined && this.jsonSchema.required.length > 0) {
                        let requiredFields: string[] = this.jsonSchema.required;
                        field.required = requiredFields.find((element) => {
                            return element === key
                        }) !== undefined ? true : false;
                    }
                    if(this.uiSchema !== null) {
                        Object.entries(this.uiSchema).map(
                            ([id, val], index, entrs) => {
                                if (id === key) {
                                    const value: any = val;
                                    field.uiWidget = value['ui:widget'];
                                    if (field.uiWidget === 'textarea') {
                                        field.rows = value['rows'] ? value['rows'] : 4;
                                    }
                                }
                                return true;
                            });
                    }
                    if(this.dataSchema !== undefined && this.dataSchema[key] !== undefined) {
                        field.currentValue = this.dataSchema[key];
                    } else {
                        field.currentValue = null;
                    }
                    switch(fieldValue.type) {
                        case 'array':
                            field.multipleOptions = true;
                            field.multipleChoice = fieldValue.multipleChoice;
                            field.options = [];
                            if (fieldValue.items !== undefined && fieldValue.items.length > 0) {
                                let options: any = fieldValue.items.map((item: any, index: number)=>{
                                    const tempItem: any = {
                                        text: item.title,
                                        value: item.optionId,
                                        valueType: item.type
                                    }
                                    return tempItem;
                                });
                                field.options = options;
                            }
                        break;
                        case 'string':
                            //nothing for the moment
                        break;
                    }
                    return field;
                }
            );
            if (fields.length > 0) {
                fields.sort((a: any, b: any) : any => {
                    if (a.position > b.position) {
                        return 1;
                      }
                      if (a.position < b.position) {
                        return -1;
                      }
                      return 0;
                });
                this.baseFormProperties.fields = fields;
            }
        }
    }

    @action 
    resolveBaseForm =(data: any) => {
        if (this.productionMode === true) {
            let resp: any = {
                feedbackElementId: null,
                questions: [],
                user: null,
                dataschema_reference: Object.fromEntries(Object.entries(data))
            }
            //questions
            let questions: any[] = [];
            if (data !== undefined && data !== null) {
                Object.entries(data).map(
                    ([key, value], index, entries) => {
                        let question: any = {
                            questionId: null,
                            surveyQuestionId: null,
                            answers: []
                        };
                        if (this.jsonSchema.properties !== undefined) {
                            Object.entries(this.jsonSchema.properties).map(
                                ([pos, val], indx: number, collect: any)=> {
                                    if (pos === key) {
                                        let properties: any = val;
                                        question.questionId = properties.questionId;
                                        question.surveyQuestionId = properties.surveyQuestionId;
                                        if (properties.type === 'array') {
                                            if (properties.multipleChoice === false) {
                                                question.answers.push({
                                                    optionId: value,
                                                    value: null
                                                });
                                            } else {

                                            }
                                        }
                                        if (properties.type === 'string') {
                                            question.answers.push({
                                                optionId: null,
                                                value: value
                                            });
                                        }
                                    }
                                }
                            );
                        }
                        questions.push(question);
                    }
                );
            }
            resp.questions = questions;
            this.onSaveEvent(resp);
        }
    }

    

}