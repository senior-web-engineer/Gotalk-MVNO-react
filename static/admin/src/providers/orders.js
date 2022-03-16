import get from "lodash/get";
import Api from "../axios/api";
import createQueryParams from "../utils/create-query-params";

const api = new Api();

const getList = async (params) => {
  const requestParams = createQueryParams({
    status: "pay",
    page: params.pagination.page,
    per_page: params.pagination.perPage,
  });

  const response = await api.get(`v1/orders${requestParams}`);
  const data = await get(response, "data.payload.data", []);
  const total = await get(response, "data.payload.meta.total", 0);

  return { data, total };
};

const getOne = async ({ id }) => {
  const response = await api.get(`v1/orders/${id}`);
  const data = await get(response, "data.payload", []);

  return { data };
};

const updateDeliveryStatus = ({ status, id }) => api.put(`v1/delivery/${id}`, { status });

const updateIccidDelivery = (data) => api.post(`v1/sim/admin/physical`, data);

const removeOne = async ({ id }) => {
  await api.delete(`v1/orders/${id}`);

  return { data: [] };
};

export default {
  getList,
  getOne,
  updateDeliveryStatus,
  updateIccidDelivery,
  removeOne,
};
