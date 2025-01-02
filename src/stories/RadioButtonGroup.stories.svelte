<script lang="ts" module>
  import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Forms/RadioButtonGroup',
    component: RadioButtonGroup,
    parameters: {
      layout: 'centered'
    }
  });
</script>

<script lang="ts">
  import Input from '$lib/components/Input.svelte';
  import InputRadio from '$lib/components/InputRadio.svelte';

  let options = [
    ['option1', 'Option 1'],
    ['option2', 'Option 2'],
    ['option3', 'Option 3']
  ];
</script>

<Story name="Base" args={{ options }}>
  {#snippet children({ ...args }: Args<typeof Story>)}
    <InputRadio id="input1" name="xd" label="Apple" description="Keeps the doctor away">Apple</InputRadio>
    <InputRadio id="input2" name="xd" label="Banana" description="Rich in Mg">Banana</InputRadio>
    <InputRadio id="input3" name="xd" label="Mango">Mango</InputRadio>
  {/snippet}
</Story>

<Story name="Validations">
  <div style="display: flex; flex-direction: row; gap: 2rem;">
    <RadioButtonGroup
      id="invalid"
      label="Username"
      placeholder="jane123"
      validationHint="This field is required."
      invalid
    />
    <RadioButtonGroup
      id="warning"
      label="Username"
      value="poop"
      validationHint="Choose an appropriate name."
      hasWarning
    />
    <RadioButtonGroup
      id="valid"
      label="Username"
      value="jhon.doe"
      validationHint="Yay! That username is available."
      showValid
    />
  </div>
</Story>

<Story name="Optional">
  <RadioButtonGroup
    id="optional"
    optionalLabel="optional"
    label="First name"
    placeholder="Jane"
    validationHint="Maximum 100 characters"
  />
</Story>

<Story name="Readonly">
  <RadioButtonGroup
    id="optional"
    label="API token"
    value="a3b2c1"
    validationHint="Select and copy me."
    readonly
  />
</Story>

<Story name="Disabled">
  <RadioButtonGroup
    id="disabled"
    label="First name"
    value="You can't edit me"
    validationHint="Maximum 100 characters"
    disabled
  />
</Story>

<Story name="Inline">
  <div style="display: flex; gap: var(--cui-spacings-mega); grid-template-columns: repeat(2, 1fr)">
    <RadioButtonGroup
      id="first-name"
      label="First name"
      placeholder="Jane"
      validationHint="Maximum 100 characters"
    />
    <RadioButtonGroup
      id="second-name"
      label="Last name"
      placeholder="Doe"
      validationHint="Maximum 100 characters"
    />
  </div>
</Story>

<Story name="Hidden Label">
  <RadioButtonGroup id="email" label="Email" hideLabel={true} placeholder="Email" />
</Story>

<Story name="Date">
  <RadioButtonGroup
    id="date"
    label="Date of birth"
    type="date"
    validationHint="You must be at least 18 years old"
  />
</Story>
