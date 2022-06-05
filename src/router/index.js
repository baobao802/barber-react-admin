import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectAuth } from '../modules/auth/services/authSlice';
import { rolesMapper } from '../modules/auth/utils/mappers';

export const GuardRoute = (props) => {
  const { data } = useSelector(selectAuth);
  const location = useLocation();

  if (!data?.accessToken) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (_.size(_.difference(rolesMapper(data.user), props.roles)) === 0) {
    return props.children || <Outlet />;
  }

  return <Navigate to='/404' state={{ from: location }} replace />;
};
