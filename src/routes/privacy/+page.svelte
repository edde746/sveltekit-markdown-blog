<script lang="ts">
  import type { PageData } from './$types';
  import { Marked } from '@ts-stack/markdown';

  export let data: PageData;
</script>

<div class="prose prose-invert mb-6">
  {@html Marked.parse(data.content)}
</div>
