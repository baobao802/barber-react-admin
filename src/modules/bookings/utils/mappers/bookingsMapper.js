export default function bookingsMapper(bookings) {
  const newBookings = bookings?.map((booking) => ({
    id: booking.id,
    updatedAt: booking.created_at,
    status: booking.status,
    user: {
      id: booking.user?.id,
      firstname: booking.user?.first_name,
      lastname: booking.user?.last_name,
      phone: booking.user?.phone_number,
    },
  }));

  return {
    bookings: newBookings || [],
    totalPages: bookings?.totalPages,
  };
}
