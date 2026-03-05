import type { TFunction } from 'i18next';

import type { IUserRole } from '@domain/users/user.interface';

export interface IRoleOption {
  value: IUserRole;
  labelKey: string;
}

export const USER_ROLE_OPTIONS: IRoleOption[] = [
  { value: 'admin', labelKey: 'create_user_page.role_admin' },
  { value: 'member', labelKey: 'create_user_page.role_member' },
  { value: 'viewer', labelKey: 'create_user_page.role_viewer' },
];

export const getUserRoleOptions = (
  t: TFunction,
): { value: IUserRole; label: string }[] => USER_ROLE_OPTIONS.map(({ value, labelKey }) => ({
  value,
  label: t(labelKey),
}));
