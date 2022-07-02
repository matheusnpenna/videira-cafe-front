<template>
  <aside class="templates-mobile-menu" :class="{ open: open }">
    <main-menu
      class="d-flex flex-column flex-fill pt-5 pb-4 pl-2"
      @click-menu="$emit('close')"
      @logout="$emit('logout')"
    />
  </aside>
</template>

<script>
import MainMenu from "./MainMenu";

export default {
  components: { MainMenu },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.templates-mobile-menu {
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  -ms-overflow-style: none;
  scrollbar-width: none;

  .progress-wrapper {
    color: white !important;
    padding: 12px 8px !important;

    .progress-bar {
      background: #367e99;
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 575px) {
    width: 0px;
  }

  .templates-main-menu {
    flex: 1 1 auto;
    background: #181717;
    transition: width 0.3s;

    .btn-lock {
      position: absolute;
      right: 8px;
      top: 101px;
      border: none;
      border-radius: 24px;
      height: 24px;
      width: 24px;
      background: white;
      display: none;
      z-index: 3;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
      justify-content: center;
      align-items: center;
      padding: 0;
      color: #fff;

      i {
        font-size: 16px !important;
      }

      @media screen and (max-width: 575px) {
        display: none !important;
      }
    }

    .btn {
      width: 100%;
      display: flex;
      cursor: pointer;
      padding-top: 12px;
      padding-bottom: 12px;

      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      color: #ffffff;

      &.router-link-active:not(.home),
      &.router-link-exact-active {
        font-weight: 700;
        color: #f45900;
      }

      span {
        white-space: nowrap;
        flex: 1 1 auto;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      &:hover {
        color: white;
      }
    }
  }

  transition: all 0.3s;

  &.locked {
    @media screen and (min-width: 576px) {
      width: 300px;
      padding-right: 20px;

      .btn-lock {
        display: flex;
      }
    }
  }

  &.open {
    width: 300px;
    padding-right: 20px;

    .btn-lock {
      display: flex;
    }
  }

  @media screen and (max-width: 991px) {
    .dropdown-menu {
      max-width: 260px;

      .dropdown-item {
        white-space: normal;
      }
    }
  }
}
</style>
