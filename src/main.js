import { createApp } from "vue";
import VueTelInput from "vue-tel-input";
import VueTheMask from "vue-the-mask";
import ElementPlus from "element-plus";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import locale from "element-plus/lib/locale/lang/pt-br";
import { message, user } from "./plugins/";
import components from "./components";
import "element-plus/dist/index.css";
import { init } from "./setup/api";
import "./assets/icomoon/style.css";
import "./assets/scss/app.scss";
import "moment/locale/pt-br";

init();

const app = createApp(App);
app.use(message);
app.use(user);
app.use(store);
app.use(router);
app.use(ElementPlus, { locale });
app.use(VueTheMask);
app.use(VueTelInput);

app.mount("#app");

for (var i in components) {
  const { name, component } = components[i];
  app.component(name, component);
}
