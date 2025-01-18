import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    logLevel: 'info',
    clearScreen: false,
    build: {
        minify: false,
        sourcemap: true,
        rollupOptions: {
            onwarn(warning, warn) {
                console.log('BUILD WARNING:', warning);
                warn(warning);
            }
        }
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        svgr(),
    ],
    ssr: {
        noExternal: ['@inertiajs/server'],
    },
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
}); 