import { defaultConfig, plugin } from "@formkit/vue";
import "@formkit/themes/genesis";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(plugin, defaultConfig());
});
