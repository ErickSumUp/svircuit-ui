<script lang="ts" module>
  import Popover from '$lib/components/Popover.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/Popover',
    component: Popover,
    parameters: {
      layout: 'padded'
    }
  });
</script>

<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Body from '$lib/components/Body.svelte';
  import Headline from '$lib/components/Headline.svelte';
  import Stack from '$lib/components/Stack.svelte';
  import Notify from '$lib/icons/Notify.svelte';

  let open = $state(false);
</script>

{#snippet notifications()}
  <Headline as="h3" size="s">Notifications</Headline>
  <Body as="p">Your monthly payment is due in 3 days 💸</Body>
  <Body as="p" size="s" color="subtle">3 hours ago</Body>
  <hr />
  <Body as="p">Review and confirm your contact information.</Body>
  <Body as="p" size="s" color="subtle">16 hours ago</Body>
  <hr />
  <Body as="p">Find out what's new in your app ✨</Body>
  <Body as="p" size="s" color="subtle">21 hours ago</Body>
{/snippet}

<Story name="Base">
  {#snippet template()}
    <Popover>
      {#snippet trigger(attrs)}
        <Button {...attrs} size="s">
          {#snippet leading_icon()}
            <Notify size="16" />
          {/snippet}
          Notifications
        </Button>
      {/snippet}
      {@render notifications()}
    </Popover>
  {/snippet}
</Story>

<Story name="Placements">
  {#snippet template()}
    <Stack>
      <Popover placement="top">
        {#snippet trigger(attrs)}
          <Button {...attrs} size="s">Top</Button>
        {/snippet}
        <Body>Placed above the trigger.</Body>
      </Popover>
      <Popover placement="bottom-start">
        {#snippet trigger(attrs)}
          <Button {...attrs} size="s">Bottom start</Button>
        {/snippet}
        <Body>Aligned with the start edge of the trigger.</Body>
      </Popover>
      <Popover placement="bottom-end">
        {#snippet trigger(attrs)}
          <Button {...attrs} size="s">Bottom end</Button>
        {/snippet}
        <Body>Aligned with the end edge of the trigger.</Body>
      </Popover>
      <Popover placement="right">
        {#snippet trigger(attrs)}
          <Button {...attrs} size="s">Right</Button>
        {/snippet}
        <Body>Placed next to the trigger.</Body>
      </Popover>
      <Popover placement="right-start">
        {#snippet trigger(attrs)}
          <Button {...attrs} size="s">Right start</Button>
        {/snippet}
        <Body>Next to the trigger, aligned with its top edge.</Body>
      </Popover>
    </Stack>
  {/snippet}
</Story>

<Story name="Offset">
  {#snippet template()}
    <Popover offset={20}>
      {#snippet trigger(attrs)}
        <Button {...attrs} size="s">Offset by 20px</Button>
      {/snippet}
      <Body>I sit further away from my trigger.</Body>
    </Popover>
  {/snippet}
</Story>

<Story name="Cross axis offset">
  {#snippet template()}
    <Popover placement="bottom-start" offset={{ mainAxis: 4, crossAxis: 24 }}>
      {#snippet trigger(attrs)}
        <Button {...attrs} size="s">Shifted along the edge</Button>
      {/snippet}
      <Body>I am 4px below my trigger and 24px to the right of its start edge.</Body>
    </Popover>
  {/snippet}
</Story>

<Story name="Fallback placements">
  {#snippet template()}
    <div style="display: flex; justify-content: flex-end">
      <Popover placement="right" fallbackPlacements={['left', 'bottom-end']}>
        {#snippet trigger(attrs)}
          <Button {...attrs} size="s">No room on the right</Button>
        {/snippet}
        <Body>I tried the right side first, then fell back to the left.</Body>
      </Popover>
    </div>
  {/snippet}
</Story>

<Story name="ClosingFromTheContent">
  {#snippet template()}
    <Popover hideCloseButton>
      {#snippet trigger(attrs)}
        <Button {...attrs} size="s">Confirm something</Button>
      {/snippet}
      {#snippet children({ close })}
        <Body as="p">Are you sure you want to continue?</Body>
        <Button size="s" variant="primary" onclick={close}>Yes, I'm sure</Button>
      {/snippet}
    </Popover>
  {/snippet}
</Story>

<Story name="Controlled">
  {#snippet template()}
    <Stack>
      <Popover bind:open>
        {#snippet trigger(attrs)}
          <Button {...attrs} size="s">Toggle me</Button>
        {/snippet}
        <Body>The state is shared with the component below.</Body>
      </Popover>
      <Body>The popover is {open ? 'open' : 'closed'}.</Body>
    </Stack>
  {/snippet}
</Story>
