<script lang="ts" module>
  import Hr from '$lib/components/Hr.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/Hr',
    component: Hr,
    parameters: {
      layout: 'fullscreen'
    }
  });
</script>

<Story name="Base">
  {#snippet template(args)}
    <Hr {...args} />
  {/snippet}
</Story>
