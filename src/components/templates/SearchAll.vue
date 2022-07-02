<template>
  <form class="lesson-search" @submit.prevent="submit">
    <button
      type="button"
      class="btn btn-search"
      v-if="!showing"
      @click="showing = true"
    >
      <i class="icon-search lead" />
    </button>

    <div
      v-if="showing"
      class="d-flex justify-content-between align-items-center"
    >
      <div class="position-relative ml-4">
        <input
          v-model="text"
          type="text"
          class="search-input form-control ps-5"
          placeholder="Pesquisar"
        />
        <button
          type="button"
          class="btn btn-search icon"
          v-if="showing"
          @click="showing = false"
        >
          <i class="icon-search lead" />
        </button>
      </div>

      <!-- <button type="button" class="btn" @click="close">
        <i class="icon-close lead" />
      </button> -->
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      showing: false,
    };
  },
  watch: {
    text(value) {
      this.$emit("input", value);
    },
  },
  methods: {
    close() {
      this.showing = false;
      this.text = "";
    },
    submit() {
      this.$router.push({
        name: "search",
        query: { s: this.text },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.lesson-search {
  .btn-search {
    min-height: 32px;
    min-width: 32px;
    padding: 0;
    border-radius: 8px;
    i {
      color: #fff;
      font-size: 18px;
    }
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .search-input {
    background: transparent;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    &::placeholder {
      color: #767676;
    }
    &::selection {
      border: 1px solid rgba(255, 255, 255, 0.5) !important;
    }
  }
  .form-control {
    color: #767676;
    &::selection {
      border: 1px solid rgba(255, 255, 255, 0.5) !important;
    }
  }
  .icon {
    position: absolute;
    top: 2px;
    left: 13px;
  }

  h5 {
    line-height: 38px;
  }
}
</style>
