import { observable, action } from "mobx";
import { subscribe, eventBus } from "mobx-event-bus2";

export class HeaderViewModel {
    
    @observable headerTitle?: string;

    constructor(props: any) {
        this.headerTitle = '';
        this.updateContext(props);

        eventBus.register(this);
    }

    @action
    updateContext = (props: any) => {
        Object.assign(this, props);
    }


    @subscribe('header-event-bus')
    @action
	headerListener (event: any) {
		if (event.payload.headerTitle !== this.headerTitle ) {
			this.headerTitle = event.payload.headerTitle;
		}
	}

    

}