<script context="module" lang="ts">
  import Pagination from '$lib/stories/Pagination.svelte';
  import { defineMeta, setTemplate, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Stories/Pagination',
    component: Pagination,
    argTypes: {
      label: {
        control: { type: 'text', defaultValue: 'Pagination' }
      }
    },
    parameters: {
      layout: 'centered'
    }
  });
</script>

<script lang="ts">
  setTemplate(template);

  export let label = 'Pages';
  export let totalPages = 5;
</script>

{#snippet template({ children, ...args }: Args<typeof Story>)}
  <Pagination {...args}>{children}</Pagination>
{/snippet}

<Story name="Base" args={{ totalPages, label }} />

<Story name="ManyPages">
  <Pagination totalPages={10} currentPage={5} />
</Story>
