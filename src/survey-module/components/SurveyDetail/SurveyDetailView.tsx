import * as React from 'react';

import './SurveyDetail.scss';
import {InterpreterCmp as DFGInterpreter} from 'dynamic-form-generator-module/components/Interpreter/InterpreterCmp';
import { SurveyDetailFakeView } from './SurveyDetailFakeView';
import OverlaySpinner from 'shared-module/components/OverlaySpinner';
import { ISurveyViewModel } from 'survey-module/interfaces/ISurveyViewModel';
import RedirectElement from 'shared-module/components/RedirectElement';

export const SurveyDetailView = (viewModel: ISurveyViewModel | any, boundaryId: string) => {
    
    const jsonSchema: any = (viewModel.survey !== null && viewModel.survey.referenciaJsonSchema) ? viewModel.survey.referenciaJsonSchema : null;
    const uiSchema: any = (viewModel.survey !== null && viewModel.survey.referenciaUISchema) ? viewModel.survey.referenciaUISchema : null;
    let content: any = '';
    if (viewModel.status !== 'done') {
        if (viewModel.survey !== null) {
            content =   <DFGInterpreter boundaryId={boundaryId} 
                            jsonSchema={jsonSchema} 
                            uiSchema={uiSchema} 
                            productionMode={true}
                            onSaveEvent={(data: any)=>{viewModel.saveSurvey(data);}}
                        />
        } else {
            content = SurveyDetailFakeView();
        }
    } else {
        content =   <div className="done fade-in">
                        <div className="title">
                            {viewModel.doneStatusTitle}
                        </div>
                        <div className="subtitle">
                            {viewModel.doneStatusSubTitle}
                        </div>
                        <div className="emoticon success">:-)</div>
                        <div className="cta-container">
                            <RedirectElement type={'link-button'} cssClass={'light-blue-button btn'} hrefLink={'to-home'}/>
                        </div>
                    </div>
    }
    return (
        <React.Fragment>
            <div className="cmp-survey-detail">
                {content}
                {
                    viewModel.proccesing  ?
                    (<OverlaySpinner />) :
                    ('')
                }
            </div>
        </React.Fragment>
    )
}