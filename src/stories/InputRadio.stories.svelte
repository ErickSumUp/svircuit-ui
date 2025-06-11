<script lang="ts" module>
  import InputRadio from '$lib/components/InputRadio.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Forms/InputRadio',
    component: InputRadio,
    parameters: {
      layout: 'centered'
    }
  });

  type Args = Omit<ComponentProps<typeof InputRadio>, 'group'>;
</script>

<script lang="ts">
  let value = $state('');
</script>

<Story name="Base" args={{}}>
  {#snippet template({ ...args }: Args)}
    <InputRadio
      bind:group={value}
      id="input-apple"
      name="fruit"
      value="apple"
      label="Apple"
      description="Keeps the doctor away"
      {...args}
    />
    <InputRadio bind:group={value} id="input-mango" name="fruit" value="mango" label="Mango" />
    <p>The value is "{value}"</p>
  {/snippet}
</Story>

<Story name="Disabled" args={{}}>
  {#snippet template()}
    <InputRadio
      bind:group={value}
      id="input-apple"
      name="fruit"
      value="apple"
      label="Apple"
      description="Keeps the doctor away"
    />
    <InputRadio
      bind:group={value}
      id="input-mango"
      name="fruit"
      value="mango"
      label="Mango"
      disabled
    />
  {/snippet}
</Story>
