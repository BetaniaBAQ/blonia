import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'
import { devtools } from '@tanstack/devtools-vite'



export default defineConfig({
  plugins: [
    devtools(),
    nitroV2Plugin(),
    // this is the plugin that enables path aliases
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    react(),
  ],
  optimizeDeps: {
    include: ["@workos/authkit-tanstack-react-start", "cookie"]
  },
})

