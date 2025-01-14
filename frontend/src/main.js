import { createApp } from 'vue'
import router from '../src/router/index';


// Components
import './style.css'
import App from './App.vue'


createApp(App)
    .use(router)
    .mount('#app')
   
