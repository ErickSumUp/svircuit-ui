<script context="module" lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { defineMeta, setTemplate, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/Button',
    component: Button,
    argTypes: {
      variant: {
        control: 'radio',
        options: ['primary', 'secondary', 'tertiary']
      },
      size: {
        control: 'radio',
        options: ['s', 'm']
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

  setTemplate(template);

  function handleClick() {
    alert('Hello!');
  }
</script>

{#snippet template({ children, ...args }: Args<typeof Story>)}
  <Button onclick={handleClick} {...args}>{children}</Button>
{/snippet}

<Story name="Base" args={{ children: 'Say Hello', variant: 'secondary', size: 'm' }} />

<Story name="Variants">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="tertiary">Tertiary</Button>
</Story>

<Story name="Destructive">
  <Button variant="primary" destructive={true}>Primary</Button>
  <Button variant="secondary" destructive={true}>Secondary</Button>
  <Button variant="tertiary" destructive={true}>Tertiary</Button>
</Story>

<Story name="Sizes">
  <Button size="s">Small</Button>
  <Button size="m">Medium</Button>
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
  <Button>Go elsewhere</Button>
  <Button variant="primary">Look again</Button>
</Story>

<Story name="OnlyIcons">
  <div style="display: flex; gap: 1rem; align-items: center">
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
  </div>
</Story>
