<script lang="ts">
  import SidePanel from './SidePanel.svelte';
  import SidePanelProvider from './SidePanelProvider.svelte';

  interface Props {
    open?: boolean;
    onclose?: () => void | Promise<void>;
    preventEscapeKeyClose?: boolean;
  }

  let { open = $bindable(false), onclose, preventEscapeKeyClose }: Props = $props();
  let moreOpen = $state(false);
</script>

<SidePanelProvider data-testid="provider">
  <button type="button" onclick={() => (open = true)}>Open</button>
  <span data-testid="state">{open ? 'open' : 'closed'}</span>
  <SidePanel
    bind:open
    headline="Item details"
    closeButtonLabel="Close"
    {onclose}
    {preventEscapeKeyClose}
  >
    <p>Details</p>
    <button type="button" onclick={() => (moreOpen = true)}>Show more</button>
    <SidePanel
      bind:open={moreOpen}
      headline="More information"
      backButtonLabel="Back"
      onback={() => (moreOpen = false)}
    >
      <p>More</p>
    </SidePanel>
  </SidePanel>
</SidePanelProvider>
