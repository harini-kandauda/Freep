import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/Home.vue'
import EditProfil from '/src/views/EditProfil.vue'
import MyProfil from '/src/views/MyProfil.vue'

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
      path: '/edit_profil',
      component: EditProfil,
   },
   {
      path: '/myprofil',
      component: MyProfil,
   },


]

const router = createRouter({
    history: createWebHistory('/'),
    routes
 })
 
 export default router