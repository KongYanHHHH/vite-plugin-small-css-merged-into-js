import { resolve } from 'path';
import type { UserConfig } from 'vite';
import pkg from './package.json';

export default {
	esbuild: {
		drop: ['console', 'debugger'],
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: pkg.name,
			fileName: 'index',
		},
	},
} satisfies UserConfig;
