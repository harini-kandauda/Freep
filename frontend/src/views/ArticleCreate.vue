<template>
  <h1>Créer une annonce</h1>
  <form @submit.prevent="createArticle" method="POST">
    <div>
      <label for="article_title">Titre</label>
      <input type="text" name="article_title" v-model="formData.title" />
    </div>
    <div>
      <label for="article_desc">Description</label>
      <textarea name="article_desc" v-model="formData.desc" rows="5"></textarea>
    </div>
    <button type="submit" value="submit">Enregistrer</button>
  </form>
</template>

<script setup>
import { ref } from "vue";

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
    // router.push("/verification");
  } else {
    errorMessage.value = "Oups...";
  }
}
</script>

<style scoped></style>
