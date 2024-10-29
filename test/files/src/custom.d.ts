declare module '*.svg' {
	const content: string;
	export default content;
}

declare module '*.svelte' {
	import { SvelteComponent } from 'svelte';
	export default SvelteComponent;
}
