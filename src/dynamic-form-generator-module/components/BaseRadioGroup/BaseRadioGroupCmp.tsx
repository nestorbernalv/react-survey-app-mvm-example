import * as React from 'react';
import { observer } from 'mobx-react';

/** Component Imports */
import { BaseRadioGroupView } from './BaseRadioGroupView';
import { BaseRadioGroupViewModel } from './BaseRadioGroupViewModel';


/** Component Interfaces */
export interface Props {
    formUuid: string,
    fieldId: string,
    boundaryId: string,
    label: string,
    items: any[],
    currentValue: any,
    required: boolean,
    onChange: Function
}
/** Component Declaration */
@observer
export class BaseRadioGroupCmp extends React.Component<Props, {}> {
	
	private baseRadioGroupViewModel: BaseRadioGroupViewModel;
    
    constructor(props: Props) {
        super(props);
        this.baseRadioGroupViewModel = new BaseRadioGroupViewModel({
            formUuid: this.props.formUuid,
            fieldId: this.props.fieldId,
            boundaryId: this.props.boundaryId,
            label: this.props.label,
            items: this.props.items,
            currentValue: this.props.currentValue,
            required: this.props.required,
            onChange: this.props.onChange
        });
    }

	render() { 
		return BaseRadioGroupView(this.baseRadioGroupViewModel);
	}
}
