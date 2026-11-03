<script lang="ts" module>
  import type { Snippet } from 'svelte';

  export type TabItem = {
    /**
     * A unique identifier for the tab.
     */
    id: string;
    /**
     * The tab's label.
     */
    tab: string;
    /**
     * The content shown while the tab is selected. Not rendered with
     * `as="navigation"`.
     */
    panel?: Snippet;
    /**
     * Renders the tab as a link.
     */
    href?: string;
    /**
     * Content after the label, such as a `TierIndicator` (`variant="plus"`,
     * `size="s"`) for features that are part of the plus plan.
     */
    trailingComponent?: Snippet;
  };

  /** Below 480px, lists with this many tabs or fewer always stretch. */
  const MOBILE_AUTOSTRETCH_ITEMS_MAX = 3;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The tabs, each with an id, a label and the panel content.
     */
    items: TabItem[];
    /**
     * The id of the selected tab. Bindable. Default: the first tab.
     */
    selectedId?: string;
    /**
     * Called with the id of the newly selected tab.
     */
    onTabChange?: (id: string) => void;
    /**
     * Whether the tabs share the full width of their container. Default: `false`.
     */
    stretched?: boolean;
    /**
     * `tablist` renders tabs with panels. `navigation` renders a `nav` with a
     * list of links that look like tabs, and no panels. Default: `tablist`.
     */
    as?: 'tablist' | 'navigation';
  }

  let {
    items,
    selectedId = $bindable(items[0]?.id),
    onTabChange,
    stretched = false,
    as = 'tablist',
    class: className,
    onkeydown,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const anchorName = `--tabs-selected-${uid}`;
  const tabId = (id: string) => `tabs-${uid}-tab-${id}`;
  const panelId = (id: string) => `tabs-${uid}-panel-${id}`;

  const isNavigation = $derived(as === 'navigation');
  const hasSelection = $derived(items.some((item) => item.id === selectedId));

  let list: HTMLDivElement;
  let canScrollLeft = $state(false);
  let canScrollRight = $state(false);

  function updateScrollIndicators() {
    const { scrollLeft, scrollWidth, clientWidth } = list;
    canScrollLeft = scrollLeft > 0;
    canScrollRight = scrollLeft + clientWidth < scrollWidth;
  }

  function select(id: string) {
    if (id === selectedId) return;
    selectedId = id;
    onTabChange?.(id);
  }

  function handleKeydown(event: KeyboardEvent & { currentTarget: HTMLDivElement }) {
    onkeydown?.(event);
    if (isNavigation || !selectedId) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      document.getElementById(panelId(selectedId))?.focus();
      return;
    }

    const index = items.findIndex((item) => item.id === selectedId);
    const targetIndex = {
      ArrowLeft: index - 1,
      ArrowRight: index + 1,
      Home: 0,
      End: items.length - 1
    }[event.key];
    const target = targetIndex === undefined ? undefined : items[targetIndex];
    if (!target) return;

    event.preventDefault();
    select(target.id);
    document.getElementById(tabId(target.id))?.focus();
  }

  onMount(() => {
    const selected = list.querySelector<HTMLElement>(
      '[aria-selected="true"], [aria-current="page"]'
    );
    if (selected) list.scrollLeft += selected.offsetLeft;
    updateScrollIndicators();
  });
</script>

<svelte:window onresize={updateScrollIndicators} />

<!--
  @component
  Organizes related content into sections, one visible at a time. With
  `as="navigation"`, a set of related pages that look like tabs.
