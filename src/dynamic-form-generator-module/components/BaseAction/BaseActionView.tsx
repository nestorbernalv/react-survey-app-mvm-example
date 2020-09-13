/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';

import './BaseAction.scss';
import { IBaseActionViewModal } from 'dynamic-form-generator-module/interfaces/IBaseActionViewModel';

export const BaseActionView = (viewModel: IBaseActionViewModal | any, boundaryId: string, cssClass: string) => {
    return (
        <React.Fragment>
            <div className="cmp-base-action">
                <a className={cssClass} 
                onClick={(e)=>{viewModel.onClick(e);}}>
                    {viewModel.text} 
                </a>
            </div>
        </React.Fragment>
    );
}