<template>
  <div class="edit-profile-container">
    <h2>Éditez votre profil</h2>
    <form @submit.prevent="editUser">
      <div class="form-group mb-2">
        <label for="name">Nom complet</label>
        <input
          type="name"
          v-model="formData.full_name"
          placeholder="Votre nom complet"
          required
        />
      </div>

      <br />
      <div class="form-group mb-2">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="formData.email"
          placeholder="Ex: abc@example.com"
          required
        />
      </div>

      <br />
      <div class="form-group mb-4">
        <label for="password">Nouveau Mot de passe</label>
        <input
          type="password"
          v-model="formData.password"
          placeholder="********"
          required
        />
      </div>

      <br />
      <div class="form-group mb-4">
        <label for="password2">Confirmer le Mot de passe</label>
        <input
          type="password"
          v-model="formData.password2"
          placeholder="********"
          required
        />
      </div>

      <br />
      <div class="Mettre à jour">
        <p v-if="successMessage" class="popup">
          <b> {{ successMessage }} </b>
        </p>
        <button type="submit" class="large-button">Mettre à jour</button>
        <br />
      </div>

      <div class="error" v-if="error_message">
        <p>{{ error_message }}</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import router from "../router";
import { useAuthStore } from "/src/stores/useAuthStore";

const authStore = useAuthStore();
const error_message = ref("");
const successMessage = ref("");
const formData = ref({});

// Met à jour forData avec les infos du user
watchEffect(() => {
  if (authStore.user) {
    formData.value = { ...authStore.user }; //Copie les données de l'utilisateur
  }
});

async function editUser() {
  console.log("Données envoyées au serveur:", formData.value);
  try {
    const response = await fetch("/api/edit_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });

    if (response.ok) {
      // Rediriger vers la page d'articles
      successMessage.value = "Profil mis à jour avec succès !";
      authStore.fetchUser(); //Rafraîchit les infos de user
      setTimeout(() => {
        router.push("/article_list");
      }, 2000);
    } else {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      error_message.value = errorText; // Afficher le message d'erreur
    }
  } catch (error) {
    console.error("Fetch Error:", error); // Debug : Log a fetch error
  }
}
</script>

<style scoped></style>
