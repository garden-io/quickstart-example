import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { io } from "socket.io-client";

window.io = io;

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
