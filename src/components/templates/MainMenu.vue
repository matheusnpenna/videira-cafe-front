<template>
  <div class="templates-main-menu d-flex align-items-center">
    <router-link
      :to="{ name: 'home' }"
      class="btn"
      @click="$emit('click-menu')"
    >
      <span>Início</span>
    </router-link>
    <router-link
      :to="{ name: 'courses' }"
      class="btn"
      @click="$emit('click-menu')"
    >
      <span>Cursos</span>
    </router-link>
    <router-link
      :to="{ name: 'masters' }"
      class="btn"
      @click="$emit('click-menu')"
    >
      <span>Mestres</span>
    </router-link>
    <router-link
      :to="{ name: 'library' }"
      class="btn"
      @click="$emit('click-menu')"
    >
      <span>Biblioteca digital</span>
    </router-link>
    <router-link
      :to="{ name: 'conferences' }"
      class="btn"
      @click="$emit('click-menu')"
    >
      <span>Conferência Fiel</span>
    </router-link>
    <router-link
      :to="{ name: 'my-list' }"
      class="btn"
      @click="$emit('click-menu')"
    >
      <span>Minha Lista</span>
    </router-link>
    <div class="flex-fill" />

    <search-all class="hide-footer me-2" />

    <!-- <el-dropdown>
      <action-dispatcher action="notifications/getAll" />
      <span class="el-dropdown-link">
        <button class="btn btn-notify">
          <i class="icon-bell"
            ><span class="counter" v-if="notifications.length > 0">{{
              div
            }}</span></i
          >
        </button>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="el-dropdown-notifications">
          <el-dropdown-item v-if="notifications.length == 0">
            Sem notificações no momento
          </el-dropdown-item>
          <el-dropdown-item
            class="el-dropdown-links"
            v-for="notification in notifications"
            :key="notification.id"
            >{{ notification.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown> -->

    <el-dropdown>
      <span class="el-dropdown-link">
        <div class="d-lg-flex align-items-lg-center">
          <user-avatar
            class="mx-2 mx-lg-0"
            :user="$store.state.user?.user ?? 'J'"
            size="sm"
          />
          <button class="btn btn-account">
            <i class="icon-chevron-down text-primary"></i>
          </button>
        </div>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="wrapper-dropdown container no-left">
          <div class="pt-4 px-4">
            <h2 class="mb-0">Olá, {{ user.name }}</h2>
          </div>

          <div>
            <hr class="mt-4" />
          </div>

          <el-dropdown-item>
            <router-link
              :to="{ name: 'my-profile' }"
              class="btn ps-0"
              @click="$emit('click-menu')"
            >
              Meu perfil
            </router-link>
          </el-dropdown-item>

          <el-dropdown-item>
            <router-link
              :to="{ name: 'account' }"
              class="btn ps-0"
              @click="$emit('click-menu')"
            >
              Conta
            </router-link>
          </el-dropdown-item>

          <el-dropdown-item>
            <router-link
              :to="{ name: 'signature' }"
              class="btn ps-0"
              @click="$emit('click-menu')"
            >
              Assinatura
            </router-link>
          </el-dropdown-item>

          <el-dropdown-item>
            <router-link
              :to="{ name: 'signature' }"
              class="btn ps-0"
              @click="$emit('click-menu')"
            >
              Ajuda
            </router-link>
          </el-dropdown-item>

          <el-dropdown-item>
            <button class="btn ps-0" @click="$emit('logout')">Sair</button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserAvatar from "../UserAvatar.vue";
import SearchAll from "./SearchAll";
import ActionDispatcher from "../ActionDispatcher.vue";

export default {
  components: { SearchAll, UserAvatar, ActionDispatcher },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("notifications", ["notifications"]),
  },
  methods: {
    clickDropdown() {
      this.$emit("click-menu");
      this.$refs.dropdown.hide(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-logout {
  color: hsla(0, 100%, 64%, 1) !important;
}

:deep .router-link-exact-active {
  &,
  & > * {
    font-weight: 700;
    color: #f45900 !important;
  }
}
.templates-main-menu {
  .btn {
    font-weight: 400;
    color: #fff;
  }

  .user-picture {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }

  .user-name-letter {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #181717;
    height: 32px;
    width: 32px;
    background: #ffffff;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-notify {
    color: #fff;
    i {
      font-size: 18px;
      .counter {
        font-size: 10px;
        position: relative;
        top: 10px;
        right: 2px;
        background-color: #f45900;
        padding: 4px;
        border-radius: 3px;
        color: white;
        font-weight: 700;
        
      }
    }
  }

  :deep .btn {
    display: flex;
    align-items: center;
  }

  :deep .dropdown-item {
    text-transform: uppercase !important;
    color: #fff !important;
    font-size: 12px;
    padding-top: 6px;
    padding-bottom: 6px;
  }
}
.el-dropdown-notifications {
  background-color: #0b0b0b;
  border: 1px solid transparent;
  padding: 10px;
  max-width: 540px;
  :deep .el-dropdown-menu__item {
    color: white;
    &:hover {
      background-color: #333333 !important;
      color: white;
    }
  }
}

.wrapper-dropdown {
  background: #0b0b0b;
  border: 1px solid transparent;

  padding: 1rem 0 !important;
  margin-top: 28px;

  height: 80vh;
  max-height: 540px;

  & :deep > * {
    padding-left: 5rem !important;
    padding-right: 5rem !important;
  }

  hr {
    background: white;
    height: 2px;
  }

  :deep .el-dropdown__popper {
    background: red;
  }

  :deep .el-dropdown-menu__item {
    a {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    &,
    & * {
      color: #fff;
    }

    &:hover {
      background-color: #333333 !important;
    }

    i {
      font-size: 20px;
      color: black;
      margin-right: 1rem;
    }
  }
}
</style>
