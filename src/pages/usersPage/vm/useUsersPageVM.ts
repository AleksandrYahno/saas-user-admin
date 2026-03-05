import { useCallback, useEffect, useMemo } from 'react';

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

import { IUsersPageVM, IUsersPageVMOptions } from './usersPageVM.interface';

const useUsersPageVM = (options?: IUsersPageVMOptions): IUsersPageVM => {
  const {
    appStore,
  } = useAppStoreContext();
  const {
    onError,
    onDeleteSuccess,
  } = options ?? {};

  const {
    users,
    isLoadingUsers,
    isSavingUser,
  } = appStore((state) => state.usersSlice);

  const commandOptions = useMemo(
    () => ({ onError }),
    [onError],
  );

  useEffect(() => {
    void loadUsersCommand(appStore, commandOptions);
  }, [
    appStore,
    commandOptions,
  ]);

  const handleReload = useCallback(() => {
    void loadUsersCommand(appStore, commandOptions);
  }, [
    appStore,
    commandOptions,
  ]);

  const handleCreateUser = useCallback(
    async (draft: IUserDraft): Promise<IUserValidationErrors | null> => {
      return createUserCommand(
        appStore,
        draft,
        commandOptions,
      );
    },
    [
      appStore,
      commandOptions,
    ],
  );

  const handleDeleteUser = useCallback(
    async (id: IUserId): Promise<void> => {
      await deleteUserCommand(appStore, id, {
        ...commandOptions,
        onSuccess: onDeleteSuccess,
      });
    },
    [
      appStore,
      commandOptions,
      onDeleteSuccess,
    ],
  );

  return {
    users,
    isLoadingUsers,
    isSavingUser,
    onReload: handleReload,
    onCreateUser: handleCreateUser,
    onDeleteUser: handleDeleteUser,
  };
};

export default useUsersPageVM;

