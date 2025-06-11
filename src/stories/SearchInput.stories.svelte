<script lang="ts" module>
  import SearchInput from '$lib/components/SearchInput.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Components/SearchInput',
    component: SearchInput,
    argTypes: {
      label: {
        control: { type: 'text', defaultValue: 'SearchInput' }
      },
      placeholder: {
        control: { type: 'text', defaultValue: 'Type a word...' },
        type: { name: 'string', required: false }
      }
    },
    parameters: {
      layout: 'centered'
    }
  });
</script>

<script>
</script>

<Story
  name="Base"
  args={{
    children: '',
    label: 'First name',
    maxLength: 100,
    validationHint: 'Max 100 characters',
    placeholder: 'Type a word...'
  }}
>
  {#snippet template({ ...args }: ComponentProps<typeof SearchInput>)}
    <SearchInput {...args} />
  {/snippet}
</Story>
