import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/Home.vue'
import EditProfile from '/src/views/EditProfile.vue'
import MyProfile from '/src/views/MyProfile.vue'

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
      path: '/edit_profile/:userId',
      component: EditProfile,
      props : true,
   },

   {
      path: '/myprofile/:userId*',
      component: MyProfile,
      props : true,
   },


]

const router = createRouter({
    history: createWebHistory('/'),
    routes
 })
 
 export default router