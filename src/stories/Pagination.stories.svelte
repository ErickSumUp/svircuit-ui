<script context="module">
  import Pagination from '$lib/stories/Pagination.svelte';

  export const meta = {
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
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';

  export let label = 'Countries';
  export let totalPages = 5;
</script>

<Story name="Base" let:args>
  <Pagination {totalPages} {label} {...args} />
</Story>

<Story name="ManyPages">
  <Pagination totalPages={10} currentPage={5} />
</Story>
