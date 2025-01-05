<script lang="ts" module>
  import InputRadioGroup from '$lib/components/InputRadioGroup.svelte';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Forms/InputRadioGroup',
    component: InputRadioGroup,
    parameters: {
      layout: 'centered'
    }
  });
</script>

<script lang="ts">
  import InputRadio from '$lib/components/InputRadio.svelte';
  import Stack from '$lib/components/Stack.svelte';

  let value = $state('');
  let valueValidationsInvalid = $state('');
  let valueValidationsWarning = $state('');
  let valueValidationsValid = $state('');
  let valueDisabledFull = $state('');
  let valueDisabled = $state('apple');
</script>

<Story name="Base" args={{}}>
  {#snippet children({ ...args }: Args<typeof Story>)}
    <InputRadioGroup label="Choose your favourite fruit" {...args}>
      <InputRadio
        bind:group={value}
        id="input-apple"
        name="fruit"
        value="apple"
        label="Apple"
        description="Keeps the doctor away"
        {...args}
      />
      <InputRadio
        bind:group={value}
        id="input-banana"
        name="fruit"
        value="banana"
        label="Banana"
        description="Rich in Mg"
      />
      <InputRadio bind:group={value} id="input-mango" name="fruit" value="mango" label="Mango" />
    </InputRadioGroup>
  {/snippet}
</Story>

<Story name="Validations">
  <Stack>
    <InputRadioGroup
      label="Choose your favourite fruit"
      invalid
      validationHint="Please choose an option."
    >
      <InputRadio
        bind:group={valueValidationsInvalid}
        id="input-apple-invalid"
        name="fruit-invalid"
        value="apple"
        label="Apple"
        description="Keeps the doctor away"
        invalid
      />
      <InputRadio
        bind:group={valueValidationsInvalid}
        id="input-banana-invalid"
        name="fruit-invalid"
        value="banana"
        label="Banana"
        description="Rich in Mg"
        invalid
      />
      <InputRadio
        bind:group={valueValidationsInvalid}
        id="input-mango-invalid"
        name="fruit-invalid"
        value="mango"
        label="Mango"
        invalid
      />
    </InputRadioGroup>
    <InputRadioGroup
      label="Choose your favourite fruit"
      optionalLabel="Optional"
      hasWarning
      validationHint="Some people are allergic to mangos."
    >
      <InputRadio
        bind:group={valueValidationsWarning}
        id="input-apple-warning"
        name="fruit-warning"
        value="apple"
        label="Apple"
        description="Keeps the doctor away"
      />
      <InputRadio
        bind:group={valueValidationsWarning}
        id="input-banana-warning"
        name="fruit-warning"
        value="banana"
        label="Banana"
        description="Rich in Mg"
      />
      <InputRadio
        bind:group={valueValidationsWarning}
        id="input-mango-warning"
        name="fruit-warning"
        value="mango"
        label="Mango"
      />
    </InputRadioGroup>
    <InputRadioGroup
      optionalLabel="Optional"
      label="Choose your favourite fruit"
      showValid
      validationHint="Good choice! Apples are delicious."
    >
      <InputRadio
        bind:group={valueValidationsValid}
        id="input-apple-valid"
        name="fruit-valid"
        value="apple"
        label="Apple"
        description="Keeps the doctor away"
      />
      <InputRadio
        bind:group={valueValidationsValid}
        id="input-banana-valid"
        name="fruit-valid"
        value="banana"
        label="Banana"
        description="Rich in Mg"
      />
      <InputRadio
        bind:group={valueValidationsValid}
        id="input-mango-valid"
        name="fruit-valid"
        value="mango"
        label="Mango"
      />
    </InputRadioGroup>
  </Stack>
</Story>

<Story name="Disabled">
  <Stack>
    <InputRadioGroup
      label="Select a fruit to order"
      validationHint="All fruits are sold out"
      disabled
    >
      <InputRadio
        bind:group={valueDisabledFull}
        id="input-apple-disabled-full"
        name="fruit-disabled-full"
        value="apple"
        label="Apple"
        description="Keeps the doctor away"
      />
      <InputRadio
        bind:group={valueDisabledFull}
        id="input-banana-disabled-full"
        name="fruit-disabled-full"
        value="banana"
        label="Banana"
        description="Rich in Mg"
      />
      <InputRadio
        bind:group={valueDisabledFull}
        id="input-mango-disabled-full"
        name="fruit-disabled-full"
        value="mango"
        label="Mango"
      />
    </InputRadioGroup>
    <InputRadioGroup label="Select a fruit to order" validationHint="Some fruits are sold out">
      <InputRadio
        bind:group={valueDisabled}
        id="input-apple-disabled"
        name="fruit-disabled"
        value="apple"
        label="Apple"
        description="Keeps the doctor away"
      />
      <InputRadio
        bind:group={valueDisabled}
        id="input-banana-disabled"
        name="fruit-disabled"
        value="banana"
        label="Banana"
        description="Rich in Mg"
        disabled
      />
      <InputRadio
        bind:group={valueDisabled}
        id="input-mango-disabled"
        name="fruit-disabled"
        value="mango"
        label="Mango"
      />
    </InputRadioGroup>
  </Stack>
</Story>
