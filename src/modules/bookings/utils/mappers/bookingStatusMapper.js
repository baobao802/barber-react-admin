const bookingStatusMapper = (status) => {
  if (status === 'new') {
    return 'Chờ xử lý';
  }
  if (status === 'completed') {
    return 'Đã hoàn thành';
  }
  if (status === 'confirmed') {
    return 'Đã xác nhận';
  }
  if (status === 'canceled') {
    return 'Đã hủy';
  }

  return status;
};

export default bookingStatusMapper;
