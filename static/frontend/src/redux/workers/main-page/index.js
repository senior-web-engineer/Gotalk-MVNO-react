/* eslint-disable import/prefer-default-export */
import './actions-type';
import API from '../../../axios/api';
import { MAIN } from '../../../axios/api-urls';
import createQueryParams from '../../../shared/createQueryParams';

const api = new API();

export const getPlans = () => api.get(`${MAIN.plans}`);

export const getCurrentPlans = (id) => api.get(`${MAIN.plans}/${id}`);

export const getPopularPlans = (isCompany = false) => {
  const params = createQueryParams({
    popular: true,
    page: 1,
    per_page: 3,
    isCompany,
  });

  return api.get(`${MAIN.plans}${params}`);
};
