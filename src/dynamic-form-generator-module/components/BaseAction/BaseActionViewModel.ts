import { observable, action } from "mobx";

import { IBaseActionViewModal } from "dynamic-form-generator-module/interfaces/IBaseActionViewModel";


export class BaseActionViewModel implements IBaseActionViewModal{

    boundaryId: string;
    @observable text?: string;
    clickEvent: Function;

    constructor(props: IBaseActionViewModal) {
        this.boundaryId = '';
        this.text = 'OK';
        this.clickEvent = () => {};
        this.updateContext(props);
    }

    @action
    updateContext = (props: IBaseActionViewModal) => {
        Object.assign(this, props);
    }

    @action
    onClick = (e: any) =>{
        e.preventDefault();
        this.clickEvent();
    }

    

}