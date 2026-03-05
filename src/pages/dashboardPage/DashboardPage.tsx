import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

const DashboardPage: FC = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>
        {t('dashboard_page.title')}
      </h1>

      <p>
        {t('dashboard_page.welcome_text')}
      </p>
    </div>
  );
};

export default DashboardPage;

