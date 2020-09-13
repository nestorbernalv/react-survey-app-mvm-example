import * as React from 'react';
import { observer } from 'mobx-react';

/** Component Imports */
import { InterpreterView } from './InterpreterView';
import { InterpreterViewModel } from './InterpreterViewModel';
/** Component Interfaces */
export interface Props {
    boundaryId: string,
	jsonSchema: any,
	uiSchema: any,
	dataSchema?: any,
	productionMode: boolean,
	onSaveEvent?: Function
}
/** Component Declaration */
@observer
export class InterpreterCmp extends React.Component<Props, {}> {
	
	private interpreterViewModel: InterpreterViewModel;

	constructor(props: Props) {
		super(props);
		this.interpreterViewModel = new InterpreterViewModel({
			jsonSchema: this.props.jsonSchema,
			uiSchema: this.props.uiSchema,
			dataSchema: this.props.dataSchema ? this.props.dataSchema : undefined,
			boundaryId: this.props.boundaryId,
			productionMode: this.props.productionMode,
			onSaveEvent: this.props.onSaveEvent
		});
	}

	render() {
		return InterpreterView(this.interpreterViewModel, this.props.boundaryId);
	}
}
