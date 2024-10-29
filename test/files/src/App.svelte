<script lang="ts">
  import svelteLogo from './assets/svelte.svg';
  import viteLogo from './assets/vite.svg';
  import Counter from './lib/Counter.svelte';
  import About from './lib/About.svelte';

  const Page1 = import('./lib/Page1.svelte');
  const Page2 = import('./lib/Page2.svelte');
  let pageContext = Page1;
  let showAbout = false;
</script>

<main>
  <div class="card">
    <button on:click={() => (showAbout = !showAbout)}>about</button>
    {#if showAbout}
      about
    {/if}
    <About />
  </div>
  <section class="card">
    <nav>
      <a href="#top" on:click={() => (pageContext = Page1)}
        >page1</a
      >
      <a href="#top" on:click={() => (pageContext = Page2)}
        >page2</a
      >
    </nav>
    {#await pageContext}
      loading...
    {:then result}
      <svelte:component this={result.default} />
    {/await}
  </section>

  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a
      href="https://github.com/sveltejs/kit#readme"
      target="_blank"
      rel="noreferrer">SvelteKit</a
    >, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
