<template>
  <h1>Créer une annonce</h1>
  <form @submit.prevent="createArticle" method="POST">
    <div>
      <label for="article_title">Titre</label>
      <input type="text" name="article_title" v-model="formData.title" />
    </div>
    <div>
      <label for="article_size">Type</label>
      <select v-model="formData.type">
        <option disabled value="">Veuillez sélectionner un type</option>
        <option>Hauts</option>
        <option>Bas</option>
        <option>Accessoires</option>
        <option>Vêtements de soirée</option>
        <option>Déguisement</option>
        <option>Vêtements de sport</option>
      </select>
    </div>
    <div>
      <label for="article_desc">Description</label>
      <textarea name="article_desc" v-model="formData.desc" rows="5"></textarea>
    </div>
    <div>
      <label for="article_size">Genre</label>
      <select v-model="formData.genders">
        <option disabled value="">Veuillez sélectionner un genre</option>
        <option>Homme</option>
        <option>Femme</option>
        <option>Unisex</option>
      </select>
    </div>
    <div>
      <label for="article_size">Taille</label>
      <select v-model="formData.size">
        <option disabled value="">Veuillez sélectionner une taille</option>
        <option>XS</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
        <option>XXL</option>
      </select>
    </div>
    <div>
      <label for="article_size">Etat</label>
      <select v-model="formData.state">
        <option disabled value="">Veuillez sélectionner un état</option>
        <option>Neuf</option>
        <option>Comme Neuf</option>
        <option>Très bon état</option>
        <option>Bon état</option>
        <option>Usé</option>
        <option>Abimé</option>
      </select>
    </div>
    <button type="submit" value="submit">Enregistrer</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import router from "../router";

// POST
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
    console.log("Youpi !");
    router.push("/articlelist");
  } else {
    errorMessage.value = "Oups...";
  }
}
</script>

<style scoped></style>
