<script lang="ts" module>
  import Status from '$lib/components/Status.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Components/Status',
    component: Status,
    parameters: {
      layout: 'centered'
    },
    argTypes: {
      children: {
        control: { type: 'text', defaultValue: 'Status' }
      }
    }
  });

  type Args = ComponentProps<typeof Status>;
</script>

<script>
  import Stack from '$lib/components/Stack.svelte';
</script>

{#snippet checkIcon()}
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.7 3.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4L6 9.6l6.3-6.3a1 1 0 0 1 1.4 0z"
      fill="currentColor"
    />
  </svg>
{/snippet}

<Story name="Base" args={{ variant: 'pill', color: 'neutral' }}>
  {#snippet template({ children, ...args }: Args)}
    <Status {...args}>{children || 'Status'}</Status>
  {/snippet}
</Story>

<Story name="Pill">
  {#snippet template()}
    <Stack>
      <Status variant="pill" color="neutral">Neutral</Status>
      <Status variant="pill" color="confirm">Confirm</Status>
      <Status variant="pill" color="notify">Notify</Status>
      <Status variant="pill" color="alert">Alert</Status>
      <Status variant="pill" color="promo">Promo</Status>
      <Status variant="pill" color="special">Special</Status>
    </Stack>
  {/snippet}
</Story>

<Story name="Badge">
  {#snippet template()}
    <Stack>
      <Status variant="badge" color="neutral">1</Status>
      <Status variant="badge" color="confirm">2</Status>
      <Status variant="badge" color="notify">3</Status>
      <Status variant="badge" color="alert">42</Status>
      <Status variant="badge" color="promo">999</Status>
    </Stack>
  {/snippet}
</Story>

<Story name="Dot">
  {#snippet template()}
    <Stack>
      <Status variant="dot" color="neutral">Neutral</Status>
      <Status variant="dot" color="confirm">Confirm</Status>
      <Status variant="dot" color="notify">Notify</Status>
      <Status variant="dot" color="alert">Alert</Status>
      <Status variant="dot" color="promo">Promo</Status>
    </Stack>
  {/snippet}
</Story>

<Story name="Line">
  {#snippet template()}
    <Stack>
      <Status variant="line" color="confirm" icon={checkIcon}>Verified</Status>
      <Status variant="line" color="neutral">No icon</Status>
    </Stack>
  {/snippet}
</Story>
