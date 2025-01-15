<template>

      <div class="mb-5 d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <h1 class="mb-0 me-4">Articles</h1>
          <a
            href="/visit-edit"
            class="link-primary fs-3 lh-1 mt-1"
            title="Ajouter une visite"
            ><i class="bi bi-plus-circle-fill"></i
          ></a>
        </div>
      </div>
      <table class="table table-striped align-middle">
        <thead>
          <tr>
            <th scope="col">Images</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Utilisateur</th>
          </tr>
        </thead>
        <tbody>
          <div v-for ="clothing in clothingList"
               :key="clothing.id" 
            >
          <tr>
            <td> <img v-for="picture in clothing.pictures" :key="picture.id" :src="picture.url" :alt="clothing.name"> </td>
            <td> {{ clothing.name }} </td>
            <td> {{ clothing.description }} </td>
            <td> {{ clothing.user.full_name }} </td>
           
            <td>
              <div class="d-flex justify-content-end">
                <a href="" class="link-primary fs-3"
                  ><i class="bi bi-arrow-right-circle-fill"></i
                ></a>
              </div>
            </td>
          </tr>
          </div>
        </tbody>
      </table>
      <button @click="goToCreateArticle" class="create-button">+</button>
  </template>

  
<script setup>
import { ref, onMounted } from 'vue';
import router from "../router"

const clothingList = ref([]);

onMounted (() => {
    fetch('/api/clothing')
    .then((response) => response.json())
    .then((data) => {
        clothingList.value = data;
    })
})
function goToCreateArticle () {
    this.$router.push('/create-article');
}
</script>