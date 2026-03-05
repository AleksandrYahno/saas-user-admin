import { useCallback, useEffect } from 'react';

import {
  IUserDraft,
  IUserId,
  IUserValidationErrors,
} from '@domain/users/user.interface';
import useAppStoreContext from '@providers/appStoreProvider/appStoreContext';
import {
  createUserCommand,
  deleteUserCommand,
  loadUsersCommand,
} from '@providers/appStoreProvider/appStoreStore/usersSlice/usersCommands';

import { IUsersPageVM } from './usersPageVM.interface';

const useUsersPageVM = (): IUsersPageVM => {
  const {
    appStore,
  } = useAppStoreContext();

  const {
    users,
    isLoadingUsers,
    isSavingUser,
    error,
  } = appStore((state) => state.usersSlice);

  useEffect(() => {
    void loadUsersCommand(appStore);
  }, [
    appStore,
  ]);

  const handleReload = useCallback(() => {
    void loadUsersCommand(appStore);
  }, [
    appStore,
  ]);

  const handleCreateUser = useCallback(
    async (draft: IUserDraft): Promise<IUserValidationErrors | null> => {
      return createUserCommand(
        appStore,
        draft,
      );
    },
    [
      appStore,
    ],
  );

  const handleDeleteUser = useCallback(
    async (id: IUserId): Promise<void> => {
      await deleteUserCommand(
        appStore,
        id,
      );
    },
    [
      appStore,
    ],
  );

  return {
    users,
    isLoadingUsers,
    isSavingUser,
    error,
    onReload: handleReload,
    onCreateUser: handleCreateUser,
    onDeleteUser: handleDeleteUser,
  };
};

export default useUsersPageVM;

