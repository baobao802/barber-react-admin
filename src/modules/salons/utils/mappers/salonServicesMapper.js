export default function salonServicesMapper(salonServices) {
  return (
    salonServices?.map(({ id, price, service }) => ({
      id,
      serviceName: service.name,
      servicePrice: price.amount,
    })) || []
  );
}
