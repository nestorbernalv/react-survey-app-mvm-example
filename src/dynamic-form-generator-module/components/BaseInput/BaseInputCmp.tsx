import * as React from 'react';
import { observer } from 'mobx-react';

/** Component Imports */
import { BaseInputViewModel } from './BaseInputViewModel';
import { BaseInputView } from './BaseInputView';


/** Component Interfaces */
export interface Props {
    formUuid: string,
    fieldId: string,
    boundaryId: string,
    label: string,
    currentValue: any,
    required: boolean,
    onChange: Function,
    inputType: string,
    rows?: number
}
/** Component Declaration */
@observer
export class BaseInputCmp extends React.Component<Props, {}> {
	
	private baseInputViewModel: BaseInputViewModel;
    
    constructor(props: Props) {
        super(props);
        this.baseInputViewModel = new BaseInputViewModel({
            formUuid: this.props.formUuid,
            fieldId: this.props.fieldId,
            boundaryId: this.props.boundaryId,
            label: this.props.label,
            currentValue: this.props.currentValue,
            required: this.props.required,
            onChange: this.props.onChange,
            inputType: this.props.inputType,
            rows: this.props.rows
        });
    }

	render() { 
		return BaseInputView(this.baseInputViewModel);
	}
}
