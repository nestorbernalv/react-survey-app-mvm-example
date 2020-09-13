import * as React from 'react';

import './BaseRadioGroup.scss';

export const BaseRadioGroupView = (viewModel: any) => {

    return (
        <React.Fragment>
            <div className="cmp-base-radio-group">
                <legend>
                    {viewModel.label}{viewModel.required ? ' *' : ''}
                    
                </legend>
                {
                    viewModel.items.map(
                        (item: any, index: number) => {

                            return  <label key={index} className="container">
                                        {item.text}
                                        <input type="radio" key={index} id={item.value} name={viewModel.fieldId} 
                                        value={item.value} 
                                        onClick={(e)=>{viewModel.updateValue(e);}} 
                                        defaultChecked={viewModel.currentValue !== null && item.value === viewModel.currentValue ? true : false}/> 
                                        <span className="checkmark"></span>
                                    </label>
                        }
                    )
                }
                {
                    viewModel.validationHandler.hasError ?
                    <span className="error help-text">{viewModel.validationHandler.errorMessage}</span> :
                    ''
                }
            </div> 
        </React.Fragment>
    );
}