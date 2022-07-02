<template>
  <footer class="templates-app-footer text-light py-5">
    <div class="container-fluid pt-lg-5 pb-lg-2">
      <div class="row align-items-center">
        <div class="col-lg-4 mb-4 mb-lg-0 text-center text-lg-start order-2 order-lg-1">
          <router-link to="/about/" class="mb-lg-3">Sobre</router-link><br class="d-lg-none" />
          <br/>
          <router-link to="/politica-privacidade" class="mb-3">Termos e condições</router-link><br /><br class="d-lg-none"/>
          <router-link to="/politica-privacidade">Privacidade</router-link>
        </div>
        <div class="col-lg-4 order-1 order-lg-2 text-center">
          <img
            class="mb-5"
            width="120"
            height="35.54"
            src="@/assets/images/logo.svg"
          />
          <p class="d-none d-lg-block">
            FIEL DIGITAL TODOS OS DIREITOS RESERVADO
            <br />
            CNPJ: 51.548.758/0001-08
          </p>
        </div>
        <div class="col-lg-4 order-3 ">
          <div class="d-flex justify-content-lg-end mb-4 mb-lg-0  text-lg-end text-center justify-content-center">
            <p class="me-3 media">Redes Sociais</p>
            <a target="_blank" href="https://www.instagram.com/ministeriofiel/" class=" pt-1"><i class="icon-instagram"></i></a>
            <a target="_blank" href="https://web.facebook.com/MinisterioFiel" class="mx-3 pt-1"><i class="icon-facebook"></i></a>
            <a target="_blank" href="https://www.youtube.com/channel/UCj2mZx3rVo6jvChAFZpm98Q" class="pt-1"><i class="icon-youtube"></i></a>
          </div>
          <p class="d-lg-none text-center">
            FIEL DIGITAL TODOS OS DIREITOS RESERVADO
            <br />
            CNPJ: 51.548.758/0001-08
          </p>
        </div>
        
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style lang="scss" scoped>
.templates-app-footer {
  background: linear-gradient(
      0deg,
      rgba(254, 242, 0, 0.01),
      rgba(254, 242, 0, 0.01)
    ),
    #0f0f0f85;
  padding: 32px 0;

  :deep .hide-footer {
    display: none !important;
  }

  :deep a,
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #bfbfbf;
    text-decoration: none;
    

    i {
      font-size: 18px;
      color: #bfbfbf;
    }

    &:hover {
      opacity: 1;
    }
  }
  .media{
    padding-top: 2px;
  }
}
</style>
