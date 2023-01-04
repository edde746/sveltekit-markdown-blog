<script lang="ts">
  import '../app.postcss';
  import Logo from '$lib/assets/logo.svg';
  import type { LayoutData } from './$types';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Menu } from '@steeze-ui/feather-icons';
  import { navigating } from '$app/stores';
  import { fade, fly } from 'svelte/transition';

  export let data: LayoutData;
  let mobileMenuOpen = false;

  $: if ($navigating) mobileMenuOpen = false;
  $: featuredCategories = import.meta.env._FEATURED_CATEGORIES.split(',');
</script>

{#if mobileMenuOpen}
  <div
    class="fixed inset-0 block bg-black/50 z-10"
    on:click={() => (mobileMenuOpen = false)}
    on:keydown={() => (mobileMenuOpen = false)}
    transition:fade
  />
  <div class="fixed inset-0 p-4 z-20 h-min" transition:fly={{ y: -100 }}>
    <div class="rounded-lg bg-neutral-900 p-4 grid gap-3">
      {#each featuredCategories as category}
        <a href="/{category}" class="text-text-gray-700 hover:text-blue-100 font-semibold transition uppercase">
          {category}
        </a>
      {/each}
      <form class="">
        <input
          type="search"
          name="query"
          class="focus:outline-none px-3 py-2 rounded-md bg-white/25 w-full text-sm"
          placeholder="Search"
        />
      </form>
    </div>
  </div>
{/if}

<main class="max-w-5xl mx-auto p-4">
  <header class="flex gap-6 items-center mb-6">
    <a href="/">
      <img src={Logo} alt={import.meta.env._NAME} class="h-6" />
    </a>
    <nav class="hidden md:flex gap-3 items-center">
      {#each featuredCategories as category}
        <a href="/{category}" class="text-text-gray-700 hover:text-blue-100 font-semibold transition uppercase">
          {category}
        </a>
      {/each}
    </nav>

    <form class="hidden lg:inline-block ml-auto">
      <input
        type="search"
        name="query"
        class="focus:outline-none px-3 py-2 rounded-md bg-white/25 w-64 text-sm"
        placeholder="Search"
      />
    </form>
    <div class="ml-auto md:hidden">
      <button class="focus:outline-none" on:click={() => (mobileMenuOpen = !mobileMenuOpen)}>
        <Icon src={Menu} class="w-6 h-6" />
        <span class="sr-only">Menu</span>
      </button>
    </div>
  </header>
  <div class="grid md:grid-cols-[1fr_12rem] lg:grid-cols-[1fr_16rem] gap-4">
    <slot />
    <aside>
      <h2 class="text-2xl font-semibold mb-4">Categories</h2>
      <ul class="space-y-2 mb-6">
        {#each Object.entries(data.articles.reduce((acc, cur) => {
            for (const category of cur.Categories) {
              if (acc[category]) {
                acc[category] += 1;
              } else {
                acc[category] = 1;
              }
            }
            return acc;
          }, {}))
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6) as [category, _]}
          <li>
            <a href="/{category}" class="text-neutral-300 hover:text-blue-100 font-semibold transition uppercase">
              {category}
            </a>
          </li>
        {/each}
      </ul>
      <h2 class="text-2xl font-semibold mb-4">Recent Articles</h2>
      <ul class="space-y-2">
        {#each data.articles.slice(0, 5) as article}
          <li>
            <a
              href="/{article.Categories[0] ?? 'uncategorized'}/{article.Slug}"
              class="text-neutral-300 hover:text-blue-100 font-semibold text-sm transition uppercase"
            >
              {article.Title}
            </a>
          </li>
        {/each}
      </ul>
    </aside>
  </div>
</main>
