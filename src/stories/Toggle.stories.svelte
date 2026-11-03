<script lang="ts" module>
  import Toggle from '$lib/components/Toggle.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Forms/Toggle',
    component: Toggle,
    args: {
      label: 'Short label',
      disabled: false
    }
  });

  type Args = ComponentProps<typeof Toggle>;
</script>

<script lang="ts">
  let checked = $state(false);
</script>

<Story name="Base">
  {#snippet template(args: Args)}
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <Toggle {...args} bind:checked />
      <Toggle {...args} checked={!checked} onchange={() => (checked = !checked)} />
    </div>
  {/snippet}
</Story>

<Story name="With description" args={{ description: 'Some more detailed text of what this means' }}>
  {#snippet template(args: Args)}
    <Toggle {...args} />
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }}>
  {#snippet template(args: Args)}
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <Toggle {...args} />
      <Toggle {...args} checked />
    </div>
  {/snippet}
</Story>
