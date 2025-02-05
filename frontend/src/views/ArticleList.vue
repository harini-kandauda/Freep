<template>
  <router-link to="/edit_profile/">Éditer mon profil</router-link>
  <router-link to="/creer-annonce">Créer un article</router-link>
  <h1>Liste des articles</h1>

  <label>
    Type :
    <select v-model="type">
      <option value="">Tous</option>
      <option value="Hauts">Hauts</option>
      <option value="Accessoires">Accessoires</option>
      <option value="Bas">Bas</option>
      <option value="Vêtements de soirée">Vêtements de soirée</option>
      <option value="Déguisement">Déguisement</option>
      <option value="Vêtements de sport">Vêtements de sports</option>
    </select>
  </label>

  <label>
    Taille :
    <select v-model="size">
      <option value="">Toutes</option>
      <option value="XS">XS</option>
      <option value="S">S</option>
      <option value="M">M</option>
      <option value="L">L</option>
      <option value="XL">XL</option>
      <option value="XXL">XXL</option>
    </select>
  </label> 

  <label>
    Genre :
    <select v-model="genders">
      <option value="">Tous</option>
      <option value="Femme">Femme</option>
      <option value="Homme">Homme</option>
      <option value="Unisex">Unisexe</option>
    </select>
  </label> 

  <label>
    Etat :
    <select v-model="state">
      <option value="">Tous</option>
      <option value="Neuf">Neuf</option>
      <option value="Comme Neuf">Comme Neuf</option>
      <option value="Très bon état">Très bon état</option>
      <option value="Bon état">Bon état</option>
      <option value="Usé">Usé</option>
      <option value="Abimé">Abimé</option>
    </select>
  </label> 

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
            width="100px"
            height="100px"
          />
        </td>
        <td>{{ clothing.name }}</td>
        <td>{{ clothing.description }}</td>
        <td>{{ clothing.user.full_name }}</td>
      </tr>
    </tbody>
  </table>

   <!-- Pagination -->
   <div>
      <button :disabled="currentPage === 1" @click="prevPage">Précédent</button>
      <span>Page {{ currentPage }} sur {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">Suivant</button>
    </div>

</template>

<script setup>
import { ref, onMounted, watch } from "vue";

// References for data and filters
const clothingList = ref([]);
const type = ref("");
const size = ref("");
const genders = ref("");
const state = ref("");
const totalPages = ref(0);
const currentPage = ref(1);
const totalClothingFilters = ref(0);

// number of articles per page
const limit = ref(10);


const fetchClothing = async () => {
  const queryParams = new URLSearchParams({
    type: type.value,
    size: size.value,
    genders: genders.value,
    state: state.value,
    page: currentPage.value,
    limit: limit.value
  });

    const response = await fetch(`/api/clothing?${queryParams}`);
    const data = await response.json();

    clothingList.value = data.clothingList;
    totalPages.value = data.totalPages;
    totalClothingFilters.value = data.totalClothingFilters;
};

watch([type, size, genders, state], fetchClothing, {immediate: true});


const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchClothing();
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchClothing();
  }
};

onMounted(fetchClothing);

</script>
