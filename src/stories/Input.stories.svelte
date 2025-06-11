<script lang="ts" module>
  import Input from '$lib/components/Input.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Forms/Input',
    component: Input,
    parameters: {
      layout: 'centered'
    }
  });

  type Args = ComponentProps<typeof Input>;
</script>

<script lang="ts">
  import Stack from '$lib/components/Stack.svelte';

  let maxLength = 100;
  let validationHint = $state(`Maximum ${maxLength} characters`);
</script>

<Story name="Base" args={{ label: 'First name', placeholder: 'Jane', maxLength, validationHint }}>
  {#snippet template({ ...args }: Args)}
    <Input {...args}>{args.children}</Input>
  {/snippet}
</Story>

<Story name="Validations">
  {#snippet template()}
    <Stack>
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
    </Stack>
  {/snippet}
</Story>

<Story name="Optional">
  {#snippet template()}
    <Input
      id="optional"
      optionalLabel="optional"
      label="First name"
      placeholder="Jane"
      validationHint="Maximum 100 characters"
    />
  {/snippet}
</Story>

<Story name="Readonly">
  {#snippet template()}
    <Input
      id="optional"
      label="API token"
      value="a3b2c1"
      validationHint="Select and copy me."
      readonly
    />
  {/snippet}
</Story>

<Story name="Disabled">
  {#snippet template()}
    <Input
      id="disabled"
      label="First name"
      value="You can't edit me"
      validationHint="Maximum 100 characters"
      disabled
    />
  {/snippet}
</Story>

<Story name="Inline">
  {#snippet template()}
    <Stack>
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
    </Stack>
  {/snippet}
</Story>

<Story name="Hidden Label">
  {#snippet template()}
    <Input id="email" label="Email" hideLabel={true} placeholder="Email" />
  {/snippet}
</Story>

<Story name="Date">
  {#snippet template()}
    <Input
      id="date"
      label="Date of birth"
      type="date"
      validationHint="You must be at least 18 years old"
    />
  {/snippet}
</Story>
