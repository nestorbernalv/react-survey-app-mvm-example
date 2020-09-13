import * as React from 'react';
import { observer } from 'mobx-react';

/** Component Imports */
import { BaseFormView } from './BaseFormView';
import { BaseFormViewModel } from './BaseFormViewModel';
/** Component Interfaces */
export interface Props {
    children?: React.ReactNode,
    boundaryId: string,
    uuid: string,
    formProperties: {
        id: string,
        title?: string,
        description?: string,
        requiredFields?: string[],
        fields?: any[],
        actions?: any[]  
    },
    onResolveForm: Function
}
/** Component Declaration */
@observer
export class BaseFormCmp extends React.Component<Props, {}> {
	
    private baseFormViewModel: BaseFormViewModel;
    private scrollAnchorRef: React.RefObject<HTMLDivElement>; 
    
    constructor(props: Props) {
        super(props);
        this.scrollAnchorRef = React.createRef();
        this.baseFormViewModel = new BaseFormViewModel({
            uuid: this.props.uuid,
            formId: this.props.formProperties.id,
            formTitle: this.props.formProperties.title,
            formDescription: this.props.formProperties.description,
            requiredFields: this.props.formProperties.requiredFields,
            boundaryId: this.props.boundaryId,
            fields: this.props.formProperties.fields,
            actions: this.props.formProperties.actions,
            onResolveForm: this.props.onResolveForm,
            scrollFunction: this.scrollToTop
        });
    }

    scrollToTop = () => {
        const anchor: any = this.scrollAnchorRef;
        if (anchor) anchor.current.scrollIntoView({behavior: 'smooth'});
        
    }

	render() { 
		return BaseFormView(this.baseFormViewModel, this.props.boundaryId, this.props.children, this.scrollAnchorRef);
	}
}
