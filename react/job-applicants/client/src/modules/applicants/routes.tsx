import ApplicantTabsLayoutPage from './pages/ApplicantTabsLayoutPage.jsx';
import basicInfoRoutes from './sections/basic-info/routes.tsx';
import { Navigate, type RouteObject } from 'react-router';

const applicantsRoutes = [
    {
        path: 'applicants',
        element: <ApplicantTabsLayoutPage />,
        children: [
            { index: true, element: <Navigate to="basic-info" replace /> },
            //NOTE: LIST SECTION
            ...basicInfoRoutes.list,
            // ...educationRoutes
        ],
    },
    //NOTE: APPLICANT CONTEXT
    {
        path: ':id',
        children: [
            ...basicInfoRoutes.detail,
            {
                path: 'edit',
                // element:
                children: [...basicInfoRoutes.edit],
            },
        ],
    },
] satisfies RouteObject[];

export default applicantsRoutes;
