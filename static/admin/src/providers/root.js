import axios from "axios";
import RESOURCE_NAMES from "../resource/resource-names";
import orders from "./orders";
import user from "./users";
import plans from "./plans";
import plansPlintron from "./plans-plintron";
import plansWholesales from "./plans-wholesales";
import { get } from "lodash";

const dataProvider = {
  getList: async (resource, params) => {
    switch (resource) {
      case RESOURCE_NAMES.ORDERS:
        return orders.getList(params);

      case RESOURCE_NAMES.USER:
        return user.getList(params);

      case RESOURCE_NAMES.PLANS:
        return plans.getList(params);

      case RESOURCE_NAMES.PLANS_PLINTRON:
        return plansPlintron.getList(params);

      case RESOURCE_NAMES.PLANS_WHOLESALES:
        return plansWholesales.getList(params);
      default:
        return { data: [], total: 0 };
    }
  },

  getOne: async (resource, params) => {
    switch (resource) {
      case RESOURCE_NAMES.ORDERS:
        return orders.getOne(params);

      case RESOURCE_NAMES.USER:
        return user.getOne(params);

      case RESOURCE_NAMES.PLANS:
        return plans.getOne(params);

      case RESOURCE_NAMES.PLANS_PLINTRON:
        return plansPlintron.getOne(params);

      case RESOURCE_NAMES.PLANS_WHOLESALES:
        return plansWholesales.getOne(params);

      default:
        return { data: [] };
    }
  },

  getMany: async (resource, params) => Promise.resolve(),

  getManyReference: async (resource, params) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/${resource}/1`,
    );

    return { data: response.data, total: 10 };
  },

  create: async (resource, params) => {
    switch (resource) {
      case RESOURCE_NAMES.PLANS:
        return plans.create(params);
      case RESOURCE_NAMES.PLANS_PLINTRON:
        return plansPlintron.create(params);
      case RESOURCE_NAMES.PLANS_WHOLESALES:
        return plansWholesales.create(params);
      default:
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/${resource}/1`,
        );

        return { data: response.data, total: 10 };
    }
  },

  update: async (resource, params) => {
    switch (resource) {
      case RESOURCE_NAMES.USER:
        return { data: { ...params.data } };
      case RESOURCE_NAMES.PLANS:
        return plans.update(params);
      case RESOURCE_NAMES.PLANS_PLINTRON:
        return plansPlintron.update(params);
      case RESOURCE_NAMES.PLANS_WHOLESALES:
        return plansWholesales.update(params);
      case RESOURCE_NAMES.ORDERS:
        const ordersId = get(params, "data.id", "");
        return { data: { id: ordersId } };
      default:
        return { data: { ...params.data } };
    }
  },

  updateMany: async (resource, params) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/${resource}/1`,
    );

    return { data: response.data, total: 10 };
  },

  delete: async (resource, params) => {
    switch (resource) {
      case RESOURCE_NAMES.PLANS:
        return plans.removePlan(params);

      case RESOURCE_NAMES.PLANS_PLINTRON:
        return plansPlintron.removePlan(params);

      case RESOURCE_NAMES.PLANS_WHOLESALES:
        return plansWholesales.removePlan(params);

      case RESOURCE_NAMES.ORDERS:
        return orders.removeOne(params);

      case RESOURCE_NAMES.USER:
        return user.removeOne(params);
      default:
        return { data: [] };
    }
  },

  deleteMany: async (resource, params) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/${resource}/1`,
    );

    return { data: response.data, total: 10 };
  },
};

export default dataProvider;
