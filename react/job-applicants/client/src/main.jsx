import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './app/router.js';

// const router = createBrowserRouter(
//   // createRoutesFromElements(
//   //   <Route path='/' element={<Root />}>
//   //   <Route path="applicants" element={<ApplicantsLayoutPage />}>
//   //       <Route index element={<ApplicantsPage />} />
//   //       {/* <Route path=":id" element={<ApplicantDetailPage />} /> */}
//   //     </Route>
//   //   </Route>
//   // )
// )

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
