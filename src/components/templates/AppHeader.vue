<template>
  <header class="templates-app-header text-light py-5">
    <div class="container-fluid pt-lg-5 pb-lg-2">
      adASLSAKDALSDKALSDKLKADS
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style lang="scss" scoped>
.templates-app-header {
  padding: 32px 0;

  header {
    min-height: 76px;
    @media screen and (max-width: 768px) {
      min-height: 55px;
    }

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    flex: 1 1 auto;
    z-index: 3;

    &.bg-scroll {
      background: rgba($color: #000000, $alpha: 0.85);
      backdrop-filter: blur(10px);
    }

    @media screen and (min-width: 992px) {
      z-index: 5;

      :deep .btn {
        font-family: "Inter";
        color: #fff !important;
        font-size: 16px;
      }
    }

    @media screen and (max-width: 575px) {
      right: 0;
      top: 0;
      left: 0;
      z-index: 3;
      position: fixed;
    }

    a {
      font-weight: bold;
      font-size: 12px;
      color: #fff;
    }

    .brand {
      @media screen and (max-width: 991px) {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-weight: bold;
      }

      img {
        max-height: 35.54px;
      }
    }

    i {
      font-size: 20px;
    }
  }

}
</style>
