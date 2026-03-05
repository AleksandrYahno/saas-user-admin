import { FC, ReactElement } from 'react';

import useUsersPageVM from '@pages/usersPage/vm/useUsersPageVM';

const UsersPage: FC = (): ReactElement => {
  const {
    users,
    isLoadingUsers,
    error,
  } = useUsersPageVM();

  return (
    <div>
      <h1>
        Users
      </h1>

      {isLoadingUsers && (
        <p>
          Loading users...
        </p>
      )}

      {error && (
        <p>
          {error}
        </p>
      )}

      {!isLoadingUsers && !error && (
        <p>
          Total users:
          {' '}
          {users.length}
        </p>
      )}
    </div>
  );
};

export default UsersPage;

