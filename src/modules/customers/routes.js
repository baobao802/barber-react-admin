import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { roles } from '../../constant';
import { GuardRoute } from '../../router';

const Customers = React.lazy(() => import('./pages'));
const CustomerDetails = React.lazy(() => import('./pages/customer-details'));

const CustomersRoutes = () => {
  return (
    <GuardRoute roles={[roles.ADMIN]}>
      <Routes>
        <Route index element={<Customers />} />
        <Route path=':customerId' element={<CustomerDetails />} />
      </Routes>
    </GuardRoute>
  );
};

export default CustomersRoutes;
