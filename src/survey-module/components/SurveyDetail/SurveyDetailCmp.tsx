import * as React from 'react';
import { observer } from 'mobx-react';

/** Component Imports */
import {SurveyDetailViewModel } from './SurveyDetailViewModel';
import { SurveyDetailView } from './SurveyDetailView';
/** Component Interfaces */
export interface Props {
	match?: any,
	location?: any,
    boundaryId: string
}
/** Component Declaration */
@observer
export default class SurveyDetailCmp extends React.Component<Props, {}> {
	
	private surveyDetailViewModel: SurveyDetailViewModel;

	constructor(props: Props) {
		super(props);
		this.surveyDetailViewModel = new SurveyDetailViewModel({
			surveyId: this.props.match.params.surveyId
		});
	}

	render() { 
		return SurveyDetailView(this.surveyDetailViewModel, this.props.boundaryId);
	}
}

