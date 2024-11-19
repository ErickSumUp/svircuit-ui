<script lang="ts" module>
  import Pagination from '$lib/stories/Pagination.svelte';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';

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
  {#snippet children({ ...args }: Args<typeof Story>)}
    <Pagination {...args} />
  {/snippet}
</Story>

<Story name="ManyPages">
  <Pagination totalPages={10} currentPage={5} />
</Story>
