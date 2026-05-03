/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Styles
import "unfonts.css";
import "@/styles/components-height.css";

const app = createApp(App);

// Pinia
import { createPinia } from "pinia";

const pinia = createPinia();
app.use(pinia);

registerPlugins(app);

app.mount("#app");
