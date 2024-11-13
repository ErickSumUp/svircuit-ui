<script lang="ts" module>
  import ButtonGroup from '$lib/stories/ButtonGroup.svelte';
  import Button from '$lib/components/Button.svelte';
  import Stack from '$lib/components/Stack.svelte';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/ButtonGroup',
    component: ButtonGroup,
  });
</script>

<script lang="ts">
</script>

<Story name="Base" args={{ align: 'center' }}>
  {#snippet children(args: Args<typeof Story>)}
    <ButtonGroup {...args}>
      <Button variant="primary">Look Again</Button>
      <Button variant="secondary">Go elsewhere</Button>
    </ButtonGroup>
  {/snippet}
</Story>

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
