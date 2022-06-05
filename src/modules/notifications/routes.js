import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { roles } from '../../constant';
import { GuardRoute } from '../../router';

const Notifications = React.lazy(() => import('./pages'));

const NotificationsRoutes = () => {
  return (
    <GuardRoute roles={[roles.SALON]}>
      <Routes>
        <Route index element={<Notifications />} />
      </Routes>
    </GuardRoute>
  );
};

export default NotificationsRoutes;
