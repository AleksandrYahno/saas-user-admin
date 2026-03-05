import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { IUser, IUserDraft } from '@domain/users/user.interface';
import type { IUserDataSource } from '@domain/users/userDataSource.interface';
import { createUserService } from '@domain/users/user.service';

describe('createUserService', () => {
  const mockUserId = 'test-uuid-123';

  beforeEach(() => {
    vi.stubGlobal('crypto', {
      randomUUID: () => mockUserId,
    });
  });

  describe('createUser', () => {
    it('returns validation errors when draft is invalid', async () => {
      const dataSource: IUserDataSource = {
        loadUsers: vi.fn(),
        createUser: vi.fn(),
        deleteUser: vi.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/unbound-method
      const createUserMock = dataSource.createUser as ReturnType<typeof vi.fn>;
      const service = createUserService(dataSource);
      const draft: IUserDraft = {
        fullName: 'Jo',
        email: 'bad',
        role: '',
        password: 'short',
        confirmPassword: 'other',
      };

      const result = await service.createUser(draft);

      expect(result.errors).toBeDefined();
      expect(result.user).toBeUndefined();
      expect(createUserMock).not.toHaveBeenCalled();
    });

    it('returns user when draft is valid and dataSource succeeds', async () => {
      const createdUser: IUser = {
        id: mockUserId,
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        role: 'admin',
        createdAt: '2024-01-01T00:00:00.000Z',
      };
      const dataSource: IUserDataSource = {
        loadUsers: vi.fn(),
        createUser: vi.fn().mockResolvedValue(createdUser),
        deleteUser: vi.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/unbound-method
      const createUserMock = dataSource.createUser as ReturnType<typeof vi.fn>;
      const service = createUserService(dataSource);
      const draft: IUserDraft = {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        role: 'admin',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const result = await service.createUser(draft);

      expect(result.errors).toBeUndefined();
      expect(result.user).toEqual(createdUser);
      expect(createUserMock).toHaveBeenCalledWith(
        expect.objectContaining({
          fullName: 'Jane Doe',
          email: 'jane@example.com',
          role: 'admin',
          id: mockUserId,
        }),
      );
    });
  });
});
