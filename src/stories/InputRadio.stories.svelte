<script lang="ts" module>
  import InputRadio from '$lib/components/InputRadio.svelte';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Forms/InputRadio',
    component: InputRadio,
    parameters: {
      layout: 'centered'
    }
  });
</script>

<script lang="ts">
  let value = $state('');
</script>

<Story name="Base" args={{ }}>
  {#snippet children({ ...args }: Args<typeof Story>)}
    <InputRadio bind:group={value} id="input-apple" name="fruit" value="apple" label="Apple" description="Keeps the doctor away" {...args}/>
    <InputRadio bind:group={value} id="input-mango" name="fruit" value="mango" label="Mango" />
    <p>The value is "{value}"</p>
  {/snippet}
</Story>

<Story name="Disabled" args={{ }}>
    <InputRadio bind:group={value} id="input-apple" name="fruit" value="apple" label="Apple" description="Keeps the doctor away" />
    <InputRadio bind:group={value} id="input-mango" name="fruit" value="mango" label="Mango" disabled/>
</Story>
