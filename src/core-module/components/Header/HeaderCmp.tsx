import * as React from 'react';
import { observer } from 'mobx-react';

/** Component Imports */
import AutofactHeaderLogo from 'shared-module/assets/images/logo-autofact-blanco.png';
import { HeaderView } from './HeaderView';
import { HeaderViewModel } from './HeaderViewModel';
/** Component Interfaces */
export interface Props {
    children?: React.ReactNode
}
/** Component Declaration */
@observer
export class HeaderCmp extends React.Component<Props, {}> {
	
    private headerViewModel: HeaderViewModel;
    
    constructor(props: Props) {
        super(props);
        this.headerViewModel = new HeaderViewModel({
            headerTitle: ''
        });
    }

	render() { 
		return HeaderView(this.headerViewModel, AutofactHeaderLogo);
	}
}
