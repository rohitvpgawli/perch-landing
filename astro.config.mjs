import { defineConfig } from "astro/config";

export default defineConfig({
  devToolbar: { enabled: false },
  site: "https://quietmachines.xyz",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
});
