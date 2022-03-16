/* eslint-disable import/no-anonymous-default-export */
import Api from '../axios/api';
import { get } from 'lodash';
import createQueryParams from './../utils/create-query-params';

const api = new Api();
const getList = async (params) => {
  const params_page = createQueryParams({
    page: params.pagination.page,
    per_page: params.pagination.perPage,
  });
  const response = await api.get(`v1/users${params_page}`);
  const data = await get(response, 'data.payload.data', []);
  const total = await get(response, 'data.payload.meta.total', 10);
  return { data, total: total };
};

let idPlintronPlan;
let statusPlintronPlan = '';
let typePlintronPlan = '';

const getOne = async (params) => {
  if (params.isEdit === true) {
    const response = await api.get(`v1/sim/admin/${params.idPlan}`);
    idPlintronPlan = params.idPlan;
    const data = await get(response, 'data.payload', []);
    statusPlintronPlan = data.status;
    typePlintronPlan = data.type;
    return { data };
  } else {
    const response = await api.get(`v1/users/details/${params.id}`);

    const data = await get(response, 'data.payload', []);

    return { data };
  }
};

const removeOne = async ({ id }) => {
  await api.delete(`v1/users/${id}`);
  return { data: [] };
};

const updateTypeSim = async (params) => {
  const response = await api.put(`v1/sim/admin/${idPlintronPlan}`, {
    type: params.type,
  });
  return { data: response.data };
};

const updateAll = async (params, record) => {
  if (statusPlintronPlan === 'FREE') {
    const response = await api.put(`v1/sim/admin/${idPlintronPlan}`, {
      type: params.type,
    });
    return { data: response.data };
  } else {
    if (params.type === 'esim') {
      const response = await api.post('v1/sim/admin/change', {
        simId: idPlintronPlan,
        simType: params.type,
      });
      return { data: response.data };
    } else {
      const response = await api.post('v1/sim/admin/change', {
        simId: idPlintronPlan,
        simType: params.type,
        delivery: params.delivery,
        newSim: params.newSim,
      });
      return { data: response.data };
    }
  }
};

const updateIccid = async (params) => {
  if (statusPlintronPlan === 'FREE') {
    const response = await api.put(`v1/sim/admin/${idPlintronPlan}`, {
      type: params.type,
    });
    return { data: response.data };
  } else {
    if (typePlintronPlan === 'esim') {
      const response = await api.post('v1/sim/admin/change', {
        simId: idPlintronPlan,
        simType: typePlintronPlan,
      });
      return { data: response.data };
    } else {
      const response = await api.post('v1/sim/admin/change', {
        simId: idPlintronPlan,
        simType: typePlintronPlan,
        delivery: params.delivery,
        newSim: params.newSim,
      });
      return { data: response.data };
    }
  }
};
const updateSimStatus = async (productId, userId, status) => {
  const response = await api.post('v1/sim/admin/change-status', {
    productId,
    userId,
    status,
  });

  return response.data;
};

const updateRoleUser = async (userId, role) => {
  const response = await api.put('v1/users', {
    role,
    userId
  });

  return response.data;
};

export default {
  getList,
  getOne,
  removeOne,
  updateTypeSim,
  updateAll,
  updateIccid,
  updateSimStatus,
  updateRoleUser,
};
