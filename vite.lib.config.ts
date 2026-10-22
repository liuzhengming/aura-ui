import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { fileURLToPath, URL } from 'node:url'

// Library build: produces the publishable npm artifact (ESM + UMD + d.ts + CSS).
// Kept separate from vite.config.ts, which builds the documentation site (GitHub Pages).
export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: 'src/lib',
      outDir: 'dist',
      include: ['src/lib/**/*.ts', 'src/lib/**/*.vue'],
      insertTypesEntry: true
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL('./src/lib/index.ts', import.meta.url)),
      name: 'AuraUI',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.umd.cjs')
    },
    rollupOptions: {
      // Vue is a peer dependency and must not be bundled.
      external: ['vue'],
      output: {
        exports: 'named',
        globals: { vue: 'Vue' }
      }
    }
  }
})
