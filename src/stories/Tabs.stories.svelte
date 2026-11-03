<script lang="ts" module>
  import Tabs, { type TabItem } from '$lib/components/Tabs.svelte';
  import Body from '$lib/components/Body.svelte';
  import Headline from '$lib/components/Headline.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Navigation/Tabs',
    component: Tabs,
    parameters: {
      layout: 'fullscreen'
    }
  });

  const labels = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5', 'Tab 6'];
</script>

<script lang="ts">
  import TierIndicator from '$lib/components/TierIndicator.svelte';

  const panels = [panel1, panel2, panel3, panel4, panel5, panel6];
  const items: TabItem[] = labels.map((tab, index) => ({
    id: `tab-${index + 1}`,
    tab,
    panel: panels[index]
  }));
</script>

{#snippet content(index: number)}
  <div style="padding: var(--cui-spacings-giga);">
    <Headline as="h2">Content of tab {index}</Headline>
    <Body>
      Lorem ipsum dolor amet swag pickled humblebrag retro farm-to-table, shoreditch typewriter deep
      v single-origin coffee green juice coloring book venmo chambray. Marfa authentic blue bottle
      mixtape tofu adaptogen.
    </Body>
  </div>
{/snippet}

{#snippet panel1()}{@render content(1)}{/snippet}
{#snippet panel2()}{@render content(2)}{/snippet}
{#snippet panel3()}{@render content(3)}{/snippet}
{#snippet panel4()}{@render content(4)}{/snippet}
{#snippet panel5()}{@render content(5)}{/snippet}
{#snippet panel6()}{@render content(6)}{/snippet}

{#snippet plusTier()}<TierIndicator variant="plus" size="s" />{/snippet}

<Story name="Base" args={{ items }} />

<Story name="Stretched" args={{ items: items.slice(0, 3), stretched: true }} />

<Story
  name="With TierIndicator"
  args={{
    items: [
      { id: 'services', tab: 'Services', panel: panel1, trailingComponent: plusTier },
      { id: 'items', tab: 'Items', panel: panel2 },
      { id: 'discounts', tab: 'Discounts', panel: panel3 }
    ]
  }}
/>

<Story name="Scrollable">
  {#snippet template(args)}
    <div style="max-width: 320px;">
      <Tabs {...args} {items} selectedId="tab-5" />
    </div>
  {/snippet}
</Story>

<Story
  name="Navigation"
  args={{
    as: 'navigation',
    'aria-label': 'Profile',
    selectedId: 'overview',
    items: [
      { id: 'overview', tab: 'Overview', href: '#overview' },
      { id: 'posts', tab: 'Posts', href: '#posts' },
      { id: 'comments', tab: 'Comments', href: '#comments' },
      { id: 'settings', tab: 'Settings', href: '#settings' }
    ]
  }}
/>
