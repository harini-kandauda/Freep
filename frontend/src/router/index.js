import { createRouter, createWebHistory } from "vue-router";
import Home from "/src/views/Home.vue";
import ArticleCreate from "/src/views/ArticleCreate.vue";
import Success_SignUp from '../views/Success_SignUp.vue'
import ArticleList from '/src/views/ArticleList.vue'

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/creer-annonce",
    component: ArticleCreate,
  },
  {
    path: "/articlelist",
    component: ArticleList,
  },
    {
      path: '/signup',
      component: SignUp,
    },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;