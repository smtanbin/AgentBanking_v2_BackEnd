import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), splitVendorChunkPlugin()],
    server: {
        port: 3000,
    },
    define: {
        'process.env': process.env
    },
    build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'axios']
                },
                dir: '../dist/public',
            },

        }
    },
});
