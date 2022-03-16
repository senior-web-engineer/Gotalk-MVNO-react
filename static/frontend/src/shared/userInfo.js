const userTemplate = [
  'firstName',
  'lastName',
  'email',
  'password',
  'phone',
  'country',
  'city',
  'street',
  'apartment',
  'zip',
];

const getUserInfo = (user) => {
  const userInfoObject = {};

  userTemplate.forEach((key) => {
    userInfoObject[key] = user[key];
  });

  return userInfoObject;
};

export default getUserInfo;
