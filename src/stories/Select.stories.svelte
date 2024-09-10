<script context="module" lang="ts">
  import Select from '$lib/components/Select.svelte';
  import { defineMeta, setTemplate, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/Select',
    component: Select,
    argTypes: {
      label: {
        control: { type: 'text', defaultValue: 'Select' }
      },
      size: {
        options: ['s', 'm']
      }
    },
    parameters: {
      layout: 'centered'
    }
  });
</script>

<script lang="ts">
  setTemplate(template);

  let page_size = 10;
</script>

{#snippet template({ ...args }: Args<typeof Story>)}
  <Select id="country" ariaDescribedBy="country" {...args}>
    <option value="" disabled selected>Select an option</option>
    <option value="US">United States</option>
    <option value="DE">Germany</option>
    <option value="FR">France</option>
  </Select>
{/snippet}

<Story name="Base" args={{ size: 'm' }}/>

<Story name="Sizes">
  <div style="display: flex; flex-direction: row; align-items: center; gap: 50px">
    <Select label="Size" id="size" ariaDescribedBy="size selected" size="s" bind:value={page_size}>
      <option value={0} disabled>S</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </Select>
    <Select label="Size" id="size" ariaDescribedBy="size selected" size="m" bind:value={page_size}>
      <option value={0} disabled>M</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </Select>
  </div>
</Story>

<Story name="Placeholder">
  <Select label="Countries" id="country" ariaDescribedBy="country selected">
    <option value="" disabled selected>Select an option</option>
  </Select>
</Story>

<Story name="Pagination">
  <Select
    label="Page size"
    hideLabel={true}
    id="page-size"
    ariaDescribedBy="page-size selected"
    bind:value={page_size}
  >
    <option value={10}>10</option>
    <option value={20}>20</option>
    <option value={50}>50</option>
    <option value={100}>100</option>
  </Select>
</Story>
