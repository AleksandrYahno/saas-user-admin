import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import useUsersPageVM from '@pages/usersPage/vm/useUsersPageVM';

const UsersPage: FC = (): ReactElement => {
  const {
    users,
    isLoadingUsers,
    error,
  } = useUsersPageVM();
  const { t } = useTranslation();

  return (
    <div>
      <h1>
        {t('users_page.title')}
      </h1>

      {isLoadingUsers && (
        <p>
          {t('users_page.loading')}
        </p>
      )}

      {error && (
        <p>
          {error}
        </p>
      )}

      {!isLoadingUsers && !error && (
        <p>
          {t('users_page.total_users_label')}
          {' '}
          {users.length}
        </p>
      )}
    </div>
  );
};

export default UsersPage;

