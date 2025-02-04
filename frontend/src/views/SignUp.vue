<template>
  <h1>Création de compte</h1>
  <form @submit.prevent="signupUser">
    <p>
      <label for="full_name">Nom</label>
      <input type="text" id="full_name" v-model="formData.full_name" required />
    </p>
    <p>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="formData.email" required />
    </p>
    <p>
      <label for="password1">Mot de passe</label>
      <input
        type="password"
        id="password1"
        v-model="formData.password"
        required
      />
    </p>
    <p>
      <label for="password2">Vérifier mot de Passe</label>
      <input
        type="password"
        id="password2"
        v-model="formData.password2"
        required
      />
    </p>
    <button type="submit">S'inscrire</button>
  </form>
  <p class="" error>{{ errorMessage }}</p>
</template>

<script setup>
import { ref } from "vue";
import router from "../router";
import { host } from "../use/useHost";

const errorMessage = ref("");
const formData = ref({});

async function signupUser() {
  host.value = formData.value.email;
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData.value),
  });

  if (response.status === 200) {
    router.push("/articlelist");
  } else {
    if (response.status === 400) {
      errorMessage.value = "Cet email est déjà utilisé.";
    } else if (response.status === 403) {
      errorMessage.value = "Les mots de passe sont différents."
    } else {
      errorMessage.value = "Erreur";
    }
  }
}
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  width: 350px;
  margin: auto;
}
</style>
