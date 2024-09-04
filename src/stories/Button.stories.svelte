<script context="module" lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { defineMeta, setTemplate, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/Button',
    component: Button,
    argTypes: {
      variant: {
        options: ['primary', 'secondary', 'tertiary']
      },
      size: {
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
    <Button>
      <Placeholder slot="leading-icon" />
      Add to cart
    </Button>
    <Button size="m">
      <ArrowSlanted size="16" slot="trailing-icon" />
      Terms & Conditions
    </Button>
  </div>
</Story>

<Story name="ButtonGroup">
  <Button>Go elsewhere</Button>
  <Button variant="primary">Look again</Button>
</Story>

<Story name="OnlyIcons">
  <div style="display: flex; gap: 1rem; align-items: center">
    <Button size="s" hideLabel={true}>
      <Placeholder size="16" slot="leading-icon" />
      Circuit
    </Button>
    <Button size="m" variant="primary" hideLabel={true}>
      <DownloadCloud slot="leading-icon" />
      Download
    </Button>
    <Button size="m" variant="secondary" hideLabel={true}>
      <Close size="24" slot="leading-icon" />
      Close
    </Button>
    <Button size="m" on:click disabled={true} hideLabel={true}>
      <Shop size="24" slot="leading-icon" />
      Cart
    </Button>
    <Button size="m" variant="primary" isLoading={true} hideLabel={true}>
      <Placeholder size="24" slot="leading-icon" />
      Circuit
    </Button>
  </div>
</Story>
