export default (paramsObj) => `?${new URLSearchParams(paramsObj).toString()}`;
