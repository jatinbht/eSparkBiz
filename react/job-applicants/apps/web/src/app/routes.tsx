import type { RouteObject } from 'react-router';
import applicantsRoutes from '../modules/applicants/routes.tsx';
import Root from '../Root';

const routes = [
    {
        path: '/',
        element: <Root />,
        children: [
            ...applicantsRoutes,
        ],
    },
]  satisfies RouteObject[]

export default routes;
