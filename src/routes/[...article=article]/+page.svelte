<script lang="ts">
  import { stringColor } from '$lib/helpers';
  import { Marked } from '@ts-stack/markdown';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Twitter, Facebook, Reddit } from '@steeze-ui/simple-icons';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div>
  <div class="mb-6">
    <img src={data.header.Thumbnail} alt="Article Thumbnail" class="aspect-video w-full object-cover rounded-lg mb-3" />
    <h1 class="text-3xl font-semibold mb-1">{data.header.Title}</h1>
    <p class="text-sm text-neutral-300 mb-2">
      {data.header.Author} • {data.header.Published.toLocaleString('en-GB', {
        dateStyle: 'short',
        timeStyle: 'short',
      })}
    </p>

    <div class="flex gap-2">
      {#each data.header.Categories || [] as category}
        <a
          class="text-white flex items-center text-sm px-2 py-1 rounded-md uppercase hover:brightness-90 transition"
          style="background:{stringColor(category)}"
          href={`/${category}`}
        >
          {category}
        </a>
      {/each}

      <!-- Shares -->
      <button
        class="text-white p-1.5 rounded-md uppercase hover:brightness-90 transition"
        style="background:#1DA1F2"
        on:click={() => {
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.header.Title)}&url=${encodeURIComponent(
              location.href
            )}`,
            '_blank'
          );
        }}
      >
        <Icon src={Twitter} class="w-4 h-4" />
      </button>
      <button
        class="text-white p-1.5 rounded-md uppercase hover:brightness-90 transition"
        style="background:#1877F2"
        on:click={() => {
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`, '_blank');
        }}
      >
        <Icon src={Facebook} class="w-4 h-4" />
      </button>
      <button
        class="text-white p-1.5 rounded-md uppercase hover:brightness-90 transition"
        style="background:#FF4500"
        on:click={() => {
          window.open(
            `https://www.reddit.com/submit?url=${encodeURIComponent(location.href)}&title=${encodeURIComponent(
              data.header.Title
            )}`,
            '_blank'
          );
        }}
      >
        <Icon src={Reddit} class="w-4 h-4" />
      </button>
    </div>
  </div>

  <article class="prose-invert prose">
    {@html Marked.parse(data.content)}
  </article>
</div>
