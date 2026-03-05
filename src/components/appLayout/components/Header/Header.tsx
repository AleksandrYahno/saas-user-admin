import { FC, ReactElement } from 'react';

import PageTitle from '../PageTitle/PageTitle';

import './Header.css';

const Header: FC = (): ReactElement => {
  return (
    <header className="app-layout__header">
      <div className="app-layout__header-left">
        <PageTitle />
      </div>

      <div className="app-layout__header-right">
        <div className="app-layout__user-placeholder">
          U
        </div>
      </div>
    </header>
  );
};

export default Header;

