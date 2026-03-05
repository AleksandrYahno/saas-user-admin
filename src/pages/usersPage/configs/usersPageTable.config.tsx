import { formatCreatedAt } from '@helpers/date/dateUtils';
import { Button } from '@shared/UIkit/button/Button';
import {
  IUsersTableColumn,
  IUsersTableContext,
} from '@pages/usersPage/configs/usersPageTable.config.interface';

export type { IUsersTableColumn, IUsersTableContext };

export const USERS_TABLE_COLUMNS: IUsersTableColumn[] = [
  {
    id: 'name',
    headerKey: 'users_page.table_name',
    getValue: (row) => (
      <div className="users-page__table-cell-user">
        <div className="users-page__table-cell-user-name">
          {row.fullName}
        </div>

        <div className="users-page__table-cell-user-email">
          {row.email}
        </div>
      </div>
    ),
  },
  {
    id: 'role',
    headerKey: 'users_page.table_role',
    getValue: (row, context) => context.roleByValue[row.role] ?? row.role,
  },
  {
    id: 'createdAt',
    headerKey: 'users_page.table_created_at',
    getValue: (row) => formatCreatedAt(row.createdAt),
  },
  {
    id: 'actions',
    headerKey: 'users_page.table_actions',
    getValue: (row, context) => (
      <Button
        type="button"
        variant="danger"
        onClick={() => context.onDelete(row.id)}
      >
        {context.t('users_page.delete')}
      </Button>
    ),
  },
];
