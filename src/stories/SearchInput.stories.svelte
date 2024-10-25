<script context="module" lang="ts">
  import SearchInput from '$lib/components/SearchInput.svelte';
  import { defineMeta, setTemplate, type Args } from '@storybook/addon-svelte-csf';

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

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template({ ...args }: Args<typeof Story>)}
  <SearchInput id={args.id} label={args.label} {...args} />
{/snippet}

<Story
  name="Base"
  args={{
    children: '',
    label: 'First name',
    maxLength: 100,
    validationHint: 'Max 100 characters',
    placeholder: 'Type a word...'
  }}
/>
