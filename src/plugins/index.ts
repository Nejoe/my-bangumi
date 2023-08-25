/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import router from "@/router";
import { createPinia } from "pinia";
import markdown from "@/plugins/vueMarkdownEditor";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  loadFonts();
  app.use(vuetify);
  app.use(createPinia());
  app.use(router);
  app.use(markdown);
}
