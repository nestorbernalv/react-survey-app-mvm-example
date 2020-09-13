/* eslint-disable @typescript-eslint/no-useless-constructor */
import * as React from 'react';
import { BrowserRouter as AppRouter, Switch, Route, Redirect } from 'react-router-dom';

/** Components Imports */
import CustomDynamicImporter from 'shared-module/components/CustomDynamicImporter';
import OverlaySpinner from 'shared-module/components/OverlaySpinner';

/** Components Interfaces */
export interface Props {
	boundaryId: string
}
export interface State {}
/** Components Declaration */
export default class AppRouting extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<AppRouter>
					<Switch>
						<Route path="/encuesta" component={()=>
							<CustomDynamicImporter 
							load={() => import('survey-module/Survey')} 
							componentProps={{
								boundaryId: this.props.boundaryId
							}} >
								{(Component: any, props: any) => Component === null
								? <OverlaySpinner/>
								: <Component {...props} />}
							</CustomDynamicImporter>
						}/>
						<Redirect from="/" to="/encuesta" />
					</Switch>
				</AppRouter>
			</React.Fragment>
		)
	}
}