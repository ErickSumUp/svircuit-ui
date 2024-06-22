<script context="module">
  import Toggle from '$lib/components/Toggle.svelte';

  export const meta = {
    title: 'Forms/Toggle',
    component: Toggle,
    parameters: {
      layout: 'centered'
    }
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';

  export let label = 'Short label';
  export let description = 'Some more detailed text of what this means';
</script>

<Story name="Base" let:args>
  <Toggle {label} {description} {...args} />
</Story>