-->
<svelte:element this={isNavigation ? 'nav' : 'div'} class={['wrapper', className]}>
  <div
    bind:this={list}
    {...rest}
    class={[
      'list',
      stretched && 'stretched',
      items.length <= MOBILE_AUTOSTRETCH_ITEMS_MAX && 'stretched-mobile'
    ]}
    role={isNavigation ? 'list' : 'tablist'}
    onkeydown={handleKeydown}
    onscroll={updateScrollIndicators}
  >
    {#each items as item (item.id)}
      {@const selected = item.id === selectedId}
      {#snippet tab()}
        <svelte:element
          this={item.href ? 'a' : 'button'}
          class="tab"
          href={item.href}
          type={item.href ? undefined : 'button'}
          id={isNavigation ? undefined : tabId(item.id)}
          role={isNavigation ? undefined : 'tab'}
          aria-selected={isNavigation ? undefined : selected}
          aria-controls={isNavigation ? undefined : panelId(item.id)}
          aria-current={isNavigation && selected ? 'page' : undefined}
          tabindex={!isNavigation && !selected ? -1 : undefined}
          style:anchor-name={selected ? anchorName : undefined}
          onclick={() => select(item.id)}
        >
          {#if item.trailingComponent}
            <span class="content">{item.tab}{@render item.trailingComponent()}</span>
          {:else}
            {item.tab}
          {/if}
        </svelte:element>
      {/snippet}

      {#if isNavigation}
        <div class="listitem" role="listitem">{@render tab()}</div>
      {:else}
        {@render tab()}
      {/if}
    {/each}
    {#if hasSelection}
      <span class="glider" style:position-anchor={anchorName} aria-hidden="true"></span>
    {/if}
  </div>
  <span class="scroll-indicator left" class:visible={canScrollLeft}></span>
  <span class="scroll-indicator right" class:visible={canScrollRight}></span>
</svelte:element>

{#if !isNavigation}
  {#each items as item (item.id)}
    <div
      role="tabpanel"
      id={panelId(item.id)}
      aria-labelledby={tabId(item.id)}
      tabindex="-1"
      hidden={item.id !== selectedId}
    >
      {@render item.panel?.()}
    </div>
  {/each}
{/if}

<style>
  .wrapper {
    position: relative;
    display: flex;
    width: 100%;
    background: var(--cui-bg-normal);
  }

  .wrapper::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: var(--cui-border-width-kilo);
    content: '';
    background-color: var(--cui-border-subtle);
  }

  .list {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    gap: var(--cui-spacings-giga);
    overflow-x: auto;
    scrollbar-width: none;
  }

  .list::-webkit-scrollbar {
    display: none;
  }

  /* Tab */

  .tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 var(--cui-spacings-bit);
    margin: var(--cui-spacings-kilo) 0;
    font-size: var(--cui-body-s-font-size);
    font-weight: var(--cui-font-weight-semibold);
    line-height: var(--cui-body-s-line-height);
    color: var(--cui-fg-subtle);
    white-space: nowrap;
    text-decoration-color: transparent;
    cursor: pointer;
    background-color: var(--cui-bg-normal);
    border: none;
    border-radius: var(--cui-border-radius-bit);
    transition: color var(--cui-transitions-default);
  }

  .content {
    display: flex;
    gap: var(--cui-spacings-bit);
    align-items: center;
  }

  .tab:hover {
    color: var(--cui-fg-normal-hovered);
  }

  .tab:active {
    color: var(--cui-fg-normal);
  }

  .tab:focus-visible {
    outline: var(--cui-border-width-mega) solid var(--cui-border-focus);
    outline-offset: calc(-1 * var(--cui-border-width-mega));
  }

  .tab[aria-selected='true'],
  .tab[aria-current='page'] {
    position: relative;
    color: var(--cui-fg-normal);
  }

  /* The selected tab's underline, for browsers without anchor positioning. */
  .tab[aria-selected='true']::after,
  .tab[aria-current='page']::after {
    position: absolute;
    right: 0;
    bottom: calc(-1 * (var(--cui-spacings-kilo) - var(--cui-border-width-kilo)));
    left: 0;
    z-index: var(--cui-z-index-absolute);
    height: 3px;
    content: '';
    background-color: var(--cui-border-accent);
    border-top-left-radius: var(--cui-border-radius-byte);
    border-top-right-radius: var(--cui-border-radius-byte);
  }

  /* An underline that slides to the selected tab. */
  .glider {
    display: none;
  }

  @supports (anchor-name: --tab) {
    .tab[aria-selected='true']::after,
    .tab[aria-current='page']::after {
      content: none;
    }

    .glider {
      position: absolute;
      right: anchor(right);
      bottom: var(--cui-border-width-kilo);
      left: anchor(left);
      z-index: var(--cui-z-index-absolute);
      display: block;
      height: 3px;
      background-color: var(--cui-border-accent);
      border-top-left-radius: var(--cui-border-radius-byte);
      border-top-right-radius: var(--cui-border-radius-byte);
      transition:
        left var(--cui-transitions-default),
        right var(--cui-transitions-default);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .glider {
      transition: none;
    }
  }

  /* Stretched */

  .stretched {
    width: 100%;
  }

  @media (max-width: 479px) {
    .stretched-mobile {
      width: 100%;
    }

    .stretched-mobile > .tab,
    .stretched-mobile > .listitem {
      flex: 1 1 0;
      min-width: 0;
    }

    .stretched-mobile .tab {
      display: block;
      padding-right: var(--cui-spacings-kilo);
      padding-left: var(--cui-spacings-kilo);
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
  }

  @media (min-width: 480px) {
    .stretched > .tab,
    .stretched > .listitem {
      flex: 1 1 0;
      min-width: 0;
    }

    .stretched .tab {
      display: block;
      padding-right: var(--cui-spacings-kilo);
      padding-left: var(--cui-spacings-kilo);
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
  }

  /* Scroll indicators */

  .scroll-indicator {
    position: absolute;
    top: 0;
    z-index: 1;
    display: none;
    width: 24px;
    height: var(--cui-spacings-tera);
    pointer-events: none;
    background: linear-gradient(
      90deg,
      color-mix(in sRGB, var(--cui-bg-normal) 100%, transparent),
      color-mix(in sRGB, var(--cui-bg-normal) 66%, transparent),
      color-mix(in sRGB, var(--cui-bg-normal) 1%, transparent)
    );
  }

  .scroll-indicator.left {
    left: 0;
  }

  .scroll-indicator.right {
    right: 0;
    transform: rotate(180deg);
  }

  .scroll-indicator.visible {
    display: block;
  }
</style>
