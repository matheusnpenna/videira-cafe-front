import { dayDiff } from "../functions/helpers";
import store from "../store";

import { defineComponent } from "vue";
export default {
  install(app) {
    const plugin = defineComponent({
      store,
      computed: {
        user() {
          return this.$store.state.user.user;
        },
        service() {
          return this.$store.state.user.user.service;
        },
        isInactive() {
          return (
            this.user && (!this.service.is_active || this.daysToExpire < 0)
          );
        },
        daysToExpire() {
          if (!this.user || !this.service) return "";
          return dayDiff(this.service.expired_at);
        },
      },
    });
    app.config.globalProperties.$user = plugin;
    app.provide("user", { user: plugin });
  },
};
