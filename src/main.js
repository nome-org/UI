import { createApp } from 'vue'
import App from './App.vue'


import VueGtag from "vue-gtag";


const app = createApp(App).use(VueGtag, {
   config: { id: "G-HZQ4TKL9G9" }
}).mount('#app')
