import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import './Sidebar.css';
import { SIDEBAR_ITEMS } from '@components/appLayout/components/Sidebar/sidebar.config';

const Sidebar: FC = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <nav className="app-layout__sidebar">
      <div className="app-layout__logo">
        {t('layout.logo_title')}
      </div>

      {SIDEBAR_ITEMS.map((item) => {
        const {
          id,
          to,
          labelKey,
          icon: Icon,
        } = item;

        return (
          <NavLink
            key={id}
            to={to}
            className={({ isActive }) => (
              isActive
                ? 'app-layout__nav-link app-layout__nav-link--active'
                : 'app-layout__nav-link'
            )}
          >
            <span className="app-layout__nav-icon">
              <Icon />
            </span>

            <span className="app-layout__nav-label">
              {t(labelKey)}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Sidebar;

