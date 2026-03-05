import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

const HomePage: FC = (): ReactElement => {
  const { t } = useTranslation('home');

  return (
    <main>
      <h1>
        {t('home_page.title')}
      </h1>
      <p>
        {t('home_page.subtitle')}
      </p>
    </main>
  );
};

export default HomePage;
