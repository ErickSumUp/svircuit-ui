<script lang="ts" module>
  import Select from '$lib/components/Select.svelte';
  import Stack from '$lib/components/Stack.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

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

  type Args = Omit<ComponentProps<typeof Select>, 'children' | 'id'>;
</script>

<script lang="ts">
  let page_size = 10;
</script>

<Story name="Base" args={{ size: 'm', ariaDescribedBy: 'country' }}>
  {#snippet template({ ...args }: Args)}
    <Select id="country" {...args}>
      <option value="" disabled selected>Select an option</option>
      <option value="US">United States</option>
      <option value="DE">Germany</option>
      <option value="FR">France</option>
    </Select>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    <Stack>
      <Select
        label="Size"
        id="size"
        ariaDescribedBy="size selected"
        size="s"
        bind:value={page_size}
      >
        <option value={0} disabled>S</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </Select>
      <Select
        label="Size"
        id="size"
        ariaDescribedBy="size selected"
        size="m"
        bind:value={page_size}
      >
        <option value={0} disabled>M</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </Select>
    </Stack>
  {/snippet}
</Story>

<Story name="Placeholder">
  {#snippet template()}
    <Select label="Countries" id="country" ariaDescribedBy="country selected">
      <option value="" disabled selected>Select an option</option>
    </Select>
  {/snippet}
</Story>

<Story name="Pagination">
  {#snippet template()}
    <Stack>
      <Select
        label="Page size"
        hideLabel={true}
        size="s"
        id="page-size"
        ariaDescribedBy="page-size selected"
        bind:value={page_size}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </Select>
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
    </Stack>
  {/snippet}
</Story>
