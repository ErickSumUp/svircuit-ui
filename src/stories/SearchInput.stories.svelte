<script lang="ts" module>
  import SearchInput from '$lib/components/SearchInput.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Forms/SearchInput',
    component: SearchInput,
    parameters: {
      layout: 'centered'
    },
    argTypes: {
      placeholder: { control: 'text' },
      size: { control: 'select', options: ['s', 'm'] }
    },
    args: {
      label: 'Search',
      placeholder: 'Type a word...'
    }
  });

  type Args = ComponentProps<typeof SearchInput>;
</script>

<script lang="ts">
  import Stack from '$lib/components/Stack.svelte';

  let value = $state('');
  let valueSmall = $state('Apple');
  let valueMedium = $state('Apple');
</script>

<Story name="Base">
  {#snippet template(args: Args)}
    <SearchInput {...args} bind:value onClear={() => (value = '')} />
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template(args: Args)}
    <Stack>
      <SearchInput {...args} size="s" bind:value={valueSmall} onClear={() => (valueSmall = '')} />
      <SearchInput {...args} size="m" bind:value={valueMedium} onClear={() => (valueMedium = '')} />
    </Stack>
  {/snippet}
</Story>
