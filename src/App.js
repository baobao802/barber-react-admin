import { Fragment, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrimaryLayout, SecondaryLayout } from './layouts';
import Home from './modules/home/pages';
import AuthRoutes from './modules/auth/routes';
import CustomersRoutes from './modules/customers/routes';
import { GuardRoute } from './router';
import BlogRoutes from './modules/blogs/routes';
import { PromptRemove } from './components/ui';
import SalonsRoutes from './modules/salons/routes';
import { roles } from './constant';
//
function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<PrimaryLayout />}>
              <Route
                path='/'
                element={
                  <GuardRoute roles={[roles.SALON, roles.ADMIN]}>
                    <Home />
                  </GuardRoute>
                }
              />
              <Route path='customers/*' element={<CustomersRoutes />} />
              <Route path='salons/*' element={<SalonsRoutes />} />
              <Route path='blogs/*' element={<BlogRoutes />} />
            </Route>
            <Route element={<SecondaryLayout />}>
              <Route path='/*' element={<AuthRoutes />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>

      <PromptRemove />
    </Fragment>
  );
}

export default App;
