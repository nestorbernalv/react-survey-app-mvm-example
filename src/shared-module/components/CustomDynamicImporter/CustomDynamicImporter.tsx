import * as React from 'react';


export interface Props {
	children?: any,
	load: Function,
	componentProps: any
}

export interface State {
	component: React.Component | null
}

export default class CustomDynamicImporter extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props)

		this.state = {
			component: null
		}
	}

	componentDidMount () {
		this.props.load()
		  .then((component: any) => {
			this.setState(() => ({
				component: component.default ? component.default : component
			}));
		})
	}
	
	render() {
		let loadeComponent: React.Component | null = this.state.component;
		let componentProps: any = this.props.componentProps;
		return (
			<React.Fragment>
				{ 
					this.props.children(loadeComponent, componentProps)
				}
			</React.Fragment>
		)
	}
}
