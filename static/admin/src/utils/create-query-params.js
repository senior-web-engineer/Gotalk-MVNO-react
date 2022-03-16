function createQueryParams(object) {
  let params = '?';
  for (let key in object) {
    const field = object[key];
    params += field && field !== '' && field !== -1 ? `${key}=${field}&` : '';
  }
  return params.substring(-1, params.length - 1);
}
export default createQueryParams;
