<template>
  <div v-if="authStore.user">
    <p>Bienvenue, {{ authStore.user.full_name }} !</p>
  </div>
</template>

<script setup>
import { useAuthStore } from "/src/stores/useAuthStore";

const authStore = useAuthStore();
</script>

<style scoped></style>