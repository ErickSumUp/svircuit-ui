<script lang="ts" module>
  import SidePanel from '$lib/components/SidePanel.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Navigation/SidePanel',
    component: SidePanel,
    parameters: { layout: 'fullscreen' },
    args: {
      headline: 'Item details',
      closeButtonLabel: 'Close'
    }
  });
</script>

<script lang="ts">
  import { createRawSnippet } from 'svelte';
  import SidePanelProvider from '$lib/components/SidePanelProvider.svelte';
  import ListItemGroup from '$lib/stories/ListItemGroup.svelte';
  import Body from '$lib/components/Body.svelte';
  import Button from '$lib/components/Button.svelte';

  const items = Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`);
  const loremIpsum =
    'Lorem ipsum dolor amet swag pickled humblebrag retro farm-to-table, shoreditch typewriter deep v single-origin coffee green juice coloring book venmo chambray. Marfa authentic blue bottle mixtape tofu adaptogen. IPhone chia blog palo santo mlkshk tattooed jean shorts yr locavore ennui scenester. Wolf tousled pok pok sartorial scenester man bun salvia quinoa raclette sriracha roof party pour-over venmo hammock. Four dollar toast typewriter 3 wolf moon letterpress disrupt pabst. Neutra irony tousled iPhone banh mi wayfarers hoodie waistcoat.';

  let selectedItem: string | null = $state(null);
  let panelOpen = $state(false);
  let moreOpen = $state(false);
  let isLoading = $state(false);
  let loadingTimeout: ReturnType<typeof setTimeout> | undefined;

  function select(item: string) {
    selectedItem = item;
    moreOpen = false;
    panelOpen = true;
  }

  function closeAll() {
    selectedItem = null;
    panelOpen = false;
    moreOpen = false;
  }

  function toggleWithLoading(item: string) {
    clearTimeout(loadingTimeout);
    if (selectedItem === item) {
      closeAll();
      return;
    }
    select(item);
    isLoading = true;
    loadingTimeout = setTimeout(() => (isLoading = false), 1000);
  }
</script>

{#snippet instructions()}
  <div class="instructions">
    <Body>Select an item to open its details in a side panel.</Body>
  </div>
{/snippet}

{#snippet list(onselect: (item: string) => void)}
  <div class="list">
    <ListItemGroup
      label="List of items with details in a side panel"
      hideLabel
      items={items.map((item) => ({
        key: item,
        variant: 'navigation',
        selected: item === selectedItem,
        onclick: () => onselect(item),
        children: createRawSnippet(() => ({ render: () => `<span>${item}</span>` }))
      }))}
    />
  </div>
{/snippet}

<Story name="Base">
  {#snippet template(args)}
    <SidePanelProvider>
      {@render instructions()}
      {@render list(select)}
      <SidePanel
        headline={args.headline}
        closeButtonLabel={args.closeButtonLabel}
        bind:open={panelOpen}
        onclose={closeAll}
      >
        <div class="paragraph"><Body>These are the details of {selectedItem}.</Body></div>
        <div class="paragraph"><Body>{loremIpsum}</Body></div>
        <Button variant="primary" size="s" onclick={() => (moreOpen = true)}>Show more</Button>

        <SidePanel
          headline="More information"
          closeButtonLabel={args.closeButtonLabel}
          backButtonLabel="Back"
          bind:open={moreOpen}
          onback={() => (moreOpen = false)}
          onclose={closeAll}
        >
          <div class="paragraph">
            <Body>This is more information about {selectedItem}.</Body>
          </div>
          <div class="paragraph"><Body>{loremIpsum}</Body></div>
        </SidePanel>
      </SidePanel>
    </SidePanelProvider>
  {/snippet}
</Story>

<Story name="Update and remove">
  {#snippet template(args)}
    <SidePanelProvider>
      {@render instructions()}
      {@render list(toggleWithLoading)}
      <SidePanel
        headline={args.headline}
        closeButtonLabel={args.closeButtonLabel}
        bind:open={panelOpen}
        onclose={closeAll}
      >
        {#if isLoading}
          <Body>Loading the details of {selectedItem}...</Body>
        {:else}
          <div class="paragraph"><Body>These are the details of {selectedItem}.</Body></div>
          <div class="paragraph"><Body>{loremIpsum}</Body></div>
          <Button variant="tertiary" size="s" onclick={closeAll}>Close</Button>
        {/if}
      </SidePanel>
    </SidePanelProvider>
  {/snippet}
</Story>

<style>
  .instructions {
    margin: 1rem;
  }

  .list {
    margin: 1rem;
  }

  .paragraph {
    margin-bottom: 1rem;
  }
</style>
