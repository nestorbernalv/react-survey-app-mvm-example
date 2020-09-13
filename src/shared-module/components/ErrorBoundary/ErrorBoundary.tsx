import * as React from 'react';
import { eventBus, subscribe } from 'mobx-event-bus2';

/** Stylesheet Imports */
import './ErrorBoundary.scss';
import appEnvironment from 'enviroments/env-handler';
import exceptionService from 'core-module/services/exception/exception-service';
import RedirectElement from 'shared-module/components/RedirectElement/RedirectElement';

export interface Props {
	children?: React.ReactNode,
	boundaryId: string
}
export interface State {
	hasError: boolean, 
	error: any
}

export default class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			hasError: false,
			error: null
		}
		eventBus.register(this)
	}

	@subscribe('boundary-error-event-bus')
	errorBoundaryListener (event: any) {
		if (event.payload.boundaryId === this.props.boundaryId) {
			this.setState({
				hasError: true,
				error: exceptionService.getFullStringFromErrorObject(event.payload.error)
			});
		}
	}

	static getDerivedStateFromError(error: any) {
		// Update state so the next render will show the fallback UI.
		return { error: exceptionService.getFullStringFromErrorObject(error), hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="cmp-error-boundary">
					<div className="title">
						Ha ocurrido un error.
					</div>
					<div className="emoticon error">:-(</div>
					{
						process.env.NODE_ENV === 'development' && 
						<div className="error-trace">
							<strong>Traza > </strong> {this.state.error} <br/>
							{
								appEnvironment.enableConsoleLogs && 
								<strong>Para ver mas detalles del error puede consultar outputs en Consola y/o consultar los logs remotos. </strong> 
								
							}
						</div>
					}
					<div className="cta-container">
						<RedirectElement type={'link-button'} cssClass={'light-blue-button btn'} hrefLink={'to-home'}/>
					</div>
				</div>
			);
		}
		return this.props.children; 
	}
}
