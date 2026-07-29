<script lang="ts" module>
  import DateInput from '$lib/stories/DateInput.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Forms/DateInput',
    component: DateInput,
    parameters: {
      layout: 'padded'
    }
  });

  type Args = ComponentProps<typeof DateInput>;

  // Fun fact: Circuit UI was created on August 28, 2017
  const baseArgs = {
    label: 'Date of birth',
    autocomplete: 'bday' as const,
    locale: 'en-US'
  };
</script>

<script lang="ts">
  import Stack from '$lib/components/Stack.svelte';

  let value = $state('');
</script>

<Story name="Base" args={baseArgs}>
  {#snippet template(args: Args)}
    <DateInput {...args} bind:value />
  {/snippet}
</Story>

<Story name="Validations" args={baseArgs}>
  {#snippet template(args: Args)}
    <Stack vertical>
      <Stack>
        <DateInput {...args} validationHint="Please enter your birth date" required invalid />
        <DateInput {...args} value="1917-08-28" validationHint="That's mighty old" hasWarning />
        <DateInput
          {...args}
          value="2004-03-15"
          validationHint="You meet the age requirements"
          showValid
        />
      </Stack>
      <Stack>
        <DateInput
          {...args}
          min="2024-01-01"
          max="2024-12-31"
          validationHint="Enter a date in 2024"
        />
        <DateInput
          {...args}
          min="2024-08-01"
          max="2024-08-31"
          validationHint="Enter a date in August 2024"
        />
      </Stack>
    </Stack>
  {/snippet}
</Story>

<Story name="Optional" args={{ ...baseArgs, optionalLabel: 'optional', value: '2017-08-28' }}>
  {#snippet template(args: Args)}
    <DateInput {...args} />
  {/snippet}
</Story>

<Story
  name="Readonly"
  args={{ ...baseArgs, label: 'Appointment date', value: '2017-08-28', readonly: true }}
>
  {#snippet template(args: Args)}
    <DateInput {...args} />
  {/snippet}
</Story>

<Story name="Disabled" args={{ ...baseArgs, value: '2017-08-28', disabled: true }}>
  {#snippet template(args: Args)}
    <DateInput {...args} />
  {/snippet}
</Story>

<Story name="Locales" args={baseArgs}>
  {#snippet template(args: Args)}
    <Stack>
      <DateInput {...args} locale="de-DE" label="Geburtsdatum" />
      <DateInput {...args} locale="es-CL" label="Fecha de nacimiento" />
      <DateInput {...args} locale="pt-BR" label="Data de nascimento" />
    </Stack>
  {/snippet}
</Story>
