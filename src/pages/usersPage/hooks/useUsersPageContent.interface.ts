import { IUser } from '@domain/users/user.interface';
import { IUsersTableContext } from '@pages/usersPage/configs/usersPageTable.config.interface';

export interface IUseUsersPageContentOptions {
  onError: (message: string) => void;
  onDeleteSuccess: () => void;
}

export interface IUseUsersPageContentResult {
  users: IUser[];
  isLoadingUsers: boolean;
  tableContext: IUsersTableContext;
}
