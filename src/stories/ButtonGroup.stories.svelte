<script context="module">
  import ButtonGroup from '$lib/stories/ButtonGroup.svelte';

  export const meta = {
    title: 'Components/ButtonGroup',
    component: ButtonGroup,
    argTypes: {
      align: {
        options: ['left', 'center', 'right']
      }
    }
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
  import Button from '$lib/components/Button.svelte';
  import Stack from '$lib/stories/Stack.svelte';
</script>

<Story name="Base" let:args>
  <ButtonGroup {...args}>
    <Button variant="primary">Look Again</Button>
    <Button variant="secondary">Go elsewhere</Button>
  </ButtonGroup>
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
