<script lang="ts" module>
  import Button from '$lib/components/Button.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Components/Button',
    component: Button,
    argTypes: {
      leading_icon: {
        type: 'string'
      }
    },
    parameters: {
      layout: 'centered'
    }
  });

  type Args = ComponentProps<typeof Button>;
</script>

<script lang="ts">
  import ArrowSlanted from '$lib/icons/ArrowSlanted.svelte';
  import Placeholder from '$lib/icons/Placeholder.svelte';
  import Shop from '$lib/icons/Shop.svelte';
  import Close from '$lib/icons/Close.svelte';
  import DownloadCloud from '$lib/icons/DownloadCloud.svelte';
  import Stack from '$lib/components/Stack.svelte';
</script>

<Story name="Base" args={{ variant: 'secondary', size: 'm' }}>
  {#snippet template({ children, ...args }: Args)}
    <Button onclick={() => alert('Hello!')} {...args}>{children || 'Say Hello'}</Button>
  {/snippet}
</Story>

<Story name="Variants">
  {#snippet template()}
    <Stack>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </Stack>
  {/snippet}
</Story>

<Story name="Destructive">
  {#snippet template()}
    <Stack>
      <Button variant="primary" destructive={true}>Primary</Button>
      <Button variant="secondary" destructive={true}>Secondary</Button>
      <Button variant="tertiary" destructive={true}>Tertiary</Button>
    </Stack>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    <Stack>
      <Button size="s">Small</Button>
      <Button size="m">Medium</Button>
    </Stack>
  {/snippet}
</Story>

<Story name="WithIcons">
  {#snippet template()}
    <Stack>
      <Button>
        {#snippet leading_icon()}
          <Placeholder />
        {/snippet}
        Add to cart
      </Button>
      <Button size="m">
        Terms & Conditions
        {#snippet trailing_icon()}
          <ArrowSlanted size="16" />
        {/snippet}
      </Button>
    </Stack>
  {/snippet}
</Story>

<Story name="ButtonGroup">
  {#snippet template()}
    <Stack>
      <Button>Go elsewhere</Button>
      <Button variant="primary">Look again</Button>
    </Stack>
  {/snippet}
</Story>

<Story name="OnlyIcons">
  {#snippet template()}
    <Stack>
      <Button size="s" hideLabel={true}>
        {#snippet leading_icon()}
          <Placeholder size="16" />
        {/snippet}
        Circuit
      </Button>

      <Button size="m" variant="primary" hideLabel={true}>
        {#snippet leading_icon()}
          <DownloadCloud />
        {/snippet}
        Download
      </Button>

      <Button size="m" variant="secondary" hideLabel={true}>
        {#snippet leading_icon()}
          <Close size="24" />
        {/snippet}
        Close
      </Button>

      <Button size="m" disabled={true} hideLabel={true}>
        {#snippet leading_icon()}
          <Shop size="24" />
        {/snippet}
        Cart
      </Button>

      <Button size="m" variant="primary" isLoading={true} hideLabel={true}>
        {#snippet leading_icon()}
          <Placeholder size="24" />
        {/snippet}
        Circuit
      </Button>
    </Stack>
  {/snippet}
</Story>
