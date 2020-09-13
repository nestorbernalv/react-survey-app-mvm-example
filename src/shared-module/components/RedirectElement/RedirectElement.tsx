import * as React from 'react';

/** Stylesheet Imports */
import './RedirectElement.scss';
import STermsTranslatorService from 'core-module/services/terms-translator/terms-translator-service';

export interface Props {
	type?: string,
	cssClass?: string,
	clickEvent?: Function,
	hrefLink: string
}

export interface State {
	redirectHref: string,
	redirectText: string
}

export default class RedirectElement extends React.Component<Props, State> {

	termsTranslatorService: STermsTranslatorService;

	constructor(props: Props) {
		super(props);
		this.state = {
			redirectHref: '',
			redirectText: ''
		}
		this.termsTranslatorService = new STermsTranslatorService('country');
	}

	async componentDidMount() {
		if (this.props.type === 'link-button' && this.props.hrefLink === 'to-home') {
			return this.termsTranslatorService.translate('app', 'autofactHomeUrl')
			.then((success: string) => {
				this.setState({
					redirectHref: success
				});
				return 'ok';
			})
			.then((success) => {
				this.termsTranslatorService.translate('app', 'redirectTextToHome')
				.then((success: string) => {
					this.setState({
						redirectText: success
					});
				})
			})
		}
	}

	render() {
		let redirectElement: any = '';
		switch(this.props.type) {
			case 'link-button':
					redirectElement = <a className={ this.props.cssClass ? this.props.cssClass : ''} href={this.state.redirectHref}>
						{this.state.redirectText}
					</a>
			break;
		}
		return (
			<div className="cmp-redirect-element">
				{redirectElement}
			</div>
		)
	}
}
