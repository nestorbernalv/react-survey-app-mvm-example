import * as React from 'react';
import RedirectElement from 'shared-module/components/RedirectElement';

import './Interpreter.scss';

export const InterpreterInvalidView = (viewModel: any) => {

    return (
        <React.Fragment>
            <div className="invalid-view">
                <div className="title">
                    Lo sentimos, pero no es posible ofrecerle la Encuesta que solicita.
                </div>
                <div className="subtitle">
                    {viewModel.invalidStatusSubTitle}
                </div>
                <div className="emoticon error">:-(</div>
                <div className="cta-container">
                    <RedirectElement type={'link-button'} cssClass={'light-blue-button btn'} hrefLink={'to-home'}/>
                </div>
            </div>
        </React.Fragment>
    );
}