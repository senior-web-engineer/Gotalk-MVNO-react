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
  const response = await api.get(`v1/plintron-plans${params_page}`);
  const data = await get(response, "data.payload.data", []);
  const total = await get(response, "data.payload.meta.total", 0);

  return { data, total };
};

const getOne = async ({ id }) => {
  const response = await api.get(`v1/plintron-plans/${id}`);
  const dataResponse = await get(response, "data.payload", []);
  let sms = "";
  let minute = "";
  const minuteCount = dataResponse.minuteCount;
  const SMSCount = dataResponse.SMSCount;
  if (minuteCount === "9007199254740991") {
    minute = "Infinity";
  } else {
    minute = minuteCount;
  }
  if (SMSCount === "9007199254740991") {
    sms = "Infinity";
  } else {
    sms = SMSCount;
  }
  const internet = `${dataResponse.internetCount.value} ${dataResponse.internetCount.unit}`;
  const data = {
    ...dataResponse,
    internetCount: dataResponse.internetCount.value * 1073741824,
    internetFormatted: internet,
    minuteCount: minute,
    SMSCount: sms,
  };
  return { data };
};

const removePlan = async (params) => {
  const response = await api.delete(`v1/plintron-plans/${params.id}`);

  return { data: response.data.payload };
};

const create = async (params) => {
  const response = await api.post(`v1/plintron-plans`, params.data);

  return { data: response.data.payload };
};

const update = async (params) => {
  await api.put(`v1/plintron-plans/${params.data.id}`, params.data);

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
