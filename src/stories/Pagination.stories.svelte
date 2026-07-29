<script lang="ts" module>
  import Pagination from '$lib/stories/Pagination.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Navigation/Pagination',
    component: Pagination,
    parameters: {
      layout: 'centered'
    }
  });

  const baseArgs = {
    label: 'Pagination',
    totalPages: 5,
    pageLabel: (page: number) => `Go to page ${page}`,
    previousLabel: 'Previous page',
    nextLabel: 'Next page'
  };
</script>

<script lang="ts">
  let page = $state(1);
  let manyPage = $state(1);
  let hugePage = $state(500);
</script>

<Story name="Base" args={baseArgs}>
  {#snippet template(args)}
    <Pagination {...args} currentPage={page} onChange={(next) => (page = next)} />
  {/snippet}
</Story>

<Story name="ManyPages" args={{ ...baseArgs, totalPages: 10 }}>
  {#snippet template(args)}
    <Pagination {...args} currentPage={manyPage} onChange={(next) => (manyPage = next)} />
  {/snippet}
</Story>

<Story name="ThousandsOfPages" args={{ ...baseArgs, totalPages: 1000 }}>
  {#snippet template(args)}
    <Pagination {...args} currentPage={hugePage} onChange={(next) => (hugePage = next)} />
  {/snippet}
</Story>

<Story name="SinglePage" args={{ ...baseArgs, totalPages: 1 }}>
  {#snippet template(args)}
    <Pagination {...args} currentPage={1} onChange={() => {}} />
  {/snippet}
</Story>
