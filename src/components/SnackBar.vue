<template>
  <transition name="fade">
    <div
      v-if="$message.showing"
      :class="`snackbar alert bg-${$message.color} text-white`"
      role="alert"
    >
      <button
        type="button"
        :class="`close ml-4 text-white`"
        aria-label="Close"
        @click="$message.hide()"
      >
        <span aria-hidden="true">
          <i class="icon-outline-cross"></i>
        </span>
      </button>

      <span>{{ $message.content }}</span>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.snackbar {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  max-width: 80%;
  border-radius: 16px;
  border: none;

  .close {
    text-shadow: none;
    opacity: 0.8;

    &:hover {
      opacity: 1 !important;
    }
  }
}
</style>
