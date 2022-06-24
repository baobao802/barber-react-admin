export default function notificationsMapper(notifications) {
  const newNotifications = notifications?.map((notification) => ({
    id: notification.id,
    messageTitle: notification.data.message_title,
    messageBody: notification.data.message_body,
    bookingId: notification.data.screen_redirect.split(':')[1],
    sentAt: notification.data.sended_at,
    unread: notification.unread,
  }));

  return {
    notifications: newNotifications || [],
    totalPages: notifications?.totalPages,
  };
}
