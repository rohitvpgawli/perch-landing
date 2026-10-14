import { defineConfig } from "astro/config";

export default defineConfig({
  devToolbar: { enabled: false },
  site: "https://perched.fyi",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
});
