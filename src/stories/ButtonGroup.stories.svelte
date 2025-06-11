<script lang="ts" module>
  import ButtonGroup from '$lib/stories/ButtonGroup.svelte';
  import Button from '$lib/components/Button.svelte';
  import Stack from '$lib/components/Stack.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Components/ButtonGroup',
    component: ButtonGroup
  });

  type Args = Omit<ComponentProps<typeof ButtonGroup>, 'children'>;
</script>

<script lang="ts">
</script>

<Story name="Base" args={{ align: 'center' }}>
  {#snippet template(args: Args)}
    <ButtonGroup {...args}>
      <Button variant="primary">Look Again</Button>
      <Button variant="secondary">Go elsewhere</Button>
    </ButtonGroup>
  {/snippet}
</Story>

<Story name="Alignment">
  {#snippet template()}
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
  {/snippet}
</Story>
