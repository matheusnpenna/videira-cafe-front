<template>
  <div>
    <component :is="template">
      <RouterView :key="$route.fullPath" />
    </component>

    <snackbar />
  </div>
</template>

<script>
import { getToken } from "./setup/api";

export default {
  name: "App",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    template() {
      return this.$route.meta.template;
    },
    isLogged() {
      return this.$store.state.user.logged;
    },
    isActive() {
      return this.$store.state.user.user.is_enable;
    },
    showRouterView() {
      return !this.$route.meta.protected || this.isLogged;
    },
  },
  beforeMount() {
    if (!getToken() && this.$route.meta.protected) {
      this.$router.replace({ name: "login" });
    } else if (getToken()) {
      this.$store
        .dispatch("postLogin")
        .then(() => {
          if (this.$user.user && !this.$user.user.is_enable) {
            this.$router.replace({ name: "sale" });
          }
        })
        .catch(() => {
          this.$store.dispatch("logout").then(() => {
            this.$router.push({ name: "login" });
          });
        });

      if (["/login", "/register"].includes(document.location.pathname)) {
        this.$router.replace({ name: "home" });
      }
    }
  },
  watch: {
    $route: function () {
      if (!this.isLogged && this.$route.meta.protected) {
        this.$router.replace({ name: "login" });
      } else if (this.$user.user && !this.$user.user.is_enable) {
        this.$router.replace({ name: "sale" });
      }
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  .page-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    width: 100%;
  }
}
</style>
