import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import Success_SignUp from '../views/Success_SignUp.vue'

const routes = [
    {
       path: '/',
       redirect: '/home',
    },
    {
       path: '/home',
       component: Home,
    }, 
    {
      path: '/signup',
      component: SignUp,
    },
    {
      path: '/success',
      component: Success_SignUp,
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
 })
 
 export default router