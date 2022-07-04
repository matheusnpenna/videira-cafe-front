<template>
  <div
    class="form-group mb-0 py-2"
    :class="{
      'has-icon': !!icon,
      'has-value': !!modelValue,
      'is-date': isDate,
    }"
  >
    <label
      :for="id"
      v-if="label && type !== 'file'"
      :class="{ 'text-danger': showError }"
      >{{ label }}</label
    >
    <i v-if="icon" :class="'icon ' + icon"></i>

    <div v-if="isDate" class="date-picker-wrapper d-flex">
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="Selecione uma data"
        :shortcuts="dateShortcuts"
        :prefix-icon="customDatePrefix"
      >
      </el-date-picker>
    </div>

    <el-select
      v-if="select"
      :class="classObject"
      :id="id"
      v-model="innerValue"
    >
      <el-option value="" :disabled="!nullable">{{ placeholder }}</el-option>
      <el-option
        v-for="(option, index) in options"
        :key="index"
        :label="option.name"
        :value="option.id"
      >
        {{ optionLabelFunction(option) }}
      </el-option>
    </el-select>
    <the-mask
      v-else-if="mask.length"
      :mask="mask"
      :masked="masked"
      v-model="innerValue"
      class="form-control"
      :class="classObject"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="disableAutocomplete ? 'off' : ''"
      :autocorrect="disableAutocapitalize ? 'off' : ''"
      :autocapitalize="disableAutocapitalize ? 'none' : ''"
      :readonly="readonly"
      :disabled="disabled"
    />
    <vue-tel-input
      v-else-if="isPhone"
      v-model="innerValue"
      class="form-control"
      :class="classObject"
      :id="id"
      type="tel"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      @country-changed="countryChanged"
      @validate="(obj) => $emit('validate', obj)"
    />
    <el-input
      v-else-if="textarea"
      type="textarea"
      v-model="innerValue"
      :class="classObject"
      :id="id"
      :placeholder="placeholder"
      :readonly="readonly"
      :autosize="{ minRows: 2, maxRows: 20 }"
      :disabled="disabled"
    />
    <div class="form-password-wrapper" v-else-if="type === 'password'">
      <el-input
        v-model="innerValue"
        :class="classObject"
        :id="id"
        :type="!showPassword && type"
        :placeholder="placeholder"
        :autocomplete="disableAutocomplete ? 'off' : ''"
        :autocorrect="disableAutocapitalize ? 'off' : ''"
        :autocapitalize="disableAutocapitalize ? 'none' : ''"
        :readonly="readonly"
        :disabled="disabled"
      />
      <div v-if="showError && showErrorMessage" class="invalid-feedback">
        {{ errors[0] }}
      </div>
      <button
        type="button"
        class="clear-button"
        :class="{
          'password-icon-position-y-40': errors && errors.length && !label,
          'password-icon-position-y-50': label && (!errors || !errors.length),
          'icon-outline-eye-open': showPassword,
          'icon-outline-eye-closed': !showPassword,
        }"
        @click="showPassword = !showPassword"
      >
        <i :class="!showPassword ? 'icon-preview' : 'icon-preview-off'" />
      </button>
    </div>

    <div class="radio-group text-dark row pt-2" v-else-if="type === 'radio'">
      <div v-for="option in options" :key="option.name" class="col-6">
        <el-input
          :id="option.name"
          type="radio"
          :value="option.name"
          v-model="innerValue"
        />
        <span :for="option.name">{{ option.name }}</span>
      </div>
    </div>

    <money
      v-else-if="isMoney"
      v-model="innerValue"
      class="form-control"
      v-bind="moneyParams"
      :class="classObject"
      :id="id"
      :type="type"
      :maxLength="maxLength"
      :placeholder="placeholder"
      :autocomplete="disableAutocomplete ? 'off' : ''"
      :autocorrect="disableAutocapitalize ? 'off' : ''"
      :autocapitalize="disableAutocapitalize ? 'none' : ''"
      :readonly="readonly"
      :disabled="disabled"
    />

    <el-input
      v-else
      v-model="innerValue"
      :class="classObject"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="disableAutocomplete ? 'off' : ''"
      :autocorrect="disableAutocapitalize ? 'off' : ''"
      :autocapitalize="disableAutocapitalize ? 'none' : ''"
      :readonly="readonly"
      :disabled="disabled"
    />
    <div v-if="showError && showErrorMessage" class="invalid-feedback">
      {{ errors[0] }}
    </div>

    <button
      v-if="withClearButton && modelValue.length"
      class="clear"
      @click="clear"
    >
      <i class="icon-outline-cross"></i>
    </button>
  </div>
</template>

