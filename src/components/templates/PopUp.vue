<template>
  <div class="templates-pop-up p-3 text-center">
    <h4>{{ message.title }}</h4>
    <div class="text-secondary mb-4" v-html="message.text" />
    <button class="btn btn-primary px-5" @click="$emit('close')">Fechar</button>
  </div>
</template>

<script>
import get from "lodash/get";

export default {
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    message() {
      return get(this.messages, "[0]", {});
    },
  },
};
</script>
