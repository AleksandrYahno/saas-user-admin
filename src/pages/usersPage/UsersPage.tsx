import { FC, ReactElement, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import useUsersPageVM from '@pages/usersPage/vm/useUsersPageVM';

const UsersPage: FC = (): ReactElement => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const onError = useCallback((message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
  }, [
    enqueueSnackbar,
  ]);

  const {
    users,
    isLoadingUsers,
  } = useUsersPageVM({ onError });

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

      {!isLoadingUsers && (
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

