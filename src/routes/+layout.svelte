<script lang="ts">
  import '../app.postcss';
  import Logo from '$lib/assets/logo.svg';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  $: featuredCategories = import.meta.env._FEATURED_CATEGORIES.split(',');
</script>

<main class="max-w-5xl mx-auto p-4">
  <header class="flex gap-6 items-center mb-6">
    <a href="/">
      <img src={Logo} alt={import.meta.env._NAME} class="h-6" />
    </a>
    <nav class="flex gap-3 items-center">
      {#each featuredCategories as category}
        <a href="/{category}" class="text-text-gray-700 hover:text-blue-100 font-semibold transition uppercase">
          {category}
        </a>
      {/each}
    </nav>

    <form class="ml-auto">
      <input
        type="search"
        name="query"
        class="focus:outline-none px-3 py-2 rounded-md bg-white/25 w-64 text-sm"
        placeholder="Search"
      />
    </form>
  </header>
  <div class="grid grid-cols-[1fr_16rem] gap-4">
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
