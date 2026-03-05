import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getUserRoleOptions } from '@config/roles';
import { IUserRole } from '@domain/users/user.interface';
import useUsersPageVM from '@pages/usersPage/vm/useUsersPageVM';
import { IUsersTableContext } from '@pages/usersPage/configs/usersPageTable.config.interface';
import {
  IUseUsersPageContentOptions,
  IUseUsersPageContentResult,
} from '@pages/usersPage/hooks/useUsersPageContent.interface';

export type { IUseUsersPageContentOptions, IUseUsersPageContentResult };

export const useUsersPageContent = (
  options: IUseUsersPageContentOptions,
): IUseUsersPageContentResult => {
  const { t } = useTranslation();
  const { onError, onDeleteSuccess } = options;

  const {
    users,
    isLoadingUsers,
    onDeleteUser,
  } = useUsersPageVM({ onError, onDeleteSuccess });

  const roleByValue = useMemo(() => {
    const roleOptions = getUserRoleOptions(t);

    return Object.fromEntries(
      roleOptions.map((option) => [option.value, option.label]),
    ) as Record<IUserRole, string>;
  }, [t]);

  const tableContext: IUsersTableContext = useMemo(
    () => ({
      t,
      roleByValue,
      onDelete: (id: string) => {
        void onDeleteUser(id);
      },
    }),
    [t, roleByValue, onDeleteUser],
  );

  return {
    users,
    isLoadingUsers,
    tableContext,
  };
};
