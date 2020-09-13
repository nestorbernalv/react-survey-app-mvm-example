import * as React from 'react';

import './BaseInput.scss';

export const BaseInputView = (viewModel: any) => {

    let input: any = null;
    switch(viewModel.inputType){
        case 'textarea':
            input = <textarea rows={viewModel.rows ? viewModel.rows : 4} onChange={(e)=>{viewModel.updateValue(e)}}>{viewModel.currentValue}</textarea>
        break;
    }

    return (
        <React.Fragment>
            <div className="cmp-base-input">
                <legend>
                    {viewModel.label}{viewModel.required ? ' *' : ''}
                </legend>
                {input}
                {
                    viewModel.validationHandler.hasError ?
                    <span className="error help-text">{viewModel.validationHandler.errorMessage}</span> :
                    ''
                }
            </div> 
        </React.Fragment>
    );
}