<script>
import { shallowRef, h } from "vue";
import { Money } from "v-money";
const datePrefix = shallowRef({
  render() {
    return h("i", { class: "icon-calendar" });
  },
});
export default {
  components: { Money },
  props: {
    label: {
      type: String,
      default: "",
    },
    isMoney: {
      type: Boolean,
      default: false,
    },
    nullable: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: [String, Array],
      default: "",
    },
    masked: {
      type: Boolean,
      default: false,
    },
    isDate: {
      type: Boolean,
      default: false,
    },
    isPhone: {
      type: Boolean,
      default: false,
    },
    select: {
      type: Boolean,
      default: false,
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    optionLabelFunction: {
      type: Function,
      default: (item) => item.name,
    },
    icon: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    customClass: {
      type: String,
      default: "",
    },
    showErrorMessage: {
      type: Boolean,
      default: true,
    },
    errors: {
      type: Array,
      default: () => [],
    },
    disableAutocapitalize: {
      type: Boolean,
      default: false,
    },
    disableAutocomplete: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    withClearButton: {
      type: Boolean,
      default: false,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPassword: false,
      showError: this.errors && this.errors.length,
      innerValue: this.modelValue,
      date: null,
    };
  },
  computed: {
    customDatePrefix() {
      return datePrefix;
    },
    dateShortcuts: () => [
      {
        text: "Today",
        value: new Date(),
      },
      {
        text: "Ontem",
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          return date;
        },
      },
      {
        text: "Há uma semana",
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          return date;
        },
      },
    ],
    classObject() {
      const result = {
        "is-invalid": this.showError,
        "login-borders": this.isLogin,
        "normal-borders": !this.isLogin,
        "empty-borders": this.innerValue?.length == 0,
      };
      result[this.customClass] = true;
      return result;
    },
  },
  watch: {
    date(newVal) {
      this.innerValue = newVal
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/");
    },
    errors(newVal) {
      if (newVal && !!newVal[0]) {
        this.showError = true;
      } else {
        this.showError = false;
      }
    },
    innerValue(newVal) {
      if (newVal != this.modelValue) {
        this.showError = false;
        this.$emit("update:modelValue", newVal);

        if (this.isDate && newVal.length === 10) {
          this.date = new Date(
            newVal.split("/").reverse().join("-") + "T12:00:00"
          );
        }
      }
      if (this.isPhone && newVal.match(/[a-zA-Z]/)) {
        setTimeout(() => {
          this.innerValue = newVal.replace(/[a-zA-Z]/, "");
        }, 2);
      }
    },
    modelValue: {
      handler(newVal) {
        this.$emit("change");
        if (this.innerValue !== newVal) {
          this.innerValue = newVal;
          this.showError = false;
        }
      },
    },
  },
  methods: {
    countryChanged(obj) {
      this.$emit("country-changed", obj);
      setTimeout(() => {
        this.innerValue = document.querySelector(`#${this.id} input`).value;
      }, 1);
    },
    clear() {
      this.$emit("update:modelValue", "");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.form-group {
  position: relative;

  label {
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.015em;
    margin-bottom: 0.2rem;

    color: #000;
  }

  .form-control.is-invalid {
    background-image: none;
  }

  &.has-icon {
    .icon {
      position: absolute;
      line-height: 44px;
      left: 4px;
    }

    .form-control {
      padding-right: 32px;
    }
  }
  .border-none {
    border: none !important;

    &:focus {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
    
  }

  .clear {
    position: absolute;
    height: 44px;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
  }

  &:not(.has-value) {
    select {
      color: #aeb6c4 !important;
    }
  }

  :deep .vti__dropdown-list {
    z-index: 3;
  }

  .date-picker-wrapper {
    position: absolute;
    top: 10%;
    left: 0;
    transform: translate(-10%, 0);
    z-index: 1;

    button {
      height: 54px;
    }
  }

  &.is-date {
    .form-control {
      padding-left: 40px;
    }
  }

  .form-control:disabled {
    /* .form-control[readonly] { */
    background: #fff;
  }

  .form-password-wrapper {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    .form-control {
      padding-right: 7px;
    }

    .icon-outline-eye-open,
    .icon-outline-eye-closed {
      position: absolute;
      right: 25px;
      top: 50%;
      font-size: 17px;
      cursor: pointer;
      user-select: none;

      color: #959595;
    }
    .password-icon-position-y-40 {
      top: 40%;
    }
    .password-icon-position-y-50 {
      top: 55%;
    }
    .clear-button {
      background-color: transparent;
      padding: 0px;
      margin: 0px;
      border: 0px;
    }
  }

  .radio-group {
    font-size: 16px;

    input[type="radio"] {
      margin-right: 5px;
    }
  }

  .form-control {
    min-height: 44px;
    padding: 0.8rem;
    border-radius: 8px;
    background-color: #e5e5e5;
    letter-spacing: 0.015em;
    color: #000;
    font-size: 14px;
  }

  .login-borders {
    border: 1px solid #595959;
  }
}
</style>
