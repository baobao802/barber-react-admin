export default function customerDetailsMapper(customer) {
  return {
    id: customer.id,
    firstname: customer.first_name,
    lastname: customer.last_name,
    username: customer.username,
    email: customer.email,
    phone: customer.phone_number,
    avatar: customer.avatar,
    gender: customer.gender,
    address: customer.address,
    isActive: customer.is_active,
    isSuperUser: customer.is_superuser,
    isVerified: customer.is_verified,
    totalCompletedBooking: customer.total_completed_booking,
  };
}
