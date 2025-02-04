<template>
  <router-link to="/edit_profile/">Éditer mon profil</router-link>
  <router-link to="/creer-annonce">Créer un article</router-link>
  <h1>Liste des articles</h1>
  <table>
    <thead>
      <tr>
        <th scope="col">Images</th>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Utilisateur</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="clothing in clothingList" :key="clothing.id">
        <td>
          <img
            v-for="picture in clothing.pictures"
            :key="picture.id"
            :src="picture.url"
            :alt="clothing.name"
          />
        </td>
        <td>{{ clothing.name }}</td>
        <td>{{ clothing.description }}</td>
        <!-- <td>{{ clothing.user.full_name }}</td> -->
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, onMounted } from "vue";
import router from "../router";

const clothingList = ref([]);

onMounted(() => {
  fetch("/api/clothing")
    .then((response) => response.json())
    .then((data) => {
      clothingList.value = data;
    });
});
function goToCreateArticle() {
  this.$router.push("/create-article");
}
</script>
