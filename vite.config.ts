import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'


// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            // '@layout': path.resolve(__dirname, './src/layout'),
            '@pages': path.resolve(__dirname, './src/pages'),
            // '@store': path.resolve(__dirname, './src/store'),
            '@components': path.resolve(__dirname, './src/components'),
            // '@ui-kit': path.resolve(__dirname, './src/ui-kit'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@styles': path.resolve(__dirname, './src/styles'),
            // '@utils': path.resolve(__dirname, './src/utils'),
            // '@config': path.resolve(__dirname, './src/config'),
            // '@hooks': path.resolve(__dirname, './src/hooks'),
            // '@type': path.resolve(__dirname, './src/type'),
            // '@data': path.resolve(__dirname, './src/data'),
        },
    },
    plugins: [
        react(),
        svgr({
            include: '**/*.svg?react',
        }),
    ],
})
