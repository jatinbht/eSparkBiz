import type { RouteObject } from 'react-router';
import { ListViewPage } from './pages/ListViewPage';
import { DetailViewPage } from './pages/DetailViewPage';
import { LoadingApplicants } from '../basic-info/LoadingApplicants';
import { ApplicantsError } from '../basic-info/ApplicantsError';

const list = [
  {
    path: 'experience',
    element: <ListViewPage />,
    errorElement: <ApplicantsError />,
    hydrateFallbackElement: <LoadingApplicants />,
  },
] satisfies RouteObject[];

const detail = [
  {
    path: 'experience',
    element: <DetailViewPage />,
    errorElement: <ApplicantsError />,
    hydrateFallbackElement: <LoadingApplicants />,
  },
] satisfies RouteObject[];

const edit = [
  {
    path: 'experience',
    element: <div className="text-muted">Edit experience details placeholder</div>,
    errorElement: <ApplicantsError />,
    hydrateFallbackElement: <LoadingApplicants />,
  },
] satisfies RouteObject[];

export default { list, detail, edit };
