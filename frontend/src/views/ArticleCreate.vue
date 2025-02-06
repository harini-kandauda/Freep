<template>
  <h1>Créer une annonce</h1>
  <form @submit.prevent="createArticle" method="POST">
    <div>
      <label for="article_name">Titre</label>
      <input
        type="text"
        name="article_name"
        v-model="formData.name"
        required
      />
    </div>
    <div>
      <label for="article_type">Type</label>
      <select v-model="formData.type" required>
        <option disabled value="">Veuillez sélectionner un type</option>
        <option value="Hauts">Hauts</option>
        <option value="Bas">Bas</option>
        <option value="Accessoires">Accessoires</option>
        <option value="Vêtements de soirée">Vêtements de soirée</option>
        <option value="Déguisement">Déguisement</option>
        <option value="Vêtements de sport">Vêtements de sport</option>
      </select>
    </div>
    <div>
      <label for="article_image">Image URL</label>
      <input
        type="url"
        name="article_image"
        v-model="formData.image"
        placeholder="https://example.com"
        required
      />
    </div>
    <div>
      <label for="article_desc">Description</label>
      <textarea name="article_desc" v-model="formData.desc" rows="5" required></textarea>
    </div>
    <div>
      <label for="article_gender">Genre</label>
      <select v-model="formData.gender" required>
        <option disabled value="">Veuillez sélectionner un genre</option>
        <option value="Homme">Homme</option>
        <option value="Femme">Femme</option>
        <option value="Unisex">Unisexe</option>
      </select>
    </div>
    <div>
      <label for="article_size">Taille</label>
      <select v-model="formData.size" required>
        <option disabled value="">Veuillez sélectionner une taille</option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select>
    </div>
    <div>
      <label for="article_state">Etat</label>
      <select v-model="formData.state" required>
        <option disabled value="">Veuillez sélectionner un état</option>
        <option value="Neuf">Neuf</option>
        <option value="Comme Neuf">Comme neuf</option>
        <option value="Très bon état">Très bon état</option>
        <option value="Bon état">Bon état</option>
        <option value="Usé">Usé</option>
        <option value="Abimé">Abimé</option>
      </select>
    </div>
    <button type="submit" value="submit">Enregistrer</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import router from "../router";
import { useAuthStore } from "/src/stores/useAuthStore";

// POST
const authStore = useAuthStore();
const formData = ref({});
const errorMessage = ref("");

async function createArticle() {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData.value),
  };
  const response = await fetch("/api/create_article", request);

  if (response.status === 200) {
    router.push("/article_list");
  } else {
    errorMessage.value = "Oups...";
  }
}
</script>

<style scoped></style>
