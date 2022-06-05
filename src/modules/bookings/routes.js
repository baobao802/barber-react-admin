import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { roles } from '../../constant';
import { GuardRoute } from '../../router';

const Bookings = React.lazy(() => import('./pages'));
const BookingDetails = React.lazy(() => import('./pages/booking-details'));

const BookingsRoutes = () => {
  return (
    <GuardRoute roles={[roles.SALON]}>
      <Routes>
        <Route path='/history' element={<Bookings />} />
        <Route path=':bookingId' element={<BookingDetails />} />
      </Routes>
    </GuardRoute>
  );
};

export default BookingsRoutes;
