import { createApp, markRaw } from "vue";
import router from "./router";
import App from "./App.vue";
import "./index.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createPinia } from "pinia";
import { useLoggedInUserStore } from "./store/loggedInUser";
import { setUnauthorizedHandler } from "./api/api";

const app = createApp(App);

const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = markRaw(router);
});

app.use(pinia);

const userStore = useLoggedInUserStore();

// Allow the centralized Axios interceptor to clear Pinia state on 401
setUnauthorizedHandler(() => {
  userStore.$patch({
    name: "",
    role: "",
    isLoggedIn: false
  });
});

// Restore saved login session before router starts handling navigation
userStore.restoreSession();

app.use(router);

const options = {
  position: "bottom-right"
};

app.use(Toast, options);

app.mount("#app");