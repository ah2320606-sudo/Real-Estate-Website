import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const page = (name) => fileURLToPath(new URL(name, import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        properties: page('./properties.html'),
        details: page('./property-details.html'),
        favorites: page('./favorites.html'),
        about: page('./about.html'),
        contact: page('./contact.html'),
        notFound: page('./404.html'),
      },
    },
  },
});
