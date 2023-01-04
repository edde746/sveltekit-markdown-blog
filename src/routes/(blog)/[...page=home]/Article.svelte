<script lang="ts">
  import { stringColor } from '$lib/helpers';
  import classnames from 'classnames';
  export let article: Partial<Article>;
  export let wide = false;

  $: href = `/${article.Categories?.at(0) ?? 'uncategorized'}/${article.Slug}`;
</script>

{#if wide}
  <a
    class={classnames(
      'rounded-lg overflow-hidden md:items-center flex flex-col md:flex-row gap-6 group bg-white/5 hover:bg-white/10 transition duration-300 p-4',
      $$props.class
    )}
    {href}
  >
    <img
      src={article.Thumbnail}
      alt={article.Title}
      class="object-cover h-42 md:h-20 aspect-video rounded-lg group-hover:opacity-95 transition duration-300 ease-in-out"
    />
    <div>
      <div class="flex gap-2">
        {#each article.Categories || [] as category}
          <a
            href="/{category}"
            class="text-white text-xs font-semibold px-2 py-1 rounded-md uppercase"
            style="background:{stringColor(category)}"
          >
            {category}
          </a>
        {/each}
      </div>
      <h2 class="text-white font-semibold text-lg">{article.Title}</h2>
      <div class="flex gap-1 text-xs text-neutral-200">
        <p>
          {article.Author}
        </p>
        <span>•</span>
        <p>
          {article.Published.toLocaleDateString()}
        </p>
      </div>
    </div>
  </a>
{:else}
  <a class={classnames('relative rounded-lg overflow-hidden aspect-video group', $$props.class)} {href}>
    <img
      src={article.Thumbnail}
      alt={article.Title}
      class="object-cover inset-0 w-full -z-10 group-hover:scale-[102%] transition duration-300 ease-in-out"
    />
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/25 to-black/75 group-hover:opacity-100 opacity-90 transition duration-300"
    />
    <div class="absolute inset-x-0 bottom-0 p-4">
      <div class="flex gap-2">
        {#each article.Categories || [] as category}
          <a
            href="/{category}"
            class="text-white text-xs font-semibold px-2 py-1 rounded-md uppercase"
            style="background:{stringColor(category)}"
          >
            {category}
          </a>
        {/each}
      </div>
      <h2 class="text-white font-semibold text-lg mt-2">{article.Title}</h2>
      <div class="flex gap-1 text-xs text-neutral-200">
        <p>
          {article.Author}
        </p>
        <span>•</span>
        <p>
          {article.Published.toLocaleDateString()}
        </p>
      </div>
    </div>
  </a>
{/if}
