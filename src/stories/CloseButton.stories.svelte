<script lang="ts" module>
  import CloseButton from '$lib/components/CloseButton.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/Button/CloseButton',
    component: CloseButton,
    parameters: {
      layout: 'centered'
    },
    args: {
      label: 'Close'
    }
  });
</script>

<Story name="Base">
  {#snippet template(args)}
    <CloseButton {...args} />
  {/snippet}
</Story>

<Story name="Variants">
  {#snippet template()}
    <div style="display: flex; gap: 1rem; align-items: center;">
      {#each ['primary', 'secondary', 'tertiary'] as const as variant (variant)}
        <CloseButton {variant} label="Close" />
      {/each}
    </div>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    <div style="display: flex; gap: 1rem; align-items: center;">
      {#each ['s', 'm'] as const as size (size)}
        <CloseButton {size} variant="secondary" label="Close" />
      {/each}
    </div>
  {/snippet}
</Story>

<Story name="Destructive">
  {#snippet template()}
    <div style="display: flex; gap: 1rem; align-items: center;">
      {#each ['primary', 'secondary', 'tertiary'] as const as variant (variant)}
        <CloseButton {variant} destructive label="Close" />
      {/each}
    </div>
  {/snippet}
</Story>

<Story name="Disabled">
  {#snippet template()}
    <div style="display: flex; gap: 1rem; align-items: center;">
      {#each ['primary', 'secondary', 'tertiary'] as const as variant (variant)}
        <CloseButton {variant} disabled label="Close" />
      {/each}
    </div>
  {/snippet}
</Story>
