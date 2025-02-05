<template>
    <div>
        <h1>Mon dressing </h1>

        <table v-if="clothingList.length > 0">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Action</th>
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
                    <td>
                        <router-link :to="`/edit-clothing/${clothing.id}`">
                            <button>Modifier</button>
                        </router-link>
                        <button @click="deleteClothing(clothing.id)">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>Aucun vêtement dans votre dressing.</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const clothingList = ref([]);
const userId = 4; // Remplacer par la varie méthode pour récupérer l'id utilisateur

const fetchDressing = async () => {
    try {
        const response = await fetch ("/api/dressing");
        const data = await response.json();
        clothingList.value = data;
    } catch (error) {
        console.error("erreur lors du changement du dressing:", error);
    } 
}

const deleteClothing = async (clothingId) => {
    if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;

    try {
        const response = await fetch(`/api/dressing/${clothingId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            clothingList.value = clothingList.value.filter(c => c.id !== clothingId);
            alert("Article supprimé avec succès !");
        } else {
            alert("Erreur lors de la suppression.");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
    }
};


onMounted(fetchDressing);
</script>