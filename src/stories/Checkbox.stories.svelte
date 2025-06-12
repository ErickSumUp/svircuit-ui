<script lang="ts" module>
  import Checkbox from '$lib/components/Checkbox.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Components/Checkbox',
    component: Checkbox,
    parameters: {
      layout: 'centered'
    },
    argTypes: {}
  });

  type Args = ComponentProps<typeof Checkbox>;

  let checkboxes = $state([false, false, true]);

  function onchange(event: Event) {
    const target = event.target as HTMLInputElement;
    checkboxes = [
      ...Array(checkboxes.length)
        .keys()
        .map(() => target.checked)
    ];
  }
</script>

<Story name="Base" args={{}}>
  {#snippet template({ ...args }: Args)}
    <Checkbox {...args} label="I have read and agree to the terms and conditions" />
  {/snippet}
</Story>

<Story
  name="Validations"
  args={{
    label: 'I have read and agree to the terms and conditions',
    invalid: true,
    value: 'terms',
    validationHint: 'Please accept the terms and conditions to continue'
  }}
/>

<Story
  name="Disabled"
  args={{
    name: 'disabled',
    label: 'Next day delivery',
    disabled: true,
    validationHint: 'Express shipping is unavailable in your region'
  }}
/>

<Story name="Indeterminate" args={{}}>
  {#snippet template()}
    <fieldset name="indeterminate" style="border: 'none'; margin: 0; padding: 0;">
      <legend
        style="display: 'block';
          marginBottom: var(--cui-spacings-bit);
          fontSize: var(--cui-body-s-font-size);
          lineHeight: var(--cui-body-s-line-height);
          padding: 0"
      >
        Choose your favorite fruits
      </legend>
      <Checkbox
        id="all-fruits"
        label="All fruits"
        name="indeterminate"
        value="all"
        {onchange}
        indeterminate={checkboxes.some((checkbox) => checkbox) &&
          !checkboxes.every((checkbox) => checkbox)}
        checked={checkboxes.every((checkbox) => checkbox)}
      />
      <ul style="list-style: none; padding: 0; margin: 0; margin-left: 26px;">
        {#each checkboxes as checkbox, i (i)}
          <li>
            <Checkbox
              id={'' + i}
              label={'Checkbox ' + i}
              name={i}
              value={i}
              bind:checked={checkboxes[i]}
            />
          </li>
        {/each}
      </ul>
    </fieldset>
  {/snippet}
</Story>
