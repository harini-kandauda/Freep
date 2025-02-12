<template>
  <html class="h-full bg-white">
    <body class="h-full">
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto h-10 w-auto"
            rel="icon" 
            type="image/svg+xml" 
            src="../assets/image/logo_freep.png"
            alt="Freep"
          />
          <h2
            class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
          >
            Connectez-vous à votre compte
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            class="space-y-6"
            @submit.prevent="authenticateUser"
            method="POST"
          >
            <form></form>
            <div>
              <label
                for="email"
                class="block text-sm/6 font-medium text-gray-900"
                >Email</label
              >
              <div class="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="email"
                  required
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  v-model="formData.email"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password1"
                  class="block text-sm/6 font-medium text-gray-900"
                  >Mot de Passe</label
                >
              </div>
              <div class="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autocomplete="current-password"
                  required
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  v-model="formData.password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Valider
              </button>
            </div>
          </form>
          <br />
          <div v-if="errorMessage">{{ errorMessage }}</div>
          <p class="mt-10 text-center text-sm/6 text-gray-500">
            Pas de compte ?
            <a
              href="#"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
              >Créer un compte</a
            >
          </p>
        </div>
      </div>
    </body>
  </html>
</template>

<script setup>
import { ref } from "vue";
import router from "/src/router";
import { useAuthStore } from "/src/stores/useAuthStore";

const authStore = useAuthStore();

const formData = ref({});
const errorMessage = ref("");

async function authenticateUser() {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData.value),
  };
  const response = await fetch("/auth/authenticate_user", request);

  if (response.status === 200) {
    await authStore.fetchUser();
    router.push("/myprofile");
  } else if (response.status === 401) {
    errorMessage.value = "Mot de passe incorrect";
  } else {
    errorMessage.value = "Email ou mot de passe incorrect";
  }
}
</script>

<style scoped></style>
