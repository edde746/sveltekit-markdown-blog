<script>
  import '../app.postcss';
  import Logo from '$lib/assets/logo.svg';

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
  </div>
</main>
