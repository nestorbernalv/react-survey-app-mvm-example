import React from 'react';
import { Helmet } from 'react-helmet';

import './App.scss';
import {HeaderCmp as AppHeader} from 'core-module/components/Header/HeaderCmp';
import AppFooter from 'core-module/components/Footer/Footer';
import AppMainNavBar from 'core-module/components/MainNavBar/MainNavBar';
import AppRouting from './AppRouting';
import ErrorBoundary from 'shared-module/components/ErrorBoundary';

const App: React.FC = () => {
  const boundaryId: string = 'main-boundary';
  return (
    <div className="app">
      <Helmet>
          <title>Autofact | Encuestas</title>
          <meta name="description" content="Sistema de Encuestas para Autofact" />
      </Helmet>

      <AppMainNavBar></AppMainNavBar>
      <AppHeader></AppHeader>
      <div className="app-body">
				<div className="container">
          <div className="custom-container">
            <ErrorBoundary boundaryId={boundaryId}>
              <AppRouting boundaryId={boundaryId}/>
            </ErrorBoundary>
          </div>
				</div>
				<AppFooter></AppFooter>
			</div>
    </div>
  );
}

export default App;
