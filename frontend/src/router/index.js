import { createRouter, createWebHistory } from "vue-router";
import Home from "/src/views/Home.vue";
import ArticleCreate from "/src/views/ArticleCreate.vue";

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
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
