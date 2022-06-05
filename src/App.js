import { Fragment, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrimaryLayout, SecondaryLayout } from './layouts';
import { GuardRoute } from './router';
import { PromptRemove } from './components/ui';
import { roles } from './constant';
import AuthRoutes from './modules/auth/routes';
import BookingsRoutes from './modules/bookings/routes';
import CustomersRoutes from './modules/customers/routes';
import Home from './modules/home/pages';
import NotificationsRoutes from './modules/notifications/routes';
import SalonsRoutes from './modules/salons/routes';

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
              <Route path='bookings/*' element={<BookingsRoutes />} />
              <Route path='notifications/*' element={<NotificationsRoutes />} />
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
