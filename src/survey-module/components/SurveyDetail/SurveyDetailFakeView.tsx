import * as React from 'react';

import './SurveyDetail.scss';

export const SurveyDetailFakeView = () => {
    
    return (
        <React.Fragment>
            <div className="fake-view fade-in">
                <div className="block-header">
                    <div className="block large bg-color-fade"></div>
                </div>
                <div className="block-body">
                    <div className="block medium bg-color-fade"></div>
                    <div className="block medium bg-color-fade"></div>
                    <div className="block medium bg-color-fade"></div>
                    <div className="block medium bg-color-fade"></div>
                    <div className="block medium bg-color-fade"></div>
                </div>
                <div className="block-footer">
                    <div className="block small bg-color-fade"></div>
                </div>
            </div>
        </React.Fragment>
    )
}