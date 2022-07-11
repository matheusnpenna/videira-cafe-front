<template>
  <action-dispatcher action="product/get">
    <section class="views-new-inventory">
      <div class="d-flex align-items-center">
        <div>
          <button class="btn text-dark" @click="$router.go(-1)">
            <i class="icon-arrow-left"></i>
          </button>
        </div>
        <div class="flex-fill">
          <h4 class="fw-bold">Estoque do dia</h4>
          <small class="text-secondary">
            Adicione aqui o estoque de hoje
          </small>
        </div>
        <div>
          <button
            v-loading="showLoading"
            class="btn btn-primary"
            @click="submit"
          >
            SALVAR ESTOQUE
          </button>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-lg-6 order-1 order-lg-0">
          <div class="row">
            <div class="col-lg-8">
              <label for="product-id" class="label">Produto</label>
              <br />
              <el-select
                id="product-id"
                v-model="form.product_id"
                placeholder="Selecione o produto"
                size="large"
                class="mb-4"
              >
                <el-option
                  v-for="product in products"
                  :key="product.id"
                  :label="product.name"
                  :value="product.id"
                />
              </el-select>
            </div>
            <div class="col-lg-4">
              <form-group
                v-model="form.amount"
                id="amount"
                type="number"
                label="Quantidade"
                placeholder="0"
                :errors="errors.amount"
              />
            </div>
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-primary btn-block" @click="addItem">
              Adicionar item no estoque
            </button>
          </div>
        </div>
        <div class="col-lg-6 order-0 order-lg-1">
          <el-card
            v-for="(prod, index) in per_product"
            :key="prod.id"
            class="mb-1"
          >
            <div class="d-flex align-items-center">
              <div class="d-flex align-items-center flex-fill">
                <span class="me-3"> Produto: {{ prod.name }} </span>
                <span> Quantidade: {{ prod.amount }} </span>
              </div>
              <button class="btn text-dark" @click="removeItem(index)">
                <i class="icon-cancel-circle"></i>
              </button>
            </div>
          </el-card>
        </div>
      </div>
    </section>
  </action-dispatcher>
</template>

<script>
import { formFields } from "@/functions/helpers";
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "InventoryView",
  data() {
    return {
      showLoading: false,
      ...formFields(["amount", "name", "product_id", "liters"]),
      per_product: [],
    };
  },
  computed: {
    ...mapState("product", ["products"]),
  },
  watch: {
    "form.product_id"(val) {
      if (val) {
        const product = this.products.find((p) => p.id == val);
        this.form.name = product.name;
      }
    },
  },
  methods: {
    formatTimestamp(date_time) {
      return moment(date_time.toDate()).format("DD/MM/YYYY");
    },
    addItem() {
      this.per_product = [...this.per_product, this.form];
      const { form, errors } = formFields([
        "amount",
        "name",
        "product_id",
        "liters",
      ]);
      this.form = form;
      this.errors = errors;
    },
    removeItem(index) {
      this.per_product = this.per_product.filter((_, i) => i != index);
    },
    clear() {
      const { form, errors } = formFields([
        "amount",
        "name",
        "product_id",
        "liters",
      ]);
      this.form = form;
      this.errors = errors;
      this.per_product = [];
    },
    submit() {
      this.showLoading = true;
      this.$store
        .dispatch("inventory/save", {
          per_product: this.per_product,
          total: this.per_product.reduce((prev, curr) => prev + curr.amount, 0),
        })
        .then(() => {
          this.$message.success("O estoque foi salvo");
          this.clear();
          this.$router.push({ name: "inventory" });
        })
        .catch(() => {
          this.$message.error("Erro ao pegar os produtos do banco de dados.");
        })
        .finally(() => {
          this.showLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.views-new-inventory {
  p {
    max-width: 301px;
  }

  .label {
    font-size: 12px !important;
    line-height: 15px !important;
    letter-spacing: 0.015em !important;
    margin-bottom: 0.2rem !important;
    color: #000 !important;
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
