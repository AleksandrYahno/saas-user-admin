import { ReactNode } from 'react';

import { IUser, IUserRole } from '@domain/users/user.interface';

export interface IUsersTableContext {
  t: (key: string) => string;
  roleByValue: Record<IUserRole, string>;
  onDelete: (id: string) => void;
}

export interface IUsersTableColumn {
  id: string;
  headerKey: string | null;
  getValue: (row: IUser, context: IUsersTableContext) => ReactNode;
}
