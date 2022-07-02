<template>
  <div class="view-register auth mb-5">
    <div class="container">
      <div class="row">
        <div class="col-md-10 col-lg-12 mx-auto">
          <h1 class="text-center mb-5">
            <img class="img-fluid" src="../assets/images/logo.svg" />
          </h1>

          <form class="border-0 shadow" @submit.prevent="submit">
            <h2 class="text-center text-secondary mb-4">Cadastre-se</h2>

            <form-group
              v-model="form.name"
              id="name"
              type="text"
              label="Nome"
              placeholder="Seu nome"
              :errors="errors.name"
            />

            <form-group
              v-model="form.phone"
              id="phone"
              type="text"
              label="Telefone(Whatsapp):"
              placeholder="Número de celular"
              :errors="errors.phone"
            />

            <form-group
              v-model="form.email"
              id="email"
              type="email"
              label="E-mail"
              placeholder="Seu e-mail"
              :errors="errors.email"
            />

            <form-group
              v-model="form.password"
              id="password"
              type="password"
              label="Senha"
              placeholder="Escolha uma senha"
              :errors="errors.password"
            />
            <p class="small text-justify">
              Ao se registrar, você concorda com nossos
              <a
                href="/termos-de-uso/"
                target="_blank"
                class="text-primary text-decoration-none"
                >Termos de Uso</a
              >
              e
              <a
                href="/politicas-de-privacidade/"
                target="_blank"
                class="text-primary text-decoration-none"
                >Política de Privacidade</a
              >, incluindo o uso de cookies e o envio de comunicações.
            </p>
            <div class="d-grid grip-2 text-center pt-3">
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="!isValid || loading"
              >
                <loading :show="loading">Cadastrar</loading>
              </button>
            </div>
          </form>

          <p class="text-center my-5">
            Já sou cadastrado.
            <router-link :to="{ name: 'login' }" class="fw-bold text-primary">
              Quero entrar!
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formFields, removeMask } from "@/functions/helpers.js";
export default {
  name: "register-view",
  data() {
    return {
      ...formFields(["name", "phone", "email", "password"]),
      terms: false,
      loading: false,
    };
  },
  computed: {
    isValid() {
      let valid = true;
      for (var k in this.form) {
        valid = this.form[k] && this.form[k].length;
      }
      return valid;
    },
  },
  methods: {
    submit() {
      this.$message.hide();

      this.loading = true;

      if (this.form.password.length < 6) {
        this.$message.warning("Sua senha deve conter no mínimo 6 dígitos");
        return;
      }

      this.$store
        .dispatch("user/register", {
          ...this.form,
          phone: removeMask(this.phone),
        })
        .then(() => {
          this.$router.replace({ name: "home" });
        })
        .catch(this.handleErros)
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.view-register {
  width: 100%;
}
</style>
