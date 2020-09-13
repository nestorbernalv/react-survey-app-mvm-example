import * as React from 'react';
import { observer } from 'mobx-react';

/** Component Imports */
import { BaseActionViewModel } from './BaseActionViewModel';
import { BaseActionView } from './BaseActionView';

/** Component Interfaces */
export interface Props {
    children?: React.ReactNode,
    boundaryId: string,
    text?: string,
    clickEvent: Function,
    cssClass: string
}
/** Component Declaration */
@observer
export class BaseActionCmp extends React.Component<Props, {}> {
	
	private baseActionViewModel: BaseActionViewModel;
    
    constructor(props: Props) {
        super(props);
        this.baseActionViewModel = new BaseActionViewModel({
            boundaryId: this.props.boundaryId,
            text: this.props.text,
            clickEvent: this.props.clickEvent
        });
    }

	render() { 
		return BaseActionView(this.baseActionViewModel, this.props.boundaryId, this.props.cssClass);
	}
}
