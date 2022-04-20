/* eslint-disable import/no-anonymous-default-export */
import get from "lodash/get";
import Api from "../axios/api";
import createQueryParams from "../utils/create-query-params";

const api = new Api();

const getList = async (params) => {
  const params_page = createQueryParams({
    page: params.pagination.page,
    per_page: params.pagination.perPage,
  });
  const response = await api.get(`v1/plintron-plans/wholesales${params_page}`);
  const data = await get(response, "data.payload.data", []);
  const total = await get(response, "data.payload.meta.total", 0);

  return { data, total };
};

const getOne = async ({ id }) => {
  const response = await api.get(`v1/plintron-plans/wholesales/${id}`);
  const data = await get(response, "data.payload", []);
  return { data };
};

const removePlan = async (params) => {
  const response = await api.delete(
    `v1/plintron-plans/wholesales/${params.id}`,
  );

  return { data: response.data.payload };
};

const create = async (params) => {
  const response = await api.post(`v1/plintron-plans/wholesales`, params.data);

  return { data: response.data.payload };
};

const update = async (params) => {
  await api.put(`v1/plintron-plans/wholesales/${params.data.id}`, params.data);

  return {
    data: {
      id: params.data.id,
    },
  };
};

export default {
  getList,
  getOne,
  removePlan,
  create,
  update,
};
