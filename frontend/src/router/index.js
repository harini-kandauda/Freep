import { createRouter, createWebHistory } from "vue-router";
import Home from "/src/views/Home.vue";
import ArticleCreate from "/src/views/ArticleCreate.vue";
import ArticleList from "/src/views/ArticleList.vue";
import SignUp from "/src/views/SignUp.vue";
import EditProfile from "/src/views/EditProfile.vue";
import MyProfile from "/src/views/MyProfile.vue";
import Dressing from "/src/views/Dressing.vue";


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
    path: "/create_article",
    component: ArticleCreate,
  },
  {
    path: "/article_list",
    component: ArticleList,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/edit_profile/:userId",
    component: EditProfile,
    props: true,
  },

  {
    path: "/myprofile",
    component: MyProfile,
    props: true,
  },
  {
    path: "/dressing",
    component: Dressing,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
