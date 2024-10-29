import type { Plugin } from 'vite';
import type { OutputAsset, OutputChunk } from 'rollup';

/**
 *  Merges css smaller than a specified byte into js
 *  @param {number} size - Specified byte, default 1024
 *  @returns {Plugin} vite Plugin
 */
function VitePluginSmallCssMergedIntoJs(size: number = 1024): Plugin {
	return {
		name: 'vite-plugin-small-css-merged-into-js',
		apply: 'build',
		enforce: 'post',
		generateBundle(_, bundle) {
			const extname = (path: string) => {
				const arr = path.split('.');
				return `.${arr[arr.length - 1]}`;
			};

			// css bundle type is OutputAsset
			const hitTheTarget_cache: { [key: string]: OutputAsset } = {};
			const hitTheTarget_cssFileName_set: Set<string> = new Set();
			const css_html_correspondence: Record<string, string[]> = {};

			// Detects that the css is smaller than size and records whether it has been introduced by html
			const bundel_css_cache = Object.keys(bundle).filter(
				(_fileName) => extname(_fileName) === '.css',
			);
			for (const _fileName of bundel_css_cache) {
				const { source, originalFileNames } = bundle[_fileName] as OutputAsset;

				if (source && new Blob([source]).size < size) {
					hitTheTarget_cssFileName_set.add(_fileName);
					hitTheTarget_cache[_fileName] = bundle[_fileName] as OutputAsset;

					originalFileNames.forEach((_name) => {
						if (extname(_name) === '.html') {
							if (css_html_correspondence[_fileName]) {
								css_html_correspondence[_fileName].push(_name);
							} else {
								css_html_correspondence[_fileName] = [_name];
							}
						}
					});

					delete bundle[_fileName];
				}
			}

			// Detects whether the js bundle has introduced a hit css, and if so, adds it to the tail
			const bundel_js_cache = Object.keys(bundle).filter(
				(_fileName) => extname(_fileName) === '.js',
			);
			for (const _fileName of bundel_js_cache) {
				const _currentBundel = bundle[_fileName] as OutputChunk;
				// @ts-ignore
				const _importedCss = bundle[_fileName]?.viteMetadata?.importedCss;

				for (const cssName of _importedCss) {
					if (hitTheTarget_cache[cssName]) {
						const _cssContent = hitTheTarget_cache[cssName].source;

						_currentBundel.code += `(function(){const cssToJs = document.createElement('style');cssToJs.appendChild(document.createTextNode('${
							typeof _cssContent === 'string'
								? _cssContent.replace(/\n/g, '')
								: _cssContent
						}'));document.head.appendChild(cssToJs);})();\n`;

						// Delete the css file reference from the bundle and match this item in the set
						_importedCss.delete(cssName);
						hitTheTarget_cssFileName_set.delete(cssName);
					}
				}
			}

			// Handle html import
			for (const _cssFileName of Object.keys(css_html_correspondence)) {
				for (const _htmlFileName of css_html_correspondence[_cssFileName]) {
					const _currentBundel = bundle[_htmlFileName] as OutputAsset;
					_currentBundel.source = removeLinkWithFilename(
						_currentBundel.source,
						_cssFileName,
					);
				}
			}

			// Send back the unused css bundles
			hitTheTarget_cssFileName_set.forEach((_cssFileName) => {
				bundle[_cssFileName] = hitTheTarget_cache[_cssFileName];
			});
		},
	};
}

function removeLinkWithFilename(htmlCode: string | Uint8Array, filename: string) {
	// Creates a regular expression to match the <link> tag containing the specified file name
	const regex = new RegExp(`<link rel="stylesheet" crossorigin href="/${filename}">\n`, 'g');

	// Replace the matching <link> tag with a regular expression
	if (typeof htmlCode === 'string') {
		return htmlCode.replace(regex, '');
	}

	return htmlCode;
}

export default VitePluginSmallCssMergedIntoJs;
