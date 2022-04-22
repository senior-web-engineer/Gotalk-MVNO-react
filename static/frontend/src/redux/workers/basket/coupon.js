import API from "../../../axios/api";
import {COUPON} from "../../../axios/api-urls";

const api = new API();

export const canUseCoupon = (query) => api.get(COUPON.canUseCoupon, {
    params: query
});
