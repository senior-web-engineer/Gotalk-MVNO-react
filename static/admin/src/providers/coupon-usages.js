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
    const response = await api.get(`v1/couponUsages${params_page}`);
    const data = await get(response, "data.payload.data", []);
    const total = await get(response, "data.payload.meta.total", 0);

    return { data, total };
};

const getOne = async ({ id }) => {
    const response = await api.get(`v1/couponUsages/${id}`);
    const data = await get(response, "data.payload", []);
    return { data };
};

const getManyReference = async ({id}) => {
    const response = await api.get(`v1/couponUsages/byCouponId/${id}`);
    const data = await get(response, "data.payload.data", []);
    const total = await get(response, "data.payload.total", 0);

    return { data, total };
}

export default {
    getList,
    getOne,
    getManyReference
};
