import { FC, ReactElement, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import { USERS_TABLE_COLUMNS } from '@pages/usersPage/configs/usersPageTable.config';
import { useUsersPageContent } from '@pages/usersPage/hooks/useUsersPageContent';

import './UsersPage.css';

const UsersPage: FC = (): ReactElement => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const onError = useCallback((message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
  }, [enqueueSnackbar]);

  const onDeleteSuccess = useCallback(() => {
    enqueueSnackbar(t('users_page.user_deleted'), { variant: 'success' });
  }, [enqueueSnackbar, t]);

  const { users, isLoadingUsers, tableContext } = useUsersPageContent({
    onError,
    onDeleteSuccess,
  });

  if (isLoadingUsers) {
    return (
      <div className="users-page">
        <p className="users-page__loading">
          {t('users_page.loading')}
        </p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="users-page">
        <p className="users-page__empty">
          {t('users_page.empty')}
        </p>
      </div>
    );
  }

  return (
    <div className="users-page">
      <div className="users-page__table-wrap">
        <table className="users-page__table">
          <thead>
            <tr>
              {USERS_TABLE_COLUMNS.map((column) => (
                <th key={column.id}>
                  {column.headerKey ? t(column.headerKey) : null}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                {USERS_TABLE_COLUMNS.map((column) => (
                  <td key={column.id}>
                    {column.getValue(user, tableContext)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
