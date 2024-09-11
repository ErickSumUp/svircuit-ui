<script context="module" lang="ts">
  import Pagination from '$lib/stories/Pagination.svelte';
  import { defineMeta, setTemplate, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Stories/Pagination',
    component: Pagination,
    argTypes: {},
    parameters: {
      layout: 'centered'
    }
  });
</script>

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template({ ...args }: Args<typeof Story>)}
  <Pagination {...args} />
{/snippet}

<Story name="Base" args={{ currentPage: 1, totalPages: 5, label: 'Pages' }} />

<Story name="ManyPages">
  <Pagination totalPages={10} currentPage={5} />
</Story>
