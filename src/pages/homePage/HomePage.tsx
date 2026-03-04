import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

const HomePage: FC = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <main>
      <h1>
        {t('homePage.title')}
      </h1>
      <p>
        {t('homePage.subtitle')}
      </p>
    </main>
  );
};

export default HomePage;
