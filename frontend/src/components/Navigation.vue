<template>
  <router-link class="lnk" to="/home">Accueil</router-link>
  <router-link class="lnk" to="/article_list"
    >Voir tous les articles</router-link
  >
  <router-link class="lnk" to="/create_article" v-if="authStore.user"
    >Ajouter un article</router-link
  >
  <router-link class="lnk" to="/signup" v-if="authStore.user === null"
    >Créer un compte</router-link
  >
  <router-link class="lnk" to="/signin">S'identifier</router-link>
  <router-link class="lnk" to="/myprofile" v-if="authStore.user"
    >Voir mon profil</router-link
  >
  <!-- <router-link class="lnk" to="/edit_profile">Éditer mon profil</router-link> -->
  <router-link class="lnk" to="/dressing" v-if="authStore.user"
    >Voir mon dressing</router-link
  >
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
