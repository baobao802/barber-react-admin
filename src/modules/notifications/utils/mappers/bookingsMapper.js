export default function notificationsMapper(notifications) {
  const newNotifications = notifications?.map((notification) => ({
    ...notification,
  }));

  return {
    notifications: newNotifications,
    totalPages: notifications.totalPage,
  };
}
