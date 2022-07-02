<template>
  <div class="action-dispatcher">
    <template v-if="loading">
      <div class="d-flex justify-content-center p-3 py-5" :class="loadingClass">
        <div class="spinner-border text-primary" />
      </div>
    </template>

    <div class="error p-4 pt-5 text-center" v-else-if="error">
      <div class="pt-lg-5"></div>
      Erro!
      <button class="btn-link link" @click="dispatch">Tentar novamente</button>
    </div>
    <slot v-else v-bind:data="data" />
  </div>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      required: true,
    },
    parameters: {
      type: [Object, Number, String],
      default: null,
    },
    loadingClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: true,
      error: false,
      data: null,
    };
  },
  mounted() {
    this.dispatch();
  },
  methods: {
    dispatch() {
      this.loading = true;
      this.$store
        .dispatch(this.action, this.parameters)
        .then((data) => {
          this.error = false;
          this.data = data;
          this.$emit("success", data);
        })
        .catch((error) => {
          this.error = true;
          this.$emit("error", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.action-dispatcher {
  .error {
    .link {
      padding: 0;
      border: none;
      background: transparent;
    }
  }
}
</style>
