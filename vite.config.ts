import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';


export default defineConfig({
	plugins: [
		react(),
		reactRefresh()
	],
	css: {
		modules: {
			localsConvention: 'camelCase',
		},
		postcss: {
			plugins: [
				
				autoprefixer,
				cssnano({
					preset: 'default',
				})			
			],
		},
	},
});
