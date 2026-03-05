import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReactElement } from 'react';

import { IUser, IUserRole } from '@domain/users/user.interface';
import { USERS_TABLE_COLUMNS } from '@pages/usersPage/configs/usersPageTable.config';
import { IUsersTableContext } from '@pages/usersPage/configs/usersPageTable.config.interface';

describe('usersPageTable.config', () => {
  describe('USERS_TABLE_COLUMNS', () => {
    it('has four columns with expected ids and headerKeys', () => {
      expect(USERS_TABLE_COLUMNS).toHaveLength(4);

      const ids = USERS_TABLE_COLUMNS.map((col) => col.id);
      expect(ids).toEqual(['name', 'role', 'createdAt', 'actions']);

      expect(USERS_TABLE_COLUMNS[0].headerKey).toBe('users_page.table_name');
      expect(USERS_TABLE_COLUMNS[1].headerKey).toBe('users_page.table_role');
      expect(USERS_TABLE_COLUMNS[2].headerKey).toBe('users_page.table_created_at');
      expect(USERS_TABLE_COLUMNS[3].headerKey).toBe('users_page.table_actions');
    });

    it('name column getValue renders fullName and email', () => {
      const row: IUser = {
        id: '1',
        fullName: 'John Doe',
        email: 'john@example.com',
        role: 'admin' as IUserRole,
        createdAt: '2025-01-01T00:00:00.000Z',
      };

      const context = {} as IUsersTableContext;
      const column = USERS_TABLE_COLUMNS.find((c) => c.id === 'name')!;
      const cell = column.getValue(row, context) as ReactElement;

      render(cell);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    it('role column getValue returns translated role from context', () => {
      const row: IUser = {
        id: '1',
        fullName: 'Jane',
        email: 'jane@example.com',
        role: 'member' as IUserRole,
        createdAt: '2025-01-01T00:00:00.000Z',
      };

      const context: IUsersTableContext = {
        t: vi.fn(),
        roleByValue: {
          admin: 'Admin',
          member: 'Member',
          viewer: 'Viewer',
        } as Record<IUserRole, string>,
        onDelete: vi.fn(),
      };

      const column = USERS_TABLE_COLUMNS.find((c) => c.id === 'role')!;
      const result = column.getValue(row, context);

      expect(result).toBe('Member');
    });

    it('role column getValue returns raw role when missing in roleByValue', () => {
      const row: IUser = {
        id: '1',
        fullName: 'X',
        email: 'x@x.com',
        role: 'member' as IUserRole,
        createdAt: '2025-01-01T00:00:00.000Z',
      };

      const context: IUsersTableContext = {
        t: vi.fn(),
        roleByValue: {} as Record<IUserRole, string>,
        onDelete: vi.fn(),
      };

      const column = USERS_TABLE_COLUMNS.find((c) => c.id === 'role')!;
      const result = column.getValue(row, context);

      expect(result).toBe('member');
    });

    it('createdAt column getValue returns formatted date', () => {
      const row: IUser = {
        id: '1',
        fullName: 'X',
        email: 'x@x.com',
        role: 'viewer' as IUserRole,
        createdAt: '2025-03-04T14:30:00.000Z',
      };

      const context = {} as IUsersTableContext;
      const column = USERS_TABLE_COLUMNS.find((c) => c.id === 'createdAt')!;
      const result = column.getValue(row, context);

      expect(result).toBe('2025-03-04');
    });

    it('actions column getValue renders delete button and calls onDelete on click', () => {
      const onDelete = vi.fn();
      const t = vi.fn((key: string) => (key === 'users_page.delete' ? 'Delete' : key));

      const row: IUser = {
        id: 'user-123',
        fullName: 'X',
        email: 'x@x.com',
        role: 'viewer' as IUserRole,
        createdAt: '2025-01-01T00:00:00.000Z',
      };

      const context: IUsersTableContext = {
        t,
        roleByValue: {} as Record<IUserRole, string>,
        onDelete,
      };

      const column = USERS_TABLE_COLUMNS.find((c) => c.id === 'actions')!;
      const cell = column.getValue(row, context) as ReactElement;

      render(cell);

      const button = screen.getByRole('button', { name: 'Delete' });
      expect(button).toBeInTheDocument();

      fireEvent.click(button);

      expect(onDelete).toHaveBeenCalledTimes(1);
      expect(onDelete).toHaveBeenCalledWith('user-123');
    });
  });
});
