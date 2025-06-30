import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: "/movie/",
// });

export default defineConfig({
  base: "/movie/",
  plugins: [react()],
});

