import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import "./assets/main.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

//Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

//ws 
// import {wsStore} from "./stores/ws"
// const ws = wsStore();
// ws.Init();


app.mount('#app')
