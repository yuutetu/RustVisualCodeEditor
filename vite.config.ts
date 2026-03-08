import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/RustVisualCodeEditor/',
  plugins: [react()],
  test: {
    environment: 'node',
  },
})
