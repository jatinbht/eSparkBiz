import type { RouteObject } from 'react-router';
import { UsersPage } from './pages/UsersPage';
import { ProfilePage } from './pages/ProfilePage';
import { Navigate } from 'react-router';

const routes = [
  {
    path: 'users',
    children: [
      { index: true, element: <Navigate to="list" replace /> },
      { path: 'list', element: <UsersPage /> },
      { path: ':id', element: <ProfilePage /> },
    ],
  },
] satisfies RouteObject[];

export default routes;
