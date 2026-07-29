<script lang="ts" module>
  import Spinner from '$lib/components/Spinner.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/Spinner',
    component: Spinner,
    parameters: {
      layout: 'centered'
    },
    argTypes: {
      size: { control: { type: 'select' }, options: ['s', 'm', 'l'] }
    }
  });
</script>

<Story name="Base">
  {#snippet template(args)}
    <Spinner {...args} />
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    <div style="display: flex; gap: 1rem; align-items: center;">
      {#each ['s', 'm', 'l'] as const as size (size)}
        <Spinner {size} />
      {/each}
    </div>
  {/snippet}
</Story>

<Story name="Colors">
  {#snippet template()}
    <div style="display: flex; gap: 1rem; align-items: center;">
      <Spinner style="color: var(--cui-fg-accent)" />
      <Spinner style="color: var(--cui-fg-success)" />
      <Spinner style="color: var(--cui-fg-danger)" />
      <div style="padding: 0.5rem; background: var(--cui-bg-strong)">
        <Spinner style="color: var(--cui-fg-on-strong)" />
      </div>
    </div>
  {/snippet}
</Story>
