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
      <div class="form-group mb-4">
        <label for="avatar">Avatar (URL)</label>
        <input
          type="text"
          v-model="formData.avatar_url"
          placeholder="URL de votre avatar"
        />
      </div>

      <br />
      <!-- <p>Pour finaliser la modification de votre profil, cliquez sur "Mettre à jour"</p> -->
      <div class="Mettreà jour">
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
import { ref, onMounted } from "vue";
import router from "../router";

const error_message = ref("");
const formData = ref({});

//Fonction utilisant fetch pour récupérer les données

const fetchUser = async () => {
  try {
    const response = await fetch(`/api/user/${props.userId}`);

    if (!response.ok) {
      console.log("Utilisateur non trouvé");
      return; // Exit the function if the user is not found
    }

    formData.value = await response.json();
    console.log("Utilisateur récupéré:", formData.value);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
  }
};

// définie ce qu'on récupére de la vue
const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

// définie ce qu'on envoie à la vue
onMounted(async () => {
  await fetchUser();
});

async function editUser() {
  formData.value.userId = props.userId;
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
      // Rediriger vers la page profil
      router.push("/myprofile");
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