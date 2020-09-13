import * as React from 'react';

/** Component Imports */
import './Survey.scss';
import SurveyRouting from './SurveyRouting';

export interface Props {
	children?: React.ReactNode,
	boundaryId: string
}

export interface State {
}

export default class Survey extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props)

		this.state = {
		}
	}

	render() {
		return (
			<div className="cmp-survey">
                <SurveyRouting boundaryId={this.props.boundaryId}/>
			</div>
		)
	}
}
