<template>
  <div v-if="authStore.user">
    <p>Bienvenue, {{ authStore.user.full_name }} !</p>
    <button @click="handleLogout">Déconnexion</button>
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
</script>

<style scoped></style>
