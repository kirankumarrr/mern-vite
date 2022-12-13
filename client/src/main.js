import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import naive from "naive-ui";
import { vfmPlugin } from "vue-final-modal";

import {
  applyPolyfills,
  defineCustomElements,
} from "@freshworks/crayons/loader";

applyPolyfills().then(() => defineCustomElements());

const app = createApp(App);
app.use(vfmPlugin);
app.use(naive);
app.mount("#app");
