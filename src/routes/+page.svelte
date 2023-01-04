<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';
  import Logo from '$lib/assets/logo.svg';
  import Article from './Article.svelte';

  export let data: PageData;
  $: pageNumber = Number($page.url.searchParams.get('page'));
  $: featuredCategories = import.meta.env._FEATURED_CATEGORIES.split(',');
  $: featuredArticles = import.meta.env._FEATURED_ARTICLES.split(',');
</script>

<main class="max-w-5xl mx-auto p-4">
  <header class="flex gap-6 items-center mb-6">
    <img src={Logo} alt={import.meta.env._NAME} class="h-6" />
    <nav class="flex gap-3 items-center">
      {#each featuredCategories as category}
        <a
          href={`?category=${category}&page=1`}
          class="text-text-gray-700 hover:text-blue-100 font-semibold transition uppercase"
        >
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
    <section id="articles">
      <!-- Featured -->
      <div class="grid grid-cols-2 gap-4 mb-8">
        {#each featuredArticles as slug, i}
          {@const article = data.articles.find((article) => article.Slug === slug)}
          {#if article}
            <Article {article} class={i == 0 ? 'col-span-2' : ''} />
          {/if}
        {/each}
      </div>

      <!-- Articles -->
      <div>
        <h2 class="text-2xl font-semibold mb-4">Latest Articles</h2>
      </div>

      <div class="grid gap-4">
        {#each data.articles as article}
          <Article {article} wide={true} />
        {/each}
      </div>
    </section>
  </div>
</main>
