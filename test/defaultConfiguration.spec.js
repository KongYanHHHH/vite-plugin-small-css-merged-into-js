import { resolve, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rm, stat, readdir } from 'node:fs/promises';
import { build } from 'vite';
import { expect, test, afterEach } from 'vitest';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import cssIntoJs from '../dist/index.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

test('Default Configuration', async () => {
	const result_plugin = await build({
		root: resolve(__dirname, 'files'),
		plugins: [svelte(), cssIntoJs()],
		build: {
			outDir: resolve(__dirname, 'dist'),
			rollupOptions: {},
		},
	});
	const result_not = await build({
		root: resolve(__dirname, 'files', 'getPage1css'),
		plugins: [svelte()],
		build: {
			outDir: resolve(__dirname, 'files', 'getPage1css', 'dist'),
		},
	});

	// 效验产物文件夹css是否大于插件配置大小
	const productFiles = await readdir(join(__dirname, 'dist', 'assets'));
	for (const _name of productFiles) {
		if (extname(_name) === '.css') {
			const { size } = await stat(join(__dirname, 'dist', 'assets', _name));
			expect(size).toBeGreaterThan(1024);
		}
	}

	// 效验被插入js中的css是否对劲
	const page1Code = result_plugin.output.filter((bundle) => bundle.name === 'Page1');
	const page1Code_css = page1Code[0].code.match(
		/cssToJs\.appendChild\(document\.createTextNode\((['"])(.*?)\1\)/,
	)[2];
	const notPlugin_page1 = result_not.output.filter(
		(bundle) => extname(bundle.fileName) === '.css',
	);
	expect(page1Code_css.trim()).toBe(notPlugin_page1[0].source.trim());
});

afterEach(async () => {
	const files = await readdir(__dirname);
	for (const _name of files) {
		if (/^dist*/.test(_name) && _name === 'dist') {
			const _path = join(__dirname, _name);
			await rm(_path, { recursive: true, force: true, maxRetries: 1 });
		}
	}

    await rm(resolve(__dirname, 'files', 'getPage1css', 'dist'), { recursive: true, force: true, maxRetries: 1 });
});
