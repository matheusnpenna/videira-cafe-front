<template>
  <div
    class="avatar-user bg-white d-flex justify-content-center align-items-center"
    :style="user.photo ? `background-image: url(${user.photo})` : ''"
    :class="[
      `${user.photo ? '' : 'bg-white'}`,
      {
        'size-sm': size === 'sm',
        'size-md': size === 'md',
        'size-lg': size === 'lg',
      },
    ]"
  >
    {{ !user.photo ? (user.name?.length ? user.name[0] : user.email[0]) : "" }}
  </div>
</template>

<script>
export default {
  props: {
    user: {
      required: true,
      type: Object,
    },
    size: {
      required: false,
      default: "md",
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-user {
  overflow: hidden;

  border-radius: 50%;

  font-weight: 500;

  font-family: "Inter";
  color: #181717;

  &.size-sm {
    min-width: 32px;
    min-height: 32px;

    width: 32px;
    height: 32px;

    font-size: 16px;
    line-height: 20px;
  }

  &.size-md {
    min-width: 50px;
    min-height: 50px;
    width: 50px;
    height: 50px;

    font-weight: 500;
    font-size: 38.5px;
    line-height: 47px;
  }

  &.size-lg {
    min-width: 82px;
    min-height: 82px;
    width: 82px;
    height: 82px;

    font-weight: 500;
    font-size: 38.5px;
    line-height: 47px;
  }

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
