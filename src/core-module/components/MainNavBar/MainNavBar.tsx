import * as React from 'react';
import AutofactNavBarLogo from 'shared-module/assets/images/logo-autofact-blanco.png';

/** Stylesheet Imports */
import './MainNavBar.scss';

export interface Props {
	children?: React.ReactNode
}

export interface State {
}

export default class MainNavBar extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props)

		this.state = {
		}
	}

	render() {
		return (
			<div className="cmp-main-navbar">
				<img className="autofact-logo" alt="" src={AutofactNavBarLogo} />
			</div>
		)
	}
}
