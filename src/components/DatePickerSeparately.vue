<template>
  <div class="form-group mb-0 py-2 me-3">
    <label for="tel-user">{{ label }}</label>
    <div class="d-flex">
      <el-select
        v-model="dayPicked"
        :disabled="readonly"
        :placeholder="dayPicked"
        class="form-control normal-borders me-3"
        size="large"
      >
        <el-option v-for="day in 31" :key="day" :label="day" :value="day" />
      </el-select>

      <el-select
        v-model="monthPicked"
        :disabled="readonly"
        :placeholder="dayPicked"
        class="form-control normal-borders me-3"
        size="large"
      >
        <el-option v-for="day in 12" :key="day" :label="day" :value="day" />
      </el-select>

      <el-select
        v-model="yearPicked"
        :disabled="readonly"
        :placeholder="dayPicked"
        class="form-control normal-borders"
        size="large"
      >
        <el-option
          v-for="day in currentYear - 1900"
          :key="day"
          :label="1900 + day"
          :value="1900 + day"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      default: "Selecione uma data",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      dayPicked: 27,
      monthPicked: 8,
      yearPicked: 1998,
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
    date() {
      return `${this.dayPicked}-${this.monthPicked}-${this.yearPicked}`;
    },
  },
  watch: {
    date: {
      handler(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.readonly {
  & * {
    pointer-events: none;
  }
}

.form-control {
  min-height: 48px;
  border-radius: 8px;
  background-color: transparent;
  letter-spacing: 0.015em;
  color: #ffffff;
  font-size: 14px;
}

.normal-borders {
  border: 1px solid #cfcfcf;
}

:deep .el-select {
  .el-input.is-focus .el-input__inner {
    box-shadow: none !important;
  }

  .el-input__inner {
    background: none;
    box-shadow: none !important;

    padding-right: 0 !important;

    color: #fff;
  }

  .el-input__suffix {
    right: 0 !important;
  }
}

/* :deep .el-select {
  & * {
    border: none;
    outline: none;
    background: red;
  }
} */
</style>
