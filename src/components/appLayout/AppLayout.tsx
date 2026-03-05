import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router';

import Header from '@components/appLayout/components/Header/Header';
import Sidebar from '@components/appLayout/components/Sidebar/Sidebar';

import './appLayout.css';

const AppLayout: FC = (): ReactElement => {
  return (
    <div className="app-layout">
      <div className="app-layout__body">
        <Sidebar />

        <div className="app-layout__main">
          <Header />

          <main className="app-layout__content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

