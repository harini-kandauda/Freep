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
            Créer un compte
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit.prevent="signupUser">
            <form></form>
            <div>
              <label
                for="full_name"
                class="block text-sm/6 font-medium text-gray-900"
                >Nom</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  autocomplete="name"
                  required
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  v-model="formData.full_name"
                />
              </div>
            </div>

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
                  >Mot de passe</label
                >
              </div>
              <div class="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password1"
                  autocomplete="current-password"
                  required
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  v-model="formData.password"
                />
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password2"
                  class="block text-sm/6 font-medium text-gray-900"
                  >Vérifier mot de passe</label
                >
              </div>
              <div class="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password2"
                  autocomplete="current-password"
                  required
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  v-model="formData.password2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                S'inscrire
              </button>
            </div>
          </form>
          <br />
          <p class="" error>{{ errorMessage }}</p>
        </div>
      </div>
    </body>
  </html>
</template>

<script setup>
import { ref } from "vue";
import router from "../router";

const errorMessage = ref("");
const formData = ref({});

async function signupUser() {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData.value),
  });

  if (response.status === 200) {
    router.push("/signin");
  } else {
    if (response.status === 400) {
      errorMessage.value = "Cet email est déjà utilisé.";
    } else if (response.status === 403) {
      errorMessage.value = "Les mots de passe sont différents.";
    } else {
      errorMessage.value = "Erreur";
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 350px;
  margin: auto;
}
</style>
