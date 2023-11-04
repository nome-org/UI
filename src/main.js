import { createApp } from "vue";
import VueGtag from "vue-gtag";
import { VueQueryPlugin } from "@tanstack/vue-query";
import {createPinia} from "pinia";


import App from "./App.vue";
import "./bootstrap.css";
import "./global.scss";
import router from "./router";


const pinia = createPinia();
const app = createApp(App);

app.use(VueGtag, {
    config: { id: "G-HZQ4TKL9G9" },
   })
   .use(pinia)
   .use(router)
   .use(VueQueryPlugin)
   .mount("#app");
