import * as React from 'react';

import './SurveyMaster.scss';

export const SurveyMasterFakeView = () => {
    
    return (
        <React.Fragment>
            <div className="fake-view fade-in">
                <div className="block-header">
                    <div className="block large bg-color-fade"></div>
                </div>
                <div className="block-body">
                    <div className="block large table bg-color-fade"></div>
                </div>
                <div className="block-footer">
                    <div className="block small bg-color-fade"></div>
                </div>
            </div>
        </React.Fragment>
    )
}