<script lang="ts" module>
  import Button from '$lib/components/Button.svelte';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';

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
  {#snippet children({ ...args }: Args<typeof Story>)}
    <Button onclick={() => alert('Hello!')} {...args}>Say Hello</Button>
  {/snippet}
</Story>

<Story name="Variants">
  <Stack>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="tertiary">Tertiary</Button>
  </Stack>
</Story>

<Story name="Destructive">
  <Stack>
    <Button variant="primary" destructive={true}>Primary</Button>
    <Button variant="secondary" destructive={true}>Secondary</Button>
    <Button variant="tertiary" destructive={true}>Tertiary</Button>
  </Stack>
</Story>

<Story name="Sizes">
  <Stack>
    <Button size="s">Small</Button>
    <Button size="m">Medium</Button>
  </Stack>
</Story>

<Story name="WithIcons">
  <div style="display: flex; gap: 1rem;">
    {#snippet placeholderIcon()}
      <Placeholder />
    {/snippet}
    <Button leading_icon={placeholderIcon}>Add to cart</Button>
    {#snippet arrowSlantedIcon()}
      <ArrowSlanted size="16" />
    {/snippet}
    <Button size="m" trailing_icon={arrowSlantedIcon}>Terms & Conditions</Button>
  </div>
</Story>

<Story name="ButtonGroup">
  <Stack>
    <Button>Go elsewhere</Button>
    <Button variant="primary">Look again</Button>
  </Stack>
</Story>

<Story name="OnlyIcons">
  <Stack>
    {#snippet placeholderIcon16()}
      <Placeholder size="16" />
    {/snippet}
    <Button size="s" hideLabel={true} leading_icon={placeholderIcon16}>
      <Placeholder size="16" />
      Circuit
    </Button>
    {#snippet downloadCloudIcon()}
      <DownloadCloud />
    {/snippet}
    <Button size="m" variant="primary" hideLabel={true} leading_icon={downloadCloudIcon}>
      Download
    </Button>
    {#snippet closeIcon()}
      <Close size="24" />
    {/snippet}
    <Button size="m" variant="secondary" hideLabel={true} leading_icon={closeIcon}>Close</Button>
    {#snippet shopIcon()}
      <Shop size="24" />
    {/snippet}
    <Button size="m" disabled={true} hideLabel={true} leading_icon={shopIcon}>Cart</Button>
    {#snippet placeholderIcon24()}
      <Placeholder size="24" />
    {/snippet}
    <Button
      size="m"
      variant="primary"
      isLoading={true}
      hideLabel={true}
      leading_icon={placeholderIcon24}
    >
      Circuit
    </Button>
  </Stack>
</Story>
