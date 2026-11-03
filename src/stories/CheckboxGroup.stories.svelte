<script lang="ts" module>
  import CheckboxGroup from '$lib/stories/CheckboxGroup.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' }
  ];

  const { Story } = defineMeta({
    title: 'Forms/CheckboxGroup',
    component: CheckboxGroup,
    args: {
      label: 'Choose your favourite fruit',
      options
    }
  });

  type Args = ComponentProps<typeof CheckboxGroup>;
</script>

<script lang="ts">
  let value = $state(['mango']);
</script>

<Story name="Base" args={{ name: 'fruits' }}>
  {#snippet template(args: Args)}
    <CheckboxGroup {...args} bind:value />
  {/snippet}
</Story>

<Story name="Validations" args={{ optionalLabel: 'Optional' }}>
  {#snippet template(args: Args)}
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <CheckboxGroup
        {...args}
        name="invalid"
        validationHint="Please choose an option."
        required
        invalid
        style="flex: 1; align-self: flex-start;"
      />
      <CheckboxGroup
        {...args}
        name="warning"
        value={['mango']}
        validationHint="Some people are allergic to mangos."
        hasWarning
        style="flex: 1; align-self: flex-start;"
      />
      <CheckboxGroup
        {...args}
        name="valid"
        value={['apple']}
        validationHint="Good choice! Apples are delicious."
        showValid
        style="flex: 1; align-self: flex-start;"
      />
    </div>
  {/snippet}
</Story>

<Story name="Disabled" args={{ label: 'Select some fruits to order' }}>
  {#snippet template(args: Args)}
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <CheckboxGroup
        {...args}
        name="fully-disabled"
        value={['apple']}
        disabled
        validationHint="All fruits are sold out"
        style="flex: 1; align-self: flex-start;"
      />
      <CheckboxGroup
        {...args}
        name="partially-disabled"
        value={['apple']}
        options={[
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Mango', value: 'mango', disabled: true }
        ]}
        validationHint="Some fruits are sold out"
        style="flex: 1; align-self: flex-start;"
      />
    </div>
  {/snippet}
</Story>
