import * as React from 'react';

import './Interpreter.scss';
import { BaseFormCmp } from '../BaseForm/BaseFormCmp';
import { IInterpreteViewModal } from 'dynamic-form-generator-module/interfaces/IInterpreterViewModel';
import { InterpreterInvalidView } from './InterpreterInvalidView';

export const InterpreterView = (viewModel: IInterpreteViewModal | any, boundaryId: string) => {

    return (
        <React.Fragment>
            <div className="cmp-interpreter fade-in">
                { viewModel.throwErrorInvalidSchema ? 
                    (
                        InterpreterInvalidView(viewModel)
                    ) :
                    (
                        <BaseFormCmp 
                        boundaryId={viewModel.boundaryId} 
                        uuid={viewModel.formUuid}
                        formProperties={viewModel.baseFormProperties}
                        onResolveForm={(data: any)=>{
                            viewModel.resolveBaseForm(data);
                        }}>
                        </BaseFormCmp>
                    )
                }
            </div>
        </React.Fragment>
    );
}