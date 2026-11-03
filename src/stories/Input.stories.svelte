<script lang="ts" module>
  import Input from '$lib/components/Input.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Forms/Input',
    component: Input,
    parameters: {
      layout: 'centered'
    },
    argTypes: {
      size: { control: 'select', options: ['s', 'm'] },
      textAlign: { control: 'select', options: ['left', 'right'] }
    },
    args: {
      label: 'First name',
      placeholder: 'Jane',
      validationHint: 'Maximum 100 characters'
    }
  });

  type Args = ComponentProps<typeof Input>;
</script>

<script lang="ts">
  import Stack from '$lib/components/Stack.svelte';

  let value = $state('');
</script>

{#snippet search({ class: className }: { class: string })}
  <svg class={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      fill="currentColor"
      d="M11.575 15.65Q10.6 16 9.5 16q-2.725 0-4.612-1.887T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5a6.1 6.1 0 0 1-1.3 3.8l5.6 5.6-1.4 1.4-5.6-5.6q-.75.6-1.725.95M9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5t-1.312-3.187T9.5 5 6.313 6.313 5 9.5t1.313 3.188T9.5 14"
    />
  </svg>
{/snippet}

{#snippet unit({ class: className }: { class: string })}
  <span class={className} style="display: flex; align-items: center; justify-content: center"
    >kg</span
  >
{/snippet}

<Story name="Base">
  {#snippet template(args: Args)}
    <Input {...args} bind:value />
  {/snippet}
</Story>

<Story name="Validations">
  {#snippet template()}
    <Stack>
      <Input
        label="Username"
        placeholder="jane123"
        validationHint="This field is required."
        invalid
      />
      <Input
        label="Username"
        placeholder="jane123"
        value="poop"
        validationHint="C'mon. Choose an appropriate name."
        hasWarning
      />
      <Input
        label="Username"
        placeholder="jane123"
        value="john.doe"
        validationHint="Yay! That username is available."
        showValid
      />
    </Stack>
  {/snippet}
</Story>

<Story name="Optional" args={{ optionalLabel: 'optional' }}>
  {#snippet template(args: Args)}
    <Input {...args} />
  {/snippet}
</Story>

<Story
  name="Readonly"
  args={{
    label: 'API token',
    value: 'a3b2c1',
    validationHint: 'Select and copy me',
    readonly: true
  }}
>
  {#snippet template(args: Args)}
    <Input {...args} />
  {/snippet}
</Story>

<Story name="Disabled" args={{ value: "You can't edit me", disabled: true }}>
  {#snippet template(args: Args)}
    <Input {...args} />
  {/snippet}
</Story>

<Story name="Inline">
  {#snippet template(args: Args)}
    <div
      style="display: grid; gap: var(--cui-spacings-mega); grid-template-columns: repeat(2, 1fr)"
    >
      <Input {...args} label="First name" placeholder="Jane" />
      <Input {...args} label="Last name" placeholder="Doe" />
    </div>
  {/snippet}
</Story>

<Story
  name="Hidden label"
  args={{
    label: 'Email',
    placeholder: 'Email',
    type: 'email',
    validationHint: '',
    hideLabel: true
  }}
>
  {#snippet template(args: Args)}
    <Input {...args} />
  {/snippet}
</Story>

<Story name="Password">
  {#snippet template()}
    <Stack>
      <Input
        label="Password"
        placeholder="Enter password"
        type="password"
        validationHint="Use at least 8 characters."
      />
      <Input
        label="One time code"
        placeholder="Enter password"
        type="password"
        validationHint="Use at least 8 characters."
        passwordManagerIgnore
      />
    </Stack>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template(args: Args)}
    <Stack>
      <Input {...args} size="s" />
      <Input {...args} size="m" />
    </Stack>
  {/snippet}
</Story>

<Story name="Prefix and suffix">
  {#snippet template()}
    <Stack>
      <Input label="Search" placeholder="Search products" prefix={search} />
      <Input label="Weight" placeholder="0" textAlign="right" suffix={unit} />
      <Input label="Small search" placeholder="Search products" size="s" prefix={search} />
    </Stack>
  {/snippet}
</Story>
