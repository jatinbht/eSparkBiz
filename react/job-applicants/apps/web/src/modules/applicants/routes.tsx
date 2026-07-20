import ApplicantTabsLayoutPage from './pages/ApplicantTabsLayoutPage.jsx';
import { ApplicantsError } from './sections/basic-info/ApplicantsError.tsx';
import { LoadingApplicants } from './sections/basic-info/LoadingApplicants.tsx';
import { CreatePage } from './sections/basic-info/pages/CreatePage.tsx';
import basicInfoRoutes from './sections/basic-info/routes.tsx';
import educationRoutes from './sections/education/routes.tsx';
import experienceRoutes from './sections/experience/routes.tsx';
import technologiesRoutes from './sections/technologies/routes.tsx';
import { Navigate, type RouteObject } from 'react-router';

const applicantsRoutes = [
    {
        path: 'applicants',
        element: <ApplicantTabsLayoutPage />,
        children: [
            { index: true, element: <Navigate to="basic-info" replace /> },
            // NOTE: LIST SECTION
            ...basicInfoRoutes.list,
            ...educationRoutes.list,
            ...experienceRoutes.list,
            ...technologiesRoutes.list,

            // NOTE: APPLICANT CONTEXT
            {
                path: ':id',
                children: [
                    ...basicInfoRoutes.detail,
                    ...educationRoutes.detail,
                    ...experienceRoutes.detail,
                    ...technologiesRoutes.detail,
                    {
                        path: 'edit',
                        children: [...basicInfoRoutes.edit, ...educationRoutes.edit, ...experienceRoutes.edit, ...technologiesRoutes.edit],
                    },
                ],
            },
            {
                path: 'new',
                element: <CreatePage />,
                errorElement: <ApplicantsError />,
                hydrateFallbackElement: <LoadingApplicants />,
            },
        ],
    },
] satisfies RouteObject[];

export default applicantsRoutes;
