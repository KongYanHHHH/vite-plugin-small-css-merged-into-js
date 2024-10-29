/**
 *  Merges css smaller than a specified byte into js
 *  @param {number} size - Specified byte, default 1024
 *  @returns {Plugin} vite Plugin
 */
declare function VitePluginSmallCssMergedIntoJs(size?: number): PluginOption;
export default VitePluginSmallCssMergedIntoJs;
