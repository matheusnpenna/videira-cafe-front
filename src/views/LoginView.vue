<template>
  <div class="view-login auth">
    <div>
      <form
        class="border-0 shadow"
        @submit.prevent="submit(forgotPassword, passwordEmailSend)"
      >
        <div class="pb-5">
          <div class="row justify-content-center mb-5 pb-4">
            <div class="col-lg-10 text-center">
              <img height="83.75" width="138" src="@/assets/images/logo.svg" />
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-lg-10">
              <div v-if="forgotPassword && !passwordEmailSend">
                <h2 class="mb-0">Esqueceu sua senha?</h2>

                <p class="mt-4 mb-3">
                  informe seu e-mail e enviaremos instruções para você redefinir
                  sua senha
                </p>

                <form-group
                  v-model="email"
                  id="email"
                  type="email"
                  label="Usúario ou e-mail"
                  placeholder="Dígite seu nome"
                  :errors="errors.email"
                />

                <div class="d-grid mt-4 w-100">
                  <button
                    :disabled="loading"
                    class="btn btn-primary"
                    type="submit"
                  >
                    <loading :show="loading">Enviar</loading>
                  </button>
                </div>
                <div class="d-flex justify-content-center pt-3">
                  <button
                    @click="forgotPassword = false"
                    type="button"
                    class="btn text-primary btn-forgot text-right mb-0"
                  >
                    Voltar para o login
                  </button>
                </div>
              </div>

              <div
                v-else-if="forgotPassword && passwordEmailSend"
                class="h-100 mt-lg-5"
              >
                <div class="w-100 d-flex justify-content-center mb-3">
                  <i class="icon-checkmark changed-password" />
                </div>

                <p class="mb-5 text-center">
                  Sua senha foi redefinida com sucesso!
                </p>

                <div class="d-grid mt-4 w-100">
                  <button
                    :disabled="loading"
                    class="btn btn-primary"
                    type="submit"
                  >
                    <loading :show="loading">Entrar</loading>
                  </button>
                </div>
              </div>

              <div v-else>
                <form-group
                  v-model="email"
                  id="email"
                  type="email"
                  label="Usúario ou e-mail"
                  placeholder="Dígite seu nome"
                  :errors="errors.email"
                />

                <form-group
                  v-model="password"
                  id="password"
                  type="password"
                  label="Senha"
                  placeholder="Dígite sua senha"
                  :errors="errors.password"
                />

                <button
                  @click="forgotPassword = true"
                  type="button"
                  class="btn text-primary btn-forgot text-right mb-0"
                >
                  Esqueceu a senha?
                </button>

                <div class="d-grid mt-4 pt-2 w-100">
                  <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="loading"
                  >
                    <loading :show="loading">Entrar</loading>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "matheusnpenna@gmail.com",
      password: "102030",
      loading: false,
      forgotPassword: false,
      passwordEmailSend: false,
      errors: {
        email: null,
        password: null,
        non_field_errors: null,
      },
    };
  },
  methods: {
    submit(forgotPassword, passwordEmailSend) {
      if (!forgotPassword) {
        this.loading = true;
        this.$store
          .dispatch("user/login", {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.$store.dispatch("postLogin").then(() => {
              if (this.$user.user && !this.$user.user.is_enable) {
                this.$router.replace({ name: "sale" });
              }
            });
            this.$router.replace("/inicio");
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.errors.password = error.response.data.message;
            if (this.errors.non_field_errors) {
              this.$message.error(this.errors.non_field_errors[0]);
            }
          })
          .finally(() => {
            this.loading = false;
          });
      } else if (forgotPassword && !passwordEmailSend) {
        this.passwordEmailSend = true;
      } else {
        this.forgotPassword = false;
        this.passwordEmailSend = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.view-login {
  width: 100%;

  form {
    background: #d9d9d9;
  }
  .changed-password {
    color: #7fb63f;
    font-size: 56px;
  }

  .ms-lg-n5 {
    @media (min-width: 992px) {
      margin-left: -5rem;
    }
  }

  form {
    padding: 8px 0;
  }

  .card-body {
    border-radius: 8px;
    width: 110%;
  }

  .logo {
    max-width: 90px;
  }

  .icon,
  .logo {
    display: block;
    margin: 0 auto;
  }

  .btn-facebook {
    background: #1877f2;
    border-radius: 8.82812px;
    width: 150px;
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    color: #ffffff;

    i {
      font-size: 20px;
    }
  }

  .btn-google {
    background: #ffffff;
    box-shadow: 0px 0px 2.64844px rgba(0, 0, 0, 0.084),
      0px 1.76562px 2.64844px rgba(0, 0, 0, 0.168);
    border-radius: 8.82812px;
    width: 150px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.54);
    i {
      font-size: 21px;
    }
  }

  .btn-forgot {
    min-height: 0;

    padding: 0;

    font-size: 12px;
    text-decoration: none;
    color: #000 !important;
  }

  .badge {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    padding: 32px 0 24px;

    img {
      margin-bottom: 17px;
    }

    strong {
      font-size: 14px;
      line-height: 21px;
      color: 000;
    }

    &.badge-1 {
      background: #d797ff;
    }
    &.badge-2 {
      background: #f88c2a;
    }
    &.badge-3 {
      background: #feca57;
    }
    &.badge-4 {
      background: #54a0ff;
    }
    &.badge-5 {
      background: #ef4d57;
    }
    &.badge-6 {
      background: #9cd33a;
    }
  }

  .subscription {
    background: rgba(200, 214, 229, 0.2);
    border: none;

    .card-body {
      @media screen and (max-width: 991px) {
        flex-direction: column;
        text-align: center;
      }
    }

    h4 {
      color: #000;
    }

    button {
      white-space: nowrap;
      font-weight: bold;
      padding-right: 32px;
      padding-left: 32px;
    }
  }

  a.btn {
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
