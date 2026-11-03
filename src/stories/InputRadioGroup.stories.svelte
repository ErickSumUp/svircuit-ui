<script lang="ts" module>
  import InputRadioGroup from '$lib/stories/InputRadioGroup.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Forms/InputRadioGroup',
    component: InputRadioGroup,
    parameters: {
      layout: 'centered'
    },
    argTypes: {
      invalid: { control: 'boolean' },
      hasWarning: { control: 'boolean' },
      showValid: { control: 'boolean' }
    },
    args: {
      name: 'fruit',
      label: 'Choose your favourite fruit',
      options: [
        { label: 'Apple', value: 'apple', description: 'Keeps the doctor away' },
        { label: 'Banana', value: 'banana', description: 'Rich in Mg' },
        { label: 'Mango', value: 'mango' }
      ]
    }
  });
</script>

<script lang="ts">
  import Stack from '$lib/components/Stack.svelte';

  let value = $state<string | number>('banana');
  let valueWarning = $state<string | number>('mango');
  let valueValid = $state<string | number>('apple');
  let valueDisabled = $state<string | number>('apple');
  let valuePartiallyDisabled = $state<string | number>('apple');
</script>

<Story name="Base">
  {#snippet template(args)}
    <InputRadioGroup {...args} bind:value />
  {/snippet}
</Story>

<Story name="Validations">
  {#snippet template()}
    <Stack>
      <InputRadioGroup
        name="invalid"
        style="flex: 1; align-self: flex-start"
        label="Choose your favourite fruit"
        optionalLabel="Optional"
        options={[
          { label: 'Apple', value: 'apple', description: 'Keeps the doctor away' },
          { label: 'Banana', value: 'banana', description: 'Rich in Mg' },
          { label: 'Mango', value: 'mango' }
        ]}
        validationHint="Please choose an option."
        required
        invalid
      />
      <InputRadioGroup
        name="warning"
        style="flex: 1; align-self: flex-start"
        label="Choose your favourite fruit"
        optionalLabel="Optional"
        options={[
          { label: 'Apple', value: 'apple', description: 'Keeps the doctor away' },
          { label: 'Banana', value: 'banana', description: 'Rich in Mg' },
          { label: 'Mango', value: 'mango' }
        ]}
        validationHint="Some people are allergic to mangos."
        hasWarning
        bind:value={valueWarning}
      />
      <InputRadioGroup
        name="valid"
        style="flex: 1; align-self: flex-start"
        label="Choose your favourite fruit"
        optionalLabel="Optional"
        options={[
          { label: 'Apple', value: 'apple', description: 'Keeps the doctor away' },
          { label: 'Banana', value: 'banana', description: 'Rich in Mg' },
          { label: 'Mango', value: 'mango' }
        ]}
        validationHint="Good choice! Apples are delicious."
        showValid
        bind:value={valueValid}
      />
    </Stack>
  {/snippet}
</Story>

<Story name="Disabled">
  {#snippet template()}
    <Stack>
      <InputRadioGroup
        name="fully-disabled"
        style="flex: 1; align-self: flex-start"
        label="Select a fruit to order"
        options={[
          { label: 'Apple', value: 'apple', description: 'Keeps the doctor away' },
          { label: 'Banana', value: 'banana', description: 'Rich in Mg' },
          { label: 'Mango', value: 'mango' }
        ]}
        validationHint="All fruits are sold out"
        disabled
        bind:value={valueDisabled}
      />
      <InputRadioGroup
        name="partially-disabled"
        style="flex: 1; align-self: flex-start"
        label="Select a fruit to order"
        options={[
          { label: 'Apple', value: 'apple', description: 'Keeps the doctor away' },
          { label: 'Banana', value: 'banana', description: 'Rich in Mg', disabled: true },
          { label: 'Mango', value: 'mango' }
        ]}
        validationHint="Some fruits are sold out"
        bind:value={valuePartiallyDisabled}
      />
    </Stack>
  {/snippet}
</Story>
