import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@layout': path.resolve(__dirname, './src/layout'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@components': path.resolve(__dirname, './src/components'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@styles': path.resolve(__dirname, './src/styles'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@type': path.resolve(__dirname, './src/type'),
			'@data': path.resolve(__dirname, './src/data'),
		},
	},
	plugins: [
		react(),
		svgr({
			include: '**/*.svg?react',
		}),
	],
})
