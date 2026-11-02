<script lang="ts" module>
  import TierIndicator from '$lib/components/TierIndicator.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Brand/TierIndicator',
    component: TierIndicator,
    args: { variant: 'plus', size: 'm' },
    argTypes: {
      variant: { control: 'select', options: ['plus'] },
      size: { control: 'select', options: ['s', 'm', 'l'] }
    }
  });
</script>

<Story name="Base" />

<Story name="Variations">
  {#snippet template()}
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <TierIndicator variant="plus" size="s" />
      <TierIndicator variant="plus" size="m" />
      <TierIndicator variant="plus" size="l" />
    </div>
  {/snippet}
</Story>
