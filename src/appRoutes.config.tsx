import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

import AppLayout from '@components/appLayout/AppLayout';
import LazyPageBoundary from '@components/lazyPageBoundary/LazyPageBoundary';

const DashboardPage = lazy(() => import('@pages/dashboardPage/DashboardPage'));
const CreateUserPage = lazy(() => import('@pages/createUserPage/CreateUserPage'));
const UsersPage = lazy(() => import('@pages/usersPage/UsersPage'));

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout />
    ),
    children: [
      {
        index: true,
        element: (
          <LazyPageBoundary>
            <Navigate
              to="/dashboard"
              replace
            />
          </LazyPageBoundary>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <LazyPageBoundary>
            <DashboardPage />
          </LazyPageBoundary>
        ),
      },
      {
        path: 'create-user',
        element: (
          <LazyPageBoundary>
            <CreateUserPage />
          </LazyPageBoundary>
        ),
      },
      {
        path: 'users',
        element: (
          <LazyPageBoundary>
            <UsersPage />
          </LazyPageBoundary>
        ),
      },
    ],
  },
]);
