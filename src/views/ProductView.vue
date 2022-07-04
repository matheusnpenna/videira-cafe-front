<template>
  <action-dispatcher action="product/get">
    <section class="views-inventory">
      <h5 class="title-lg">Controle de Estoque</h5>
      <small class="text-secondary">
        Gerencie o estoque dos produtos disponíveis aqui
      </small>
      <hr />
      <div v-for="(product, i) in products" :key="product.id">
        {{ product.name }}
      </div>
    </section>
  </action-dispatcher>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProductView",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState("product", ["products"]),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.views-inventory {
  p {
    max-width: 301px;
  }
}
</style>
