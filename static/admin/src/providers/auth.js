import Api from "../axios/api";
import get from "lodash/get";

const api = new Api();

const authProvider = {
  login: async ({ username, password }) => {
    try {
      const response = await api.post("v1/auth/adminSignin", {
        email: username,
        password,
      });

      const token = await get(response, "data.token", "");

      localStorage.setItem("auth", JSON.stringify(token));
    } catch (e) {
      throw new Error(e);
    }
  },

  logout: () => {
    localStorage.removeItem("auth");

    return Promise.resolve();
  },

  checkAuth: () => {
    return new Promise((resolve, reject) => {
      const token = window.localStorage.getItem("auth");

      if (token) {
        resolve();
      } else {
        reject({ redirectTo: "/login", logoutUser: false });
      }
    });
  },

  checkError: (error) => {
    const status = error.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject({ message: false });
    }

    return Promise.resolve();
  },

  getIdentity: () => Promise.resolve(),

  getPermissions: () => Promise.resolve(),
};

export default authProvider;
