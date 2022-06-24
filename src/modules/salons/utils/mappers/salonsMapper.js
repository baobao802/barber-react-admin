export default function salonsMapper(salons) {
  const newSalons = salons?.map((salon) => ({
    id: salon.id,
    isActive: salon.is_active,
    isClosed: salon.is_closed,
    isVerified: salon.is_verified,
    email: salon.email,
    phone: salon.phone_number,
    salonName: salon.salon_name,
  }));

  return {
    salons: newSalons || [],
    totalPages: salons.totalPage,
  };
}
