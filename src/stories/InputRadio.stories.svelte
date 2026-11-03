<script lang="ts" module>
  import InputRadio from '$lib/components/InputRadio.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Forms/InputRadio',
    component: InputRadio,
    parameters: {
      layout: 'centered'
    },
    args: {
      label: 'Apple',
      description: 'Keeps the doctor away',
      value: 'apple',
      name: 'fruit'
    }
  });
</script>

<script lang="ts">
  let value = $state('apple');
  let valueDisabled = $state('apple');
</script>

<Story name="Base">
  {#snippet template(args)}
    <InputRadio {...args} bind:group={value} />
    <InputRadio label="Mango" value="mango" name="fruit" bind:group={value} />
    <p>The value is "{value}"</p>
  {/snippet}
</Story>

<Story name="Disabled">
  {#snippet template()}
    <InputRadio
      label="Apple"
      description="Keeps the doctor away"
      value="apple"
      name="fruit-disabled"
      disabled
      bind:group={valueDisabled}
    />
    <InputRadio
      label="Mango"
      value="mango"
      name="fruit-disabled"
      disabled
      bind:group={valueDisabled}
    />
  {/snippet}
</Story>
