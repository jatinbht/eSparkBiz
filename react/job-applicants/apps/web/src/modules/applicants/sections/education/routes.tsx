import type { RouteObject } from 'react-router';
import { ListViewPage } from './pages/ListViewPage';
import { DetailViewPage } from './pages/DetailViewPage';
import { LoadingApplicants } from '../basic-info/LoadingApplicants';
import { ApplicantsError } from '../basic-info/ApplicantsError';

const list = [
  {
    path: 'education',
    element: <ListViewPage />,
    errorElement: <ApplicantsError />,
    hydrateFallbackElement: <LoadingApplicants />,
  },
] satisfies RouteObject[];

const detail = [
  {
    path: 'education',
    element: <DetailViewPage />,
    errorElement: <ApplicantsError />,
    hydrateFallbackElement: <LoadingApplicants />,
  },
] satisfies RouteObject[];

const edit = [
  {
    path: 'education',
    element: <div className="text-muted">Edit education details placeholder</div>,
    errorElement: <ApplicantsError />,
    hydrateFallbackElement: <LoadingApplicants />,
  },
] satisfies RouteObject[];

export default { list, detail, edit };
