<template>
  <div v-if="authStore.user">
    <p>Bienvenue, {{ authStore.user.full_name }} !</p>
    <button @click="handleLogout">Déconnexion</button>
    <button @click="handleEditProfile">Éditer mon profil</button>
  </div>
</template>

<script setup>
import { useAuthStore } from "/src/stores/useAuthStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

async function handleLogout() {
  await authStore.logout();
  router.push("/home");
}

function handleEditProfile() {
  router.push("/edit_profile");
}
</script>

<style scoped>
button {
  margin: 6px;
}
</style>
