import * as React from 'react';
import { observer } from 'mobx-react';

/** Component Imports */
import {SurveyMasterViewModel } from './SurveyMasterViewModel';
import { SurveyMasterView } from './SurveyMasterView';
/** Component Interfaces */
export interface Props {
	match?: any,
	location?: any,
    boundaryId: string
}
/** Component Declaration */
@observer
export default class SurveyMasterCmp extends React.Component<Props, {}> {
	
	private surveyMasterViewModel: SurveyMasterViewModel;

	constructor(props: Props) {
		super(props);
		this.surveyMasterViewModel = new SurveyMasterViewModel({
			//surveyId: this.props.match.params.surveyId
		});
	}

	render() { 
		return SurveyMasterView(this.surveyMasterViewModel, this.props.boundaryId);
	}
}

