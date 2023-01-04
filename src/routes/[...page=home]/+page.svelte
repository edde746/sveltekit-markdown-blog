<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';
  import Article from './Article.svelte';
  import { titleCase } from '$lib/helpers';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ChevronLeft, ChevronRight } from '@steeze-ui/feather-icons';
  import classnames from 'classnames';

  export let data: PageData;
  $: pageNumber = Number($page.params.page) || Number($page.params.page.split('/')?.at(1)) || 1;
  $: paramIsNumber = !isNaN(Number($page.params.page));
  $: featuredArticles = import.meta.env._FEATURED_ARTICLES.split(',');

  const articlesPerPage = 10;

  const pageUrl = (page: number) => (category ? `/${category}/${page}` : `/${page}`);
  $: category = $page.params.page.includes('/') || !paramIsNumber ? $page.params.page.split('/')[0] : undefined;

  $: articles = data.articles
    // Filter by category
    .filter((article) => !category || article.Categories.includes(category || ''));
</script>

<section id="articles">
  {#if category}
    <div>
      <h2 class="text-2xl font-semibold mb-4">
        {titleCase(category)}
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

<style>
  .page-btn {
    @apply p-2 rounded-lg hover:bg-white/5 w-10 h-10 flex items-center justify-center transition duration-300;
  }
</style>
