import { createApp } from 'vue'
import App from './App.vue'


import VueGtag from "vue-gtag";
import { VueQueryPlugin } from "@tanstack/vue-query";


const app = createApp(App).use(VueGtag, {
   config: { id: "G-HZQ4TKL9G9" }
})
app.mount('#app')

app.use(VueQueryPlugin)


