import { roles } from '../../../../constant';

function rolesMapper(user) {
  const mapped = [];
  user.is_salon && mapped.push(roles.SALON);
  user.is_superuser && mapped.push(roles.ADMIN);
  return mapped;
}

export default rolesMapper;
