<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';
  import Logo from '$lib/assets/logo.svg';
  import Article from './Article.svelte';
  import { titleCase } from '$lib/helpers';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ChevronLeft, ChevronRight } from '@steeze-ui/feather-icons';
  import classnames from 'classnames';

  export let data: PageData;
  $: pageNumber = Number($page.url.searchParams.get('page')) || 1;
  $: featuredCategories = import.meta.env._FEATURED_CATEGORIES.split(',');
  $: featuredArticles = import.meta.env._FEATURED_ARTICLES.split(',');

  const articlesPerPage = 10;

  const pageUrl = (page: number) => {
    const url = new URL($page.url);
    url.searchParams.set('page', page.toString());
    return url.toString();
  };

  $: articles = data.articles
    // Filter by category
    .filter(
      (article) =>
        !$page.url.searchParams.has('category') ||
        article.Categories.includes($page.url.searchParams.get('category') || '')
    )
    // Filter by query
    .filter(
      (article) =>
        !$page.url.searchParams.has('query') ||
        article.Title.toLowerCase().includes($page.url.searchParams.get('query')?.toLowerCase() || '')
    );
</script>

<main class="max-w-5xl mx-auto p-4">
  <header class="flex gap-6 items-center mb-6">
    <a href="/">
      <img src={Logo} alt={import.meta.env._NAME} class="h-6" />
    </a>
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
      {#if $page.url.searchParams.has('query')}
        <div>
          <h2 class="text-2xl font-semibold mb-4">Search: {$page.url.searchParams.get('query')}</h2>
        </div>
      {:else if $page.url.searchParams.has('category')}
        <div>
          <h2 class="text-2xl font-semibold mb-4">
            {titleCase($page.url.searchParams.get('category') || 'Unknown Category')}
          </h2>
        </div>
      {:else if pageNumber === 1}
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
      {/if}

      <div class="grid gap-4 mb-6">
        {#each articles.slice((pageNumber - 1) * articlesPerPage, pageNumber * articlesPerPage) as article}
          <Article {article} wide={true} />
        {/each}
      </div>

      <!-- Pagination -->
      {#if articles.length > articlesPerPage}
        <div class="flex justify-center mb-6">
          <div class="inline-flex bg-white/5 w-min rounded-lg">
            <a class="page-btn" href={pageUrl(pageNumber - 1)}>
              <Icon src={ChevronLeft} class="w-4 h-4" />
            </a>
            {#each Array(Math.ceil(articles.length / articlesPerPage)) as _, i}
              <a
                class={classnames('page-btn', {
                  '!bg-white/10': i + 1 === pageNumber,
                })}
                href={pageUrl(i + 1)}
              >
                {i + 1}
              </a>
            {/each}
            <a class="page-btn" href={pageUrl(pageNumber + 1)}>
              <Icon src={ChevronRight} class="w-4 h-4" />
            </a>
          </div>
        </div>
      {/if}
    </section>
  </div>
</main>

<style>
  .page-btn {
    @apply p-2 rounded-lg hover:bg-white/5 w-10 h-10 flex items-center justify-center transition duration-300;
  }
</style>
