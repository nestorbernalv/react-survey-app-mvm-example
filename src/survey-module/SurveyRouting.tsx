/* eslint-disable @typescript-eslint/no-useless-constructor */
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

/** Components Imports */
import SurveyMasterCmp from './components/SurveyMaster/SurveyMasterCmp';
import ErrorBoundary from 'shared-module/components/ErrorBoundary';
import CustomDynamicImporter from 'shared-module/components/CustomDynamicImporter';
import OverlaySpinner from 'shared-module/components/OverlaySpinner';
/** Components Interfaces */
export interface Props {
	boundaryId: string
}
export interface State {}
/** Components Declaration */
export default class SurveyRouting extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
	}

	render() {
		const boundaryId: string = 'survey-boundary';
		return (
			<React.Fragment>
				<ErrorBoundary boundaryId={boundaryId}>
					<Switch>
						<Route path="/encuesta/:surveyId" render={routeProps => (
							<CustomDynamicImporter 
							load={() => import('./components/SurveyDetail/SurveyDetailCmp')} 
							componentProps={{
								boundaryId: this.props.boundaryId,
								...routeProps
							}} >
								{(Component: any, props: any) => Component === null
								? <OverlaySpinner/>
								: <Component {...props} />}
							</CustomDynamicImporter>
						)}/>
						<Route path="/encuesta" render={routeProps => (
							<SurveyMasterCmp boundaryId={boundaryId} {...routeProps} />)
						}/>
					</Switch>
				</ErrorBoundary>
			</React.Fragment>
		)
	}
}