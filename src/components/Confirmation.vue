<template>
  <el-dialog
    :model-value="modelValue"
    @closed="closed"
    custom-class="confirmation"
  >
    <div class="text-center">
      <h4>{{ title }}</h4>
      <div v-html="text" class="pb-4" />
    </div>

    <template #footer>
      <div class="d-flex justify-content-between">
        <button
          type="button"
          class="btn btn-outline-secondary px-5"
          @click="cancel"
        >
          Cancelar
        </button>
        <button type="button" class="btn btn-primary px-5" @click="confirm">
          Confirmar
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    modelValue: Boolean,
    title: String,
    text: String,
  },
  methods: {
    cancel() {
      this.$emit("cancel");
      this.closed();
    },
    confirm() {
      this.$emit("confirm");
      this.closed();
    },
    closed() {
      this.$emit("update:modelValue", false);
    },
  },
};
</script>

<style lang="scss">
.confirmation {
  width: 80% !important;
  max-width: 400px !important;
  background-color: #333;

  --el-dialog-bg-color: #333 !important;
  .el-dialog__body,
  .el-dialog__header {
    .text-center {
      color: #f5f5f5;
    }
  }
}
</style>
