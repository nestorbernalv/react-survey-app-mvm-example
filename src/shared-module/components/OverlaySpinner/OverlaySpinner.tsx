import * as React from 'react';
import { Spinner } from 'reactstrap';

/** Stylesheet Imports */
import './OverlaySpinner.scss';

export interface Props {
}
export interface State {}
export default class OverlaySpinner extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props)

		this.state = {
		}
	}

	render() {
		return (
			<div className="cmp-overlay-spinner fade-in">
				<Spinner style={{ width: '3rem', height: '3rem' }} />
			</div>
		)
	}
}
