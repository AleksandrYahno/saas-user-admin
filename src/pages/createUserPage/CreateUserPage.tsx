import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

const CreateUserPage: FC = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>
        {t('create_user_page.title')}
      </h1>

      <p>
        {t('create_user_page.placeholder_text')}
      </p>
    </div>
  );
};

export default CreateUserPage;

