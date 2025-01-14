import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/Home.vue'
import ArticleList from '/src/views/ArticleList.vue'

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
        path: '/articlelist',
        component : ArticleList,
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
 })
 
 export default router