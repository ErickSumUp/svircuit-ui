<script context="module">
  import Select from '$lib/components/Select.svelte';

  export const meta = {
    title: 'Components/Select',
    component: Select,
    argTypes: {
      label: {
        control: { type: 'text', defaultValue: 'Select' }
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
</script>

<Story name="Base" let:args>
  <Select {label} {...args}>
    <option value="" disabled selected>Select an option</option>
    <option value="US">United States</option>
    <option value="DE">Germany</option>
    <option value="FR">France</option>
  </Select>
</Story>

<Story name="Placeholder">
  <Select label="Countries" id="country" ariaDescribedBy="country selected">
    <option value="" disabled selected>Select an option</option>
  </Select>
</Story>
