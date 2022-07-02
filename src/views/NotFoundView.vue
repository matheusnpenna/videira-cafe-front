<template>
  <div class="not-found pt-5">
    <div class="container text-center py-5">
      <h1 class="mb-4">404</h1>

      <h4 class="mb-4 mb-lg-5">
        A página que você tentou acessar não existe ou está fora do ar.
      </h4>

      <div class="text-center">
        <div class="row justify-content-center">
          <div cllass="col-lg-4">
            <router-link to="/" class="btn btn-outline-primary">
              Voltar para o início
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  h1 {
    font-weight: bold;
    font-size: 64px;
    margin-bottom: 0;
    background: -webkit-linear-gradient(#49a6ca, #8395a7);
    -webkit-text-fill-color: transparent;
    background-clip: text;
    height: fit-content;
    line-height: 4rem;

    @media screen and (max-width: 991px) {
      font-size: 34px;
    }
  }

  h4 {
    font-weight: normal;
    text-align: center;
    color: #828282;

    @media screen and (max-width: 991px) {
      font-size: 16px;
    }
  }

  .btn {
    font-weight: 500;
    font-size: 20px;
    border-width: 2px;

    @media screen and (max-width: 991px) {
      font-size: 16px;
    }
  }
}
</style>
