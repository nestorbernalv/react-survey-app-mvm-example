import { eventBus } from 'mobx-event-bus2';
import { observable, action } from 'mobx';

import { ISurveySearchtemplate } from "survey-module/interfaces/ISurveySearchTemplate";
import { SurveyHttpService } from 'survey-module/services/survey-http-services';
import { ISurveyViewModel } from 'survey-module/interfaces/ISurveyViewModel';
import { FeedbackHttpService } from 'feedback-module/services/feedback-http-services';
import STermsTranslatorService from 'core-module/services/terms-translator/terms-translator-service';

export class SurveyDetailViewModel implements ISurveyViewModel{

    termsTranslatorService: STermsTranslatorService;
    
    @observable surveyId: string | number | null;
    @observable survey: any | null;
    @observable proccesing: boolean;
    @observable status: string;
    @observable doneStatusTitle: string;
    @observable doneStatusSubTitle: string;
    private surveyHttpService: SurveyHttpService;
    private feedbackHttpService: FeedbackHttpService;
    
    constructor(props: ISurveyViewModel) {
        this.surveyHttpService = new SurveyHttpService();
        this.feedbackHttpService = new FeedbackHttpService();
        this.surveyId = null;
        this.survey = null;
        this.proccesing = false;
        this.status = 'initial';
        this.doneStatusTitle = '';
        this.doneStatusSubTitle = '';
        this.termsTranslatorService = new STermsTranslatorService('country');
        this.updateContext(props);
    }

    @action
    updateContext = (props: ISurveyViewModel) => {
        Object.assign(this, props);
        this.getSurvey(this.surveyId);
    }

    @action
    getSurvey = (surveyId: string | number | null) => {	
        let finalSurveyId: number | string | null = !isNaN(Number(surveyId)) ?  Number(surveyId) : surveyId;
        let searchTemplate: ISurveySearchtemplate = {
            enabled: true
        };
        if (typeof finalSurveyId === 'number') {
            searchTemplate.id = finalSurveyId;
        } else if(typeof finalSurveyId === 'string') {
            searchTemplate.keyString = finalSurveyId;
        }

        this.surveyHttpService.getSurveys(searchTemplate)
        .then((survey) => {
            this.survey = survey;
        })
        .catch((error) => {
            eventBus.post('boundary-error-event-bus', {
                boundaryId: 'survey-boundary',
                status: 'error',
                error: error
            });
        });
    }

    @action
    saveSurvey = (data: any) => {
        if (data !== undefined && data !== null && this.survey !== undefined && this.survey !== null) {
            this.proccesing = true;
            data.feedbackElementId = this.survey.id;
            this.feedbackHttpService.saveFeedback(data, 'POST')
            .then((feedback) => {
                this.status = 'done';
                this.termsTranslatorService.translate('survey', 'surveyDoneTitle')
                .then((message: string) => {
                    this.doneStatusTitle = message;
                    return 'ok';
                })
                .then((succes: any) => {
                    this.termsTranslatorService.translate('survey', 'surveyDoneSubTitle')
                    .then((message: string) => {
                        this.doneStatusSubTitle = message;
                    });
                });
            })
            .catch((error) => {
                eventBus.post('boundary-error-event-bus', {
                    boundaryId: 'survey-boundary',
                    status: 'error',
                    error: error
                });
            })
            .finally(()=>{
                this.proccesing = false;
            });
        }
    }

}