import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true,
        },
        host: true, // needed for the Docker Container port mapping to work
        hmr: {
            overlay: false,
        },
        strictPort: true,
        port: 3004, // you can replace this port with any port
        proxy: {
            '/auth': {
                target: 'http://hyped-backend:5004',
                changeOrigin: true,
            },
            '/api': {
                target: 'http://hyped-backend:5004',
                changeOrigin: true,
            }
        }
    }
})