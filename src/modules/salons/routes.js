import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { roles } from '../../constant';
import { GuardRoute } from '../../router';

const Salons = React.lazy(() => import('./pages'));
const SalonDetails = React.lazy(() => import('./pages/salon-details'));
const SalonDetailsModal = React.lazy(() =>
  import('./pages/salon-details-modal'),
);

const SalonsRoutes = () => {
  const location = useLocation();

  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <GuardRoute roles={[roles.SALON, roles.ADMIN]}>
      <Routes location={backgroundLocation || location}>
        <Route index element={<Salons />} />
        <Route path='/salon' element={<SalonDetails />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path=':salonId' element={<SalonDetailsModal />} />
        </Routes>
      )}
    </GuardRoute>
  );
};

export default SalonsRoutes;
