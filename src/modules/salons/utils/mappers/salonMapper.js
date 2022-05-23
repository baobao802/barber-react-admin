import salonServicesMapper from './salonServicesMapper';

export default function salonMapper(salon) {
  const address = salon.address;
  return {
    id: salon.id,
    avatar: salon.avatar,
    backgroundImage: salon.background_image,
    description: salon.description,
    isActive: salon.is_active,
    isClosed: salon.is_closed,
    isVerified: salon.is_verified,
    email: salon.email,
    username: salon.username,
    phone: salon.phone_number,
    salonName: salon.salon_name,
    totalCompletedBooking: salon.total_completed_booking,
    voteRate: salon.vote_rate,
    firstname: salon.first_name,
    lastname: salon.last_name,
    isSalon: salon.is_salon,
    isSuperUser: salon.is_superuser,
    createdAt: address.created_at,
    province: address.province,
    district: address.district,
    ward: address.ward,
    street: address.hamlet,
    fullAddress: address.address,
    positionUrl: address.position_url,
    coords: {
      lat: address.lat,
      lng: address.lng,
    },
    services: salonServicesMapper(salon.services),
  };
}
