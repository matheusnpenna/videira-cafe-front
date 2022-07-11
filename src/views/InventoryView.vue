<template>
  <action-dispatcher action="inventory/get">
    <section class="views-inventory">
      <div class="d-flex align-items-center">
        <div class="flex-fill">
          <h5 class="title-lg">Controle de Estoque</h5>
          <small class="text-secondary">
            Gerencie o estoque dos produtos disponíveis aqui
          </small>
        </div>
        <router-link :to="{ name: 'inventory-new' }" class="btn btn-primary">
          Adicionar estoque de hoje
        </router-link>
      </div>
      <hr />
      <el-card
        v-for="inventory in inventories"
        :key="inventory.id"
        class="card-box mb-4"
      >
        <div class="d-flex align-items-center">
          <h5 class="mb-4 flex-fill">
            Dia: {{ formatTimestamp(inventory.created_at) }}
          </h5>
          <el-dropdown>
            <span class="btn-dot-menu el-dropdown-link text-dark">...</span>
            <template #dropdown>
              <el-dropdown-menu class="wrapper-dropdown">
                <el-dropdown-item>
                  <button class="btn text-dark" @click="toEdit(inventory.id)">
                    <i class="icon-pencil me-2" /> Editar
                  </button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div v-for="(item, i) in inventory.per_product" :key="`item-${i}`">
          <h6 class="text-uppercase">{{ item.name }}: {{ item.amount }}</h6>
        </div>
      </el-card>
    </section>
  </action-dispatcher>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "InventoryView",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState("inventory", ["inventories"]),
  },
  methods: {
    toEdit(id) {
      this.$router.push({ name: "inventory-edit", params: { id } });
    },
    formatTimestamp(date_time) {
      return moment(date_time.toDate()).format("DD/MM/YYYY");
    },
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

  .card-box {
    position: relative;

    .dropdown-menu {
      position: absolute;
      top: 2%;
      right: 1%;
    }
  }
}
</style>
