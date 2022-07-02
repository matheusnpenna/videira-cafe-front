<template>
  <div class="views-inventory">
    <h2 class="title-lg">Controle de Estoque</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "InventoryView",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState("product", ["products"]),
  },
  methods: {
    dispatch() {
      this.$store
        .dispatch("product/get")
        .then()
        .catch(() => {
          this.$message.error("Erro ao pegar os produtos do banco de dados.");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.views-inventory {
  p {
    max-width: 301px;
  }
}
</style>
