import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { roles } from '../../constant';
import { GuardRoute } from '../../router';

const Salons = React.lazy(() => import('./pages'));
const SalonDetails = React.lazy(() => import('./pages/salon-details'));

const SalonsRoutes = () => {
  return (
    <GuardRoute roles={[roles.SALON, roles.ADMIN]}>
      <Routes>
        <Route index element={<Salons />} />
        <Route path=':salonId' element={<SalonDetails />} />
      </Routes>
    </GuardRoute>
  );
};

export default SalonsRoutes;
