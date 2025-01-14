<template>
    <div class="edit-profile-container">
      <h2>Éditez votre profile </h2>
      <form @submit.prevent="editUser ">
        <div class="form-group mb-2">
          <label for="name">Nom complet</label>
          
          <input type="text" v-model="formData.name" placeholder="Votre nom complet" required>
        </div>

        <br>
        <div class="form-group mb-2">
          <label for="email">Email</label>
          <input type="email" v-model="formData.email" placeholder="Ex: abc@example.com" required>
        </div>

        <br>
        <div class="form-group mb-4">
          <label for="password">Nouveau Mot de passe</label>
          <input type="password" v-model="formData.password" placeholder="********" required>
        </div>

        <br>
        <div class="form-group mb-4">
          <label for="password2">Confirmer le Mot de passe</label>
          <input type="password" v-model="formData.password2" placeholder="********" required>
        </div>

        <br>
        <div class="form-group mb-4">
          <label for="avatar">Avatar (URL)</label>
          <input type="text" v-model="formData.avatar" placeholder="URL de votre avatar" required>
        </div>

        <br>
        <!-- <p>Pour finaliser la modification de votre profil, cliquez sur "Mettre à jour"</p> -->
         <div class=" Mettreà jour ">
            <button type="submit" class="large-button">Mettre à jour </button>
             <router-link :to="`/myprofil`">
             </router-link>
        <br> 
         </div>

        <div class="error" v-if="error_message">
          <p>{{ error_message }}</p>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const error_message = ref('');
  const formData = ref({
    name: '',
    email: '',
    password: '',
    password2: '',
    avatar: ''
  });
  
  async function editUser () {
    const response = await fetch('/api/edit_profil', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    });
  
    if (response.ok) {
      // Rediriger vers la page profil
      router.push('/myprofil');
    } else {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      error_message.value = errorText; // Afficher le message d'erreur
    }
  }
  </script>
  
  <style scoped>
 
  </style>