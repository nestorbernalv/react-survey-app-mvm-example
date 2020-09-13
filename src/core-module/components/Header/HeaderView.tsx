import * as React from 'react';

import './Header.scss';

export const HeaderView = (viewModel: any, AutofactHeaderLogo: any) => {

    return (
        <React.Fragment>
            <div className="cmp-header">
				<div className="container">
					<div className="logo-container">
						<img src={AutofactHeaderLogo} className="autofact-logo" alt="Logo Autofact" />
					</div>
					<div className="main-title">{viewModel.headerTitle}</div>
				</div>
			</div>
        </React.Fragment>
    );
}