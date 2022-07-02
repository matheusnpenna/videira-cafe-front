<template>
  <div
    class="template-default d-flex flex-column"
    :class="{ 'locked-menu': lockedMenu }"
  >
    <transition name="fade">
      <div class="blocking-bg d-lg-none" v-if="showMenu" @click="closeMenu" />
    </transition>

    <confirmation
      v-model="logoutDialog"
      @confirm="logout"
      text="Tem certeza que deseja sair?"
      confirm-button-text="Sair"
    />

    <aside
      class="overflow-y-scroll"
      :class="{ open: showMenu, locked: lockedMenu }"
      @mouseenter="openMenu"
      @mouseleave="closeMenu"
    >
      <div
        class="aside-content d-flex flex-column align-items-start pt-4 pb-3 text-white"
      >
        <button class="btn-lock" @click="clickLockMenu">
          <i
            :class="lockedMenu ? 'icon-chevron-left' : 'icon-chevron-right'"
          ></i>
        </button>
        <div class="brand pt-5 pt-lg-0">
          <router-link :to="{ name: 'home' }">
            <img
              v-if="showMenu || lockedMenu"
              src="@/assets/images/logo.svg"
              height="32"
              key="logo"
            />
            <img v-else key="icon" height="32" src="@/assets/images/logo.svg" />
          </router-link>
        </div>

        <router-link
          :to="{ name: 'home' }"
          class="btn mt-3 home"
          @click="closeMenu"
        >
          <i class="icon-home"></i>
          <span v-if="showMenu">Início</span>
        </router-link>
        <router-link
          :to="{ name: 'inventory' }"
          class="btn mt-3 home"
          @click="closeMenu"
        >
          <i class="icon-cart"></i>
          <span v-if="showMenu">Estoque</span>
        </router-link>
      </div>
    </aside>

    <main class="flex-fill ps-5">
      <div class="position-relative slot-wrapper ps-5 pt-4">
        <slot />
        <confirmation
          v-model="logoutDialog"
          title="Sair"
          text="Deseja mesmo sair?"
          @confirm="logout"
        />
      </div>
      <app-footer @logout="logoutDialog = true" />
    </main>
  </div>
</template>

<script>
import AppFooter from "@/components/templates/AppFooter";
import AppHeader from "@/components/templates/AppHeader";
import { mapState } from "vuex";

export default {
  components: { AppFooter, AppHeader },
  data() {
    return {
      popupDialog: false,
      showMenu: false,
      logoutDialog: false,
      menuButtonTimeout: null,
      bgScroll: false,
      lockedMenu: !window.localStorage.getItem("_unlockedMenu"),
      showRootMenu: false,
      openContext: "",
    };
  },
  computed: {
    ...mapState("user", ["messages", "user"]),
    ...mapState(["loading"]),
  },
  watch: {
    $route() {
      this.showRootMenu = false;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    // this.$store.dispatch("user/getMessages").then(data => {
    //   this.popupDialog = !!data.length;
    // });
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 10) {
        this.bgScroll = true;
      } else if (window.scrollY < 10) {
        this.bgScroll = false;
      }
    },
    clickMenuButton() {
      this.setMenuVisibility(!this.showMenu);
    },
    setMenuVisibility(visibility) {
      if (this.menuButtonTimeout) {
        clearTimeout(this.menuButtonTimeout);
      }
      this.menuButtonTimeout = setTimeout(() => {
        this.showMenu = visibility;
      }, 150);
    },
    clickLockMenu() {
      this.lockedMenu = !this.lockedMenu;
      if (this.lockedMenu) {
        window.localStorage.removeItem("_unlockedMenu");
      } else {
        this.showMenu = false;
        window.localStorage.setItem("_unlockedMenu", 1);
      }
    },
    setMenu(value, timeout) {
      if (this.menuButtonTimeout) {
        clearTimeout(this.menuButtonTimeout);
      }
      this.menuButtonTimeout = setTimeout(() => {
        this.showMenu = value;
      }, timeout);
    },
    openMenu() {
      this.setMenuVisibility(true);
    },
    closeMenu() {
      this.setMenuVisibility(false);
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ name: "login" });
      });
    },
    clickMenu() {
      this.closeMenu();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
.template-default {
  min-height: 100vh;
  display: flex;
  position: relative;

  .dropdown-mobile {
    position: fixed;
    width: 72px;
    top: 0;
    z-index: 4;
    right: 0;
  }

  .blocking-bg {
    position: fixed;
    z-index: 3;
    background: rgba(0, 10, 20, 0.5);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  i {
    font-size: 24px;
    min-width: 46px;

    &.menu {
      font-size: 32px;
      line-height: 44px;
      color: rgba(51, 51, 51, 0.6);
    }
  }

  .open-submenu {
    .icon-outline-chevron-right-small-circle {
      transform: rotate(90deg);
    }
  }

  main {
    width: 100%;
    position: relative;
  }

  .slot-wrapper {
    transition: 0.3s padding ease;
  }

  .submenu {
    width: 100%;

    a {
      padding-left: 32px !important;
    }
  }

  .btn-menu {
    position: fixed;
    width: 72px;
    top: 0;
    z-index: 4;
    & > * {
      @media screen and (max-width: 991px) {
        color: #fff !important;
        font-size: 24px !important;
      }
    }
  }

  .blocking-bg {
    position: fixed;
    z-index: 3;
    background: rgba(0, 10, 20, 0.5);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  aside {
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;
    bottom: 0;
    width: 72px;
    display: flex;
    flex-direction: column;
    transition: all 0.1s;

    .brand {
      padding-left: 10px;
    }

    @media screen and (max-width: 575px) {
      width: 0px;
    }

    .aside-content {
      flex: 1 1 auto;
      background: #393444;
      transition: width 0.15s;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);

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
        color: rgba(51, 51, 51, 0.6);

        i {
          font-size: 16px !important;
        }

        @media screen and (max-width: 575px) {
          display: none !important;
        }
      }

      ::v-deep .btn {
        width: 100%;
        color: rgba(255, 255, 255, 0.8);
        display: flex;
        cursor: pointer;
        padding-top: 12px;
        padding-bottom: 12px;
        justify-content: flex-start;

        i {
          color: #928f98;
        }

        &.router-link-active:not(.home):not(.context-option),
        &.router-link-exact-active {
          color: white;
          font-weight: bold;
          border-radius: 0;
          background: rgba(255, 255, 255, 0.05);

          i {
            color: white;
          }

          @media screen and (min-width: 576px) {
            padding-left: 13px;
            border-right: 4px solid white;
          }
          @media screen and (max-width: 575px) {
            padding-left: 9px;
            border-right: 4px solid white;
          }
        }

        span {
          margin-left: 12px;
          white-space: nowrap;
          flex: 1 1 auto;
          text-align: left;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #fff;
        }

        &:hover {
          color: white;
        }
      }

      .active-item-indiciator {
        font-weight: bold;
        border-right: 4px solid white;
        background: rgba(255, 255, 255, 0.05);

        @media screen and (min-width: 576px) {
          padding-left: 13px;
        }
        @media screen and (max-width: 575px) {
          padding-left: 9px;
        }

        i {
          color: white;
        }
      }
    }

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

    &:not(.open):not(.locked) {
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
