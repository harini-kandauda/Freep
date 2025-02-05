import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  // Fetch user
  async function fetchUser() {
    const request = {
      method: "GET",
      credentials: "include", // Permet d'envoyer les cookies avec la requête
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch("/auth/get_user", request);

      if (!response.ok) throw new Error("Non authentifié");

      const data = await response.json();
      console.log("Utilisateur connecté :", data.user);
      user.value = data.user;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      user.value = null;
    }
  }

  return { user, fetchUser };
});
