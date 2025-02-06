<template>
    <h1>Modifier mon annonce</h1>
    <form @submit.prevent="updateClothing">

      <div>
        <label>
        Titre :
        <input type="text" v-model="clothing.name" />
      </label>
      
      </div>
      
      <div>
        <label>
        Description :
        <textarea v-model="clothing.description"></textarea>
      </label>
      </div>

      <div>
        <label for="article_size">Type</label>
        <select v-model="clothing.type" required>
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
        <label>
        Image actuelle :
        <img v-if="clothing.pictures && clothing.pictures.length" 
            :src="clothing.pictures[0].url" 
            alt="Image de l'article" 
            width="150" height="150" />
        </label>

        <label>
        Modifier l'URL de l'image :
        <input type="text" v-model="imageUrl" placeholder="Nouvelle URL de l'image" />
        </label>
      </div>
      
      <div>
        <label for="article_gender">Genre</label>
        <select v-model="clothing.genders" required>
          <option disabled value="">Veuillez sélectionner un genre</option>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
          <option value="Unisex">Unisexe</option>
        </select>
      </div>

      <div>
        <label for="article_size">Taille</label>
        <select v-model="clothing.size" required>
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
        <select v-model="clothing.state" required>
          <option disabled value="">Veuillez sélectionner un état</option>
          <option value="Neuf">Neuf</option>
          <option value="Comme Neuf">Comme neuf</option>
          <option value="Très bon état">Très bon état</option>
          <option value="Bon état">Bon état</option>
          <option value="Usé">Usé</option>
          <option value="Abimé">Abimé</option>
        </select>
      </div>

      <button type="submit" value="submit">Mettre à jour</button>

    </form>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  const route = useRoute();
  const router = useRouter();
  const clothingId = ref(route.params.id);
  const clothing = ref({
    name: "",
    description: "",
    type: "",
    size: "",
    genders: "",
    state: "",
    pictures: [],
  });
  
  const imageUrl = ref("");

  // Charger l'article existant
  const fetchClothing = async () => {
    try {
      const response = await fetch(`/api/dressing/${clothingId.value}`);
      const data = await response.json();
      clothing.value = data;
    
      if (data.pictures.length > 0) {
      imageUrl.value = data.pictures[0].url;
    }

    } catch (error) {
      console.error("Erreur lors du chargement:", error);
    }
  };
  
  //Mettre à jour l'article
  const updateClothing = async () => {
    try {
      const response = await fetch(`/api/dressing/${clothingId.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...clothing.value, 
            imageUrl: imageUrl.value, 
            }),
      });
      console.log("response:",response)
      if (response.ok) {
        alert("Article mis à jour !");
        router.push("/dressing");
      } else {
        alert("Erreur lors de la mise à jour.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };
  
  onMounted(fetchClothing);
  </script>