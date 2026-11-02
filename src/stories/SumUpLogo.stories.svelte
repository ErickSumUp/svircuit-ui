<script lang="ts" module>
  import SumUpLogo from '$lib/components/SumUpLogo.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Brand/SumUpLogo',
    component: SumUpLogo,
    args: { variant: 'full', size: 'm', label: 'SumUp' },
    argTypes: {
      variant: { control: 'select', options: ['full', 'short'] },
      size: { control: 'select', options: ['s', 'm', 'l'] }
    }
  });

  const sizes = ['s', 'm', 'l'] as const;
</script>

<Story name="Base" />

<Story name="Variations">
  {#snippet template()}
    <div
      style="display: grid; grid-template-columns: auto auto; gap: 1.5rem; justify-content: start;"
    >
      {#each sizes as size (size)}
        <SumUpLogo {size} />
        <SumUpLogo variant="short" {size} />
      {/each}
    </div>
  {/snippet}
</Story>
