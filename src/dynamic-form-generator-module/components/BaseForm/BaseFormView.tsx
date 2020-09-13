import * as React from 'react';

import './BaseForm.scss';
import { IBaseFormViewModal } from 'dynamic-form-generator-module/interfaces/IBaseFormViewModel';
import { BaseActionCmp } from '../BaseAction/BaseActionCmp';
import { BaseRadioGroupCmp } from '../BaseRadioGroup/BaseRadioGroupCmp';
import { Fade, Alert } from 'reactstrap';
import { BaseInputCmp } from '../BaseInput/BaseInputCmp';

export const BaseFormView = (viewModel: IBaseFormViewModal | any, boundaryId: string, children: React.ReactNode, scrollAnchorRef: any) => {

    let inputs: any = [];
    if (viewModel.fields !== undefined && viewModel.fields.length > 0) {
        inputs = viewModel.fields.map((field: any, index: number) => {
            let input: any = null;
            switch(field.uiWidget) {
                case 'radio-group':
                    input = <BaseRadioGroupCmp 
                                formUuid={viewModel.uuid}
                                key={index}
                                fieldId={field.id} 
                                boundaryId={boundaryId}  
                                label={field.label}
                                items={field.options} 
                                currentValue={field.currentValue}
                                required={field.required} 
                                onChange={(fieldKey: string, newValue: any)=>{
                                    viewModel.onUpdateFormValues(fieldKey, newValue);
                                }}
                            />
                break;
                case 'textarea':
                    input = <BaseInputCmp 
                                formUuid={viewModel.uuid}
                                key={index}
                                fieldId={field.id} 
                                boundaryId={boundaryId}  
                                label={field.label}
                                inputType={'textarea'}
                                rows={field.rows} 
                                currentValue={field.currentValue}
                                required={field.required} 
                                onChange={(fieldKey: string, newValue: any)=>{
                                    viewModel.onUpdateFormValues(fieldKey, newValue);
                                }}
                            />
                break;
            }
            return input;
        });
    }
    
    let actions: any[] = [];
    if (viewModel.actions !== undefined && viewModel.actions.length > 0) {
        actions = viewModel.actions.map((action: any, index: number) => 
            {
                let cta: any = null;
                if (action.type === 'button') {
                    cta = <BaseActionCmp    
                            key={index} 
                            boundaryId={viewModel.boundaryId} 
                            text={action.title ? action.title : ''} 
                            clickEvent={
                                action.exec === 'resolve' 
                                ? ()=>{viewModel.resolveForm();} 
                                : ()=>{viewModel.rejectBaseForm();}
                            }
                            cssClass={action.exec} 
                        />
                }
                return cta;
            }
            
        );
    }

    return (
        <React.Fragment>
            <form className="cmp-base-form">
                <div className="form-header" ref={scrollAnchorRef}>
                    {
                        viewModel.formDescription !== undefined && viewModel.formDescription !== null && viewModel.formDescription !== '' ?
                        (
                            <div className="form-title">
                                {viewModel.formDescription}
                            </div>
                        ) :
                        ''
                    }
                    {
                        viewModel.hasError ? 
                        (
                            <Fade tag="h5" className="mt-2 mb-2">
                                <Alert color="danger">
                                    {viewModel.errorMessage}
                                </Alert>
                            </Fade>
                        ) : 
                        ('')
                    }
                </div>
                <div className="form-body">
                    {inputs}
                </div>
                <div className="form-footer">
                    { actions}
                </div>
            </form>
        </React.Fragment>
    );
}