import * as React from 'react';

import './SurveyMaster.scss';
import { SurveyMasterFakeView } from './SurveyMasterFakeView';
import OverlaySpinner from 'shared-module/components/OverlaySpinner';
import { ISurveyViewModel } from 'survey-module/interfaces/ISurveyViewModel';

export const SurveyMasterView = (viewModel: ISurveyViewModel | any, boundaryId: string) => {
    
    let content: any = '';
    if (viewModel.status !== 'done') {
        content = SurveyMasterFakeView();
    } else {
        content =   '';
    }
    return (
        <React.Fragment>
            <div className="cmp-survey-master">
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