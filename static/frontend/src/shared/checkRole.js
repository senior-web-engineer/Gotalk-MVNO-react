import get from 'lodash/get';

export const USER_ROLES = {
  VISITOR: 'Visitor',
  OWNER: 'Owner',
};

const checkRole = (user = {}) => {
  const role = get(user, 'role', USER_ROLES.VISITOR);

  return role;
};

export default checkRole;
