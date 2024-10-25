<script context="module" lang="ts">
  import ButtonGroup from '$lib/stories/ButtonGroup.svelte';
  import { defineMeta, setTemplate, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/ButtonGroup',
    component: ButtonGroup,
    argTypes: {
      align: {
        options: ['left', 'center', 'right']
      }
    }
  });
</script>

<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Stack from '$lib/components/Stack.svelte';

  setTemplate(template);
</script>

{#snippet template({ children, ...args }: Args<typeof Story>)}
  <ButtonGroup {...args}>
    {#if children}
      {children}
    {:else}
      <Button variant="primary">Look Again</Button>
      <Button variant="secondary">Go elsewhere</Button>
    {/if}
  </ButtonGroup>
{/snippet}

<Story name="Base" args={{ align: 'center' }} />

<Story name="Alignment">
  <Stack vertical>
    <ButtonGroup align="center">
      <Button variant="primary">Look Again</Button>
      <Button variant="secondary">Go elsewhere</Button>
    </ButtonGroup>
    <ButtonGroup align="left">
      <Button variant="primary">Look Again</Button>
      <Button variant="secondary">Go elsewhere</Button>
    </ButtonGroup>
    <ButtonGroup align="right">
      <Button variant="primary">Look Again</Button>
      <Button variant="secondary">Go elsewhere</Button>
    </ButtonGroup>
  </Stack>
</Story>
