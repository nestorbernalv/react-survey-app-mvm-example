import { observable, action } from 'mobx';

import { ISurveyViewModel } from 'survey-module/interfaces/ISurveyViewModel';

export class SurveyMasterViewModel {
    
    @observable proccesing: boolean;
    @observable status: string;
    
    
    constructor(props: any) {
        this.proccesing = false;
        this.status = 'initial';
        this.updateContext(props);
    }

    @action
    updateContext = (props: ISurveyViewModel) => {
        Object.assign(this, props);
    }

}