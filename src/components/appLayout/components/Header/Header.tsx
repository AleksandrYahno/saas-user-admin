import { FC, ReactElement } from 'react';

import './Header.css';

const Header: FC = (): ReactElement => {
  return (
    <header className="app-layout__header">
      <div className="app-layout__header-right">
        <div className="app-layout__user-placeholder">
          U
        </div>
      </div>
    </header>
  );
};

export default Header;

