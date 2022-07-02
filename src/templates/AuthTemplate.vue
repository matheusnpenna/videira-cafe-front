<template>
  <div class="template-auth row mx-1 mx-lg-5">
    <div class="slot-wrapper col-lg-4 py-5">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.template-auth {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;

  @media screen and (max-width: 991px) {
    flex-direction: column;

    justify-content: center;
    background: #e5e5e5;
    .slot-wrapper {
      margin: 0 auto;
      width: 80%;
    }

    .img-bg {
      position: absolute;
      z-index: -1;

      width: 100%;
      height: 100vh;

      opacity: 0.1;
    }
  }
}
</style>
