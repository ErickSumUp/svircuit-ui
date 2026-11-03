<script lang="ts" module>
  import Checkbox from '$lib/components/Checkbox.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Forms/Checkbox',
    component: Checkbox,
    argTypes: {
      disabled: { control: 'boolean' }
    }
  });

  type Args = ComponentProps<typeof Checkbox>;
</script>

<script lang="ts">
  let accepted = $state(false);

  let apple = $state(false);
  let banana = $state(false);
  let mango = $state(true);
  const allChecked = $derived(apple && banana && mango);
  const someChecked = $derived(apple || banana || mango);

  function toggleAll() {
    const next = !allChecked;
    apple = next;
    banana = next;
    mango = next;
  }
</script>

<Story
  name="Base"
  args={{
    label: 'I have read and agree to the terms and conditions',
    name: 'consent',
    value: 'terms'
  }}
/>

<Story
  name="Validations"
  args={{
    label: 'I have read and agree to the terms and conditions',
    name: 'validations',
    value: 'terms'
  }}
>
  {#snippet template(args: Args)}
    <Checkbox
      {...args}
      bind:checked={accepted}
      invalid={!accepted}
      validationHint={accepted ? undefined : 'Please accept the terms and conditions to continue'}
    />
  {/snippet}
</Story>

<Story
  name="Disabled"
  args={{
    label: 'Next day delivery',
    name: 'disabled',
    validationHint: 'Express shipping is unavailable in your region',
    disabled: true
  }}
/>

<Story name="Indeterminate">
  {#snippet template()}
    <fieldset name="indeterminate" style="border: none; margin: 0; padding: 0;">
      <legend
        style="display: block; margin-bottom: var(--cui-spacings-bit); font-size: var(--cui-body-s-font-size); line-height: var(--cui-body-s-line-height); padding: 0;"
      >
        Choose your favorite fruits
      </legend>
      <Checkbox
        label="All fruits"
        name="indeterminate"
        value="all"
        checked={allChecked}
        indeterminate={someChecked && !allChecked}
        onchange={toggleAll}
      />
      <ul style="list-style: none; margin: 0; padding: 0; margin-left: 26px;">
        <li><Checkbox label="Apple" name="indeterminate" value="apple" bind:checked={apple} /></li>
        <li>
          <Checkbox label="Banana" name="indeterminate" value="banana" bind:checked={banana} />
        </li>
        <li><Checkbox label="Mango" name="indeterminate" value="mango" bind:checked={mango} /></li>
      </ul>
    </fieldset>
  {/snippet}
</Story>
