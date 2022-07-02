<template>
  <default-template>
    <div class="pt-3 pt-lg-5 px-lg-5 mx-lg-5 py-5">
      <div class="bg-gray-base ps-4 py-5 px-lg-5 mt-5">
        <div class="row w-100 m-0">
          <div class="col-lg-9 p-0">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </default-template>
</template>

<script>
import DefaultTemplate from "./DefaultTemplate.vue";

export default {
  components: {
    DefaultTemplate,
  },
};
</script>
