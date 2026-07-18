import { Navigate, type RouteObject } from 'react-router';
import { AuthLayoutPage } from './pages/AuthLayoutPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';

const routes = [
  {
    path: 'auth',
    element: <AuthLayoutPage />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
    ],
  },
] satisfies RouteObject[];

export default routes;
