export default function bookingDetailsMapper(booking) {
  return {
    id: booking.id,
    createdAt: booking.created_at,
    updatedAt: booking.created_at,
    status: booking.status,
    services: booking.booking_services?.map(({ id, price, service }) => ({
      id,
      servicePrice: price.amount,
      serviceName: service.name,
    })),
    totalPrice: booking.total_net.amount,
    user: {
      id: booking.user?.id,
      firstname: booking.user?.first_name,
      lastname: booking.user?.last_name,
      phone: booking.user?.phone_number,
    },
  };
}
