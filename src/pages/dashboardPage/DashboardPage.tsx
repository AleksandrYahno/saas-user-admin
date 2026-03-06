import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { StatCard } from '@shared/UIkit/statCard/StatCard';

import './DashboardPage.css';

const DashboardPage: FC = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__stats">
        <StatCard
          title={t('dashboard_page.total_users')}
          value="120"
          variant="blue"
        />

        <StatCard
          title={t('dashboard_page.active_users')}
          value="95"
          variant="green"
        />

        <StatCard
          title={t('dashboard_page.pending_invitations')}
          value="8"
          variant="orange"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
