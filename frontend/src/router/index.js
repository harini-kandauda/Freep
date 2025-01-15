import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import Success_SignUp from '../views/Success_SignUp.vue'
import ArticleList from '/src/views/ArticleList.vue'

const routes = [
    {
       path: '/',
       redirect: '/articlelist',
    }, 
    {
      path: '/articlelist',
      component: ArticleList,
    },
    {
      path: '/signup',
      component: SignUp,
    },
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
 })
 
 export default router