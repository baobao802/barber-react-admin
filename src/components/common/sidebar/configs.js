import { roles } from '../../../constant';
import { Dashboard, History, Shop, User } from '../../icons';

export const configs = [
  {
    title: 'Dashboard',
    path: '/',
    icon: Dashboard,
    roles: [roles.ADMIN, roles.SALON],
  },
  {
    title: 'Quản lý người dùng',
    path: '/customers',
    icon: User,
    roles: [roles.ADMIN],
  },
  {
    title: 'Quản lý salons',
    path: '/salons',
    icon: Shop,
    roles: [roles.ADMIN],
  },
  {
    title: 'Quản lý salon',
    path: '/salons/salon',
    icon: Shop,
    roles: [roles.SALON],
  },
  {
    title: 'Lịch sử khách hàng',
    path: '/bookings/history',
    icon: History,
    roles: [roles.SALON],
  },
  // {
  //   title: 'Thông báo',
  //   path: '/notifications',
  //   icon: Bell,
  //   roles: [roles.SALON],
  // },
];
