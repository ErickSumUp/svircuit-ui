<script lang="ts" module>
  import Input from '$lib/components/Input.svelte';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Forms/Input',
    component: Input,
    argTypes: {},
    parameters: {
      layout: 'centered'
    }
  });
</script>

<script lang="ts">
  let maxLength = 100;
  $: validationHint = `Maximum ${maxLength} characters`;
</script>

<Story name="Base" args={{ label: 'First name', placeholder: 'Jane', maxLength, validationHint }} >
  {#snippet children({ ...args }: Args<typeof Story>)}
    <Input {...args}>{args.children}</Input>
  {/snippet}
</Story>

<Story name="Validations">
  <div style="display: flex; flex-direction: row; gap: 2rem;">
    <Input
      id="invalid"
      label="Username"
      placeholder="jane123"
      validationHint="This field is required."
      invalid
    />
    <Input
      id="warning"
      label="Username"
      value="poop"
      validationHint="Choose an appropriate name."
      hasWarning
    />
    <Input
      id="valid"
      label="Username"
      value="jhon.doe"
      validationHint="Yay! That username is available."
      showValid
    />
  </div>
</Story>

<Story name="Optional">
  <Input
    id="optional"
    optionalLabel="optional"
    label="First name"
    placeholder="Jane"
    validationHint="Maximum 100 characters"
  />
</Story>

<Story name="Readonly">
  <Input
    id="optional"
    label="API token"
    value="a3b2c1"
    validationHint="Select and copy me."
    readOnly
  />
</Story>

<Story name="Disabled">
  <Input
    id="disabled"
    label="First name"
    value="You can't edit me"
    validationHint="Maximum 100 characters"
    disabled
  />
</Story>

<Story name="Inline">
  <div style="display: flex; gap: var(--cui-spacings-mega); grid-template-columns: repeat(2, 1fr)">
    <Input
      id="first-name"
      label="First name"
      placeholder="Jane"
      validationHint="Maximum 100 characters"
    />
    <Input
      id="second-name"
      label="Last name"
      placeholder="Doe"
      validationHint="Maximum 100 characters"
    />
  </div>
</Story>

<Story name="Hidden Label">
  <Input id="email" label="Email" hideLabel={true} placeholder="Email" />
</Story>

<Story name="Date">
  <Input
    id="date"
    label="Date of birth"
    type="date"
    validationHint="You must be at least 18 years old"
  />
</Story>
