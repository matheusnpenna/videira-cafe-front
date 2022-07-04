import { createStore } from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import state from "./state";

import user from "./user";
import product from "./product";
import inventory from "./inventory";

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user,
    product,
    inventory,
  },
});
