<template>
  <body>
    <nav
      class="bg-white dark:bg-black dark:text-white flex flex-col md:flex-row items-center md:justify-between px-6 py-4 border-b border-b-gray-60 shadow-sm max-w-screen-2xl mx-auto"
    >
      <!-- Logo -->
      <div>
        <h2 class="text-3xl font-bold">
          <a><span class="text-fuchsia-500">Freep</span></a>
        </h2>
      </div>
      <!-- /End Logo -->
      <div class="mt-5 md:mt-0">
        <ul class="flex flex-col md:flex-row md:space-x-5 w-full items-center">
          <li>
            <router-link
              class="tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
              to="/home"
              >Accueil</router-link
            >
          </li>
          <li>
            <router-link
              class="tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
              to="/article_list"
              >Voir tous les articles</router-link
            >
          </li>
          <li>
            <li>
              <router-link
              class="tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
              to="/signup"
              v-if="authStore.user === null"
              >Créer un compte</router-link
              >
            </li>
            <router-link
              class="tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
              to="/create_article"
              v-if="authStore.user"
              >Ajouter un article</router-link
            >
          </li>
          <li>
            <router-link
              class="tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
              to="/signin"
              v-if="authStore.user === null"
              >S'identifier</router-link
            >
          </li>
          <li>
            <router-link
              class="tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
              to="/myprofile"
              v-if="authStore.user"
              >Voir mon profil</router-link
            >
          </li>
          <li>
            <router-link
              class="tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
              to="/dressing"
              v-if="authStore.user"
              >Voir mon dressing</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </body>

  <!-- <router-link class="lnk" to="/edit_profile">Éditer mon profil</router-link> -->
</template>
<style scoped>
.lnk {
  margin: 6px;
}
</style>
<script setup>
import { useAuthStore } from "/src/stores/useAuthStore";

const authStore = useAuthStore();
</script>
