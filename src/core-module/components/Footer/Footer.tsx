import * as React from 'react';

/** Component Imports */
import './Footer.scss';
import AutofactFooterLogo from 'shared-module/assets/images/logo-autofact-blanco.png';

/** Component Interfaces */
export interface Props {
	children?: React.ReactNode;
}
export interface State {}

export default class Footer extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props)

		this.state = {
		}
	}

	render() {
		return (
			<div className="cmp-footer">
				<div className="container">
					<div className="logo-container">
						<img src={AutofactFooterLogo} className="autofact-logo" alt="Logo Autofact" />
					</div>
				</div>
			</div>
		)
	}
}
