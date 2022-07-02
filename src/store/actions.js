import { removeToken } from "../setup/api";

export default {
  postLogin(context) {
    return new Promise((resolve, reject) => {
      context.commit("setLoading", true);
      Promise.all([context.dispatch("user/get")])
        .then(() => {
          context.commit("user/setLogged", true);
          resolve();
        })
        .catch(reject)
        .finally(() => {
          context.commit("setLoading", false);
        });
    });
  },

  logout(context) {
    context.commit("user/setLogged", false);
    context.commit("user/setUser", null);
    removeToken();
  },
};
