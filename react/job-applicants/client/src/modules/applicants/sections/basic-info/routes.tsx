import type { RouteObject } from 'react-router';
import { ListViewPage } from './pages/ListViewPage';
import { loadApplicants } from './loaders';
import { ApplicantsError } from './ApplicantsError';
import { LoadingApplicants } from './LoadingApplicants';

const list = [
    {
        path: 'basic-info',
        element: <ListViewPage />,
        loader: loadApplicants,
        errorElement: <ApplicantsError />,
        hydrateFallbackElement: <LoadingApplicants />
    },
] satisfies RouteObject[];

const detail = [
    {
        path: 'basic-info',
        // element: <DetailViewPage />
    },
] satisfies RouteObject[];

const edit = [
    {
        path: 'basic-info',
        // element:  
    },
] satisfies RouteObject[];

export default { list, detail, edit };
