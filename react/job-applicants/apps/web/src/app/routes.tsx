import type { RouteObject } from 'react-router';
import applicantsRoutes from '../modules/applicants/routes.tsx';
import Root from '../Root.jsx';
import authRoutes from '../modules/auth/routes.tsx';
import usersRoutes from '../modules/users/routes.tsx';

const routes = [
    {
        path: '/',
        element: <Root />,
        children: [
            ...applicantsRoutes,
            ...authRoutes,
            ...usersRoutes,
        ],
    },
]  satisfies RouteObject[]

export default routes;
