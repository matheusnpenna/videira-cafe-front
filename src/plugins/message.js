import { defineComponent } from "vue";

export default {
  install(app) {
    const plugin = defineComponent({
      data() {
        return {
          color: "",
          content: "",
          showing: false,
        };
      },
      methods: {
        hide() {
          this.showing = false;
        },
        show({ msg, color }) {
          this.content = msg;
          this.color = color;
          this.showing = true;

          setTimeout(() => {
            this.showing = false;
          }, 10 * 1000);
        },
        success(msg) {
          const color = "success";
          this.show({ msg, color });
        },
        warning(msg) {
          const color = "warning";
          this.show({ msg, color });
        },
        error(msg) {
          const color = "danger";
          this.show({ msg, color });
        },
      },
    });
    app.config.globalProperties.$message = plugin;
    app.provide("message", { message: plugin });
  },
};
