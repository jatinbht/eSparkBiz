import ApplicantTabsLayoutPage from './pages/ApplicantTabsLayoutPage.jsx';
import { ApplicantsError } from './sections/basic-info/ApplicantsError.tsx';
import { LoadingApplicants } from './sections/basic-info/LoadingApplicants.tsx';
import { CreatePage } from './sections/basic-info/pages/CreatePage.tsx';
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
            {
                path: 'new',
                // children: [
                //     ...basicInfoRoutes.create
                // ]
                element: <CreatePage />,
                errorElement: <ApplicantsError />,
                hydrateFallbackElement: <LoadingApplicants />,
            },
        ],
    },
] satisfies RouteObject[];

export default applicantsRoutes;
