import { resolve, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rm, stat, readdir } from 'node:fs/promises';
import { build } from 'vite';
import { expect, test, afterEach } from 'vitest';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import cssIntoJs from '../dist/index.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const targetSize = 2048;

test('Target Configuration', async () => {
	const result_plugin = await build({
		root: resolve(__dirname, 'files'),
		plugins: [svelte(), cssIntoJs(targetSize)],
		build: {
			outDir: resolve(__dirname, 'dist-target'),
		},
	});

	const result_not = await build({
		root: resolve(__dirname, 'files'),
		plugins: [svelte(), consoleSS()],
		build: {
			outDir: resolve(__dirname, 'dist-not'),
		},
	});

	// 效验产物文件夹css是否大于插件配置大小
	const productFiles = await readdir(join(__dirname, 'dist-target', 'assets'));
	for (const _name of productFiles) {
		if (extname(_name) === '.css') {
			const { size } = await stat(join(__dirname, 'dist-target', 'assets', _name));
			expect(size).toBeGreaterThan(targetSize);
		}
	}

	// 效验被插入js中的css是否对劲
	const inlineCssCode = {};
	for (const bundle of result_plugin.output) {
		if (extname(bundle.fileName) === '.js') {
			const extractValue = bundle.code.match(
				/cssToJs\.appendChild\(document\.createTextNode\((['"])(.*?)\1\)/,
			);

			if (Array.isArray(extractValue) && extractValue[2]) {
				inlineCssCode[bundle.name] = extractValue[2].trim();
			}
		}
	}

	for (const bundle of result_not.output) {
		if (extname(bundle.fileName) === '.css') {
			const _bundleName = (
				typeof bundle.name === 'function' ? bundle.name() : bundle.name
			).split('.')[0];
			expect(inlineCssCode[_bundleName]).toBeDefined().toEqual(bundle.source.trim());
		}
	}
});

afterEach(async () => {
	const files = await readdir(__dirname);
	for (const _name of files) {
		if (/^dist-target*/.test(_name)) {
			const _path = join(__dirname, _name);
			await rm(_path, { recursive: true, force: true, maxRetries: 1 });
		} else if (/^dist-not*/.test(_name)) {
			const _path = join(__dirname, _name);
			await rm(_path, { recursive: true, force: true, maxRetries: 1 });
		}
	}
});

let once = true;
const consoleSS = () => {
	return {
		name: 'lxowow',
		apply: 'build',
		writeBundle() {
			once &&
				console.log(`
                 
                 　　┏┓　　　┏┓+ +
                 　┏┛┻━━━┛┻┓ + +
                 　┃　　　　　　　┃ 　
                 　┃　　　━　　　┃ ++ + + +
                  ████━████ ┃+
                 　┃　　　　　　　┃ +
                 　┃　　　┻　　　┃
                 　┃　　　　　　　┃ + +
                 　┗━┓　　　┏━┛
                 　　　┃　　　┃　　　　　　　　　　　
                 　　　┃　　　┃ + + + +
                 　　　┃　　　┃      急急如律令 bug散去
                 　　　┃　　　┃ +  
                 　　　┃　　　┃            　　
                 　　　┃　　　┃　　+　　　　　　　　　
                 　　　┃　 　　┗━━━┓ + +
                 　　　┃ 　　　　　　　┣┓
                 　　　┃ 　　　　　　　┏┛
                 　　　┗┓┓┏━┳┓┏┛ + + + +
                 　　　　┃┫┫　┃┫┫
                 　　　　┗┻┛　┗┻┛+ + + +
                 
                `);
		},
	};
};
