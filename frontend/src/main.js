import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/useAuthStore";

// Components
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const authStore = useAuthStore();
authStore.fetchUser(); // Vérifier la session utilisateur au chargement

app.mount("#app");
