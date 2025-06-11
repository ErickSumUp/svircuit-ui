<script lang="ts" module>
  import Pagination from '$lib/stories/Pagination.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Stories/Pagination',
    component: Pagination,
    argTypes: {},
    parameters: {
      layout: 'centered'
    }
  });
</script>

<Story name="Base" args={{ currentPage: 1, totalPages: 5, label: 'Pages' }}>
  {#snippet template({ ...args }: ComponentProps<typeof Pagination>)}
    <Pagination {...args} />
  {/snippet}
</Story>

<Story name="ManyPages">
  {#snippet template()}
    <Pagination totalPages={10} currentPage={5} />
  {/snippet}
</Story>
