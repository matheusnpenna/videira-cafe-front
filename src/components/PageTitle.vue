<template>
  <div>
    <h2 class="h2">
      {{ title }}
    </h2>
    <hr class="divider-gold my-3 mt-lg-4 mb-lg-5" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String,
    },
  },
};
</script>
