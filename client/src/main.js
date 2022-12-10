import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import { vfmPlugin } from "vue-final-modal";
import {
  applyPolyfills,
  defineCustomElements,
} from "@freshworks/crayons/loader";

applyPolyfills().then(() => defineCustomElements());

const app = createApp(App);
app.use(vfmPlugin);
app.component("EasyDataTable", Vue3EasyDataTable);
app.mount("#app");
