import type { FC } from 'react';

import {
  HomeIcon,
  ListIcon,
  PlusIcon,
} from '@components/appLayout/components/Sidebar/sidebarIcons';

export interface ISidebarItemConfig {
  id: string;
  to: string;
  labelKey: string;
  icon: FC;
}

export const SIDEBAR_ITEMS: ISidebarItemConfig[] = [
  {
    id: 'dashboard',
    to: '/dashboard',
    labelKey: 'nav.dashboard',
    icon: HomeIcon,
  },
  {
    id: 'create-user',
    to: '/create-user',
    labelKey: 'nav.create_user',
    icon: PlusIcon,
  },
  {
    id: 'users',
    to: '/users',
    labelKey: 'nav.users_list',
    icon: ListIcon,
  },
];

