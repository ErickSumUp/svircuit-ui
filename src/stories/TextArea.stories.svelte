<script lang="ts" module>
  import TextArea from '$lib/components/TextArea.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Forms/TextArea',
    component: TextArea,
    args: {
      label: 'Describe your issue',
      placeholder: 'Be detailed and concise...'
    },
    argTypes: {
      placeholder: { control: 'text' },
      disabled: { control: 'boolean' }
    }
  });

  type Args = ComponentProps<typeof TextArea>;
</script>

<Story name="Base" />

<Story name="Validations">
  {#snippet template(args: Args)}
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <TextArea {...args} validationHint="Please fill in this field." invalid={true} />
      <TextArea
        {...args}
        validationHint="We recommend that you fill in this field"
        hasWarning={true}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="Readonly"
  args={{ placeholder: 'You can select and copy but not edit me', readonly: true }}
/>

<Story
  name="Disabled"
  args={{ value: 'You cannot edit the text because the textarea is disabled', disabled: true }}
/>

<Story name="Hidden label" args={{ placeholder: 'Describe your issue', hideLabel: true }} />

<Story
  name="Auto expand"
  args={{
    placeholder: 'Try writing a long text, textarea auto adapt its height to your text.',
    rows: 'auto'
  }}
/>
