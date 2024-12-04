<script lang="ts" module>
  import SearchInput from '$lib/components/SearchInput.svelte';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';

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
  {#snippet children({ ...args }: Args<typeof Story>)}
    <SearchInput id={args.id} label={args.label} {...args} />
  {/snippet}
</Story>
