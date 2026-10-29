<script lang="ts" module>
  import Hamburger from '$lib/components/Hamburger.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Navigation/Hamburger',
    component: Hamburger,
    parameters: {
      layout: 'centered'
    },
    args: {
      activeLabel: 'Close menu',
      inactiveLabel: 'Open menu'
    }
  });
</script>

<script lang="ts">
  let isActive = $state(false);
  let isSmallActive = $state(false);
</script>

<Story name="Base">
  {#snippet template(args)}
    <Hamburger {...args} {isActive} onclick={() => (isActive = !isActive)} />
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template(args)}
    <div style="display: flex; gap: 1rem; align-items: center;">
      <Hamburger
        {...args}
        size="s"
        isActive={isSmallActive}
        onclick={() => (isSmallActive = !isSmallActive)}
      />
      <Hamburger {...args} size="m" {isActive} onclick={() => (isActive = !isActive)} />
    </div>
  {/snippet}
</Story>
