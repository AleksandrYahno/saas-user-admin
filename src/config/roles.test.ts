import { describe, expect, it, vi } from 'vitest';

import {
  getUserRoleOptions,
  USER_ROLE_OPTIONS,
} from '@config/roles';

describe('roles config', () => {
  describe('USER_ROLE_OPTIONS', () => {
    it('includes admin, member, viewer with correct labelKeys', () => {
      expect(USER_ROLE_OPTIONS).toHaveLength(3);

      const values = USER_ROLE_OPTIONS.map((o) => o.value);
      expect(values).toContain('admin');
      expect(values).toContain('member');
      expect(values).toContain('viewer');

      const adminOption = USER_ROLE_OPTIONS.find((o) => o.value === 'admin');
      expect(adminOption?.labelKey).toBe('create_user_page.role_admin');

      const memberOption = USER_ROLE_OPTIONS.find((o) => o.value === 'member');
      expect(memberOption?.labelKey).toBe('create_user_page.role_member');

      const viewerOption = USER_ROLE_OPTIONS.find((o) => o.value === 'viewer');
      expect(viewerOption?.labelKey).toBe('create_user_page.role_viewer');
    });
  });

  describe('getUserRoleOptions', () => {
    it('returns options with value and translated label using t()', () => {
      const t = vi.fn((key: string) => `translated:${key}`);

      const result = getUserRoleOptions(t);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        value: 'admin',
        label: 'translated:create_user_page.role_admin',
      });
      expect(result[1]).toEqual({
        value: 'member',
        label: 'translated:create_user_page.role_member',
      });
      expect(result[2]).toEqual({
        value: 'viewer',
        label: 'translated:create_user_page.role_viewer',
      });
      expect(t).toHaveBeenCalledTimes(3);
      expect(t).toHaveBeenCalledWith('create_user_page.role_admin');
      expect(t).toHaveBeenCalledWith('create_user_page.role_member');
      expect(t).toHaveBeenCalledWith('create_user_page.role_viewer');
    });
  });
});
