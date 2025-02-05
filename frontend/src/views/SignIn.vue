<template>
  <h1>Connectez-vous à votre compte</h1>
  <form @submit.prevent="authenticateUser" method="POST">
    <p>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="formData.email" />
    </p>
    <p>
      <label for="password1">Mot de passe</label>
      <input
        type="password"
        id="password"
        v-model="formData.password"
        required
      />
    </p>
    <button type="submit">Valider</button>
  </form>
  <p v-if="errorMessage">{{ errorMessage.value }}</p>
</template>

<script setup>
import { ref } from "vue";
import router from "/src/router";
import { useAuthStore } from "/src/stores/useAuthStore";

const authStore = useAuthStore();

const formData = ref({});
const errorMessage = ref("");

async function authenticateUser() {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData.value),
  };
  const response = await fetch("/auth/authenticate_user", request);

  if (response.status === 200) {
    await authStore.fetchUser();
    router.push("/myprofile");
  } else {
    errorMessage.value = "email ou mot de passe incorrect";
  }
}
</script>

<style scoped></style>
