import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { SIDEBAR_ITEMS } from '@components/appLayout/components/Sidebar/sidebar.config';

const ROUTE_TO_LABEL_KEY: Record<string, string> = Object.fromEntries(
  SIDEBAR_ITEMS.map((item) => [item.to, item.labelKey]),
);

const PageTitle: FC = (): ReactElement | null => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const labelKey = ROUTE_TO_LABEL_KEY[pathname];
  const title = labelKey != null ? t(labelKey) : null;

  if (title === null) {
    return null;
  }

  return (
    <h1 className="app-layout__header-title">
      {title}
    </h1>
  );
};

export default PageTitle;
