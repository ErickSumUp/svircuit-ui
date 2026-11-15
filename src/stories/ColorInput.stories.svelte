<script lang="ts" module>
  import ColorInput from '$lib/components/ColorInput.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Forms/ColorInput',
    component: ColorInput,
    parameters: {
      layout: 'centered'
    },
    args: {
      label: 'Color',
      value: '#99ffbb'
    },
    argTypes: {
      value: { control: 'text' },
      disabled: { control: 'boolean' }
    }
  });

  type Args = ComponentProps<typeof ColorInput>;
</script>

<script lang="ts">
  import Stack from '$lib/components/Stack.svelte';
</script>

<Story name="Base" />

<Story name="Optional" args={{ optionalLabel: 'optional' }} />

<Story name="Readonly" args={{ readonly: true }} />

<Story name="Disabled" args={{ disabled: true }} />

<Story name="Validations">
  {#snippet template(args: Args)}
    <Stack>
      <ColorInput
        {...args}
        value="#0096FF"
        hasWarning={true}
        validationHint="Blue is not a Teletubby color :( "
      />
      <ColorInput
        {...args}
        value=""
        invalid={true}
        required={true}
        validationHint="Please enter a color"
      />
      <ColorInput {...args} value="#4a288d" showValid={true} validationHint="Tinky-Winky!" />
    </Stack>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template(args: Args)}
    <Stack>
      <ColorInput {...args} size="s" />
      <ColorInput {...args} size="m" />
    </Stack>
  {/snippet}
</Story>
