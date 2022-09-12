import { defaultConfig, plugin } from "@formkit/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(plugin, defaultConfig());
});
