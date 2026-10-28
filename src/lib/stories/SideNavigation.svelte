<script lang="ts" module>
  import type { Component } from 'svelte';

  type Icon = Component<{ size?: '24'; 'aria-hidden'?: 'true' }>;

  export interface NavigationItem {
    /**
     * Short label to describe the target of the link.
     */
    label: string;
    /**
     * Renders an anchor. Without it, the item renders as a button.
     */
    href?: string;
    target?: string;
    rel?: string;
    onclick?: (event: MouseEvent) => void;
    /**
     * Whether the link is the currently active page.
     */
    isActive?: boolean;
    /**
     * Describes that the link leads to an external page or opens in a new tab.
     * Used when `target="_blank"` or `rel="external"`.
     */
    externalLabel?: string;
  }

  export type PrimaryNavigationItem = Omit<NavigationItem, 'href'> & {
    /**
     * An icon component, rendered at 20px next to the label.
     */
    icon: Icon;
    /**
     * Shown instead of `icon` while the item is active.
     */
    activeIcon: Icon;
  } & (
      | { href: string; secondaryItems?: never }
      | {
          href?: never;
          /**
           * Nested links, shown in a collapsible list. Expanded initially when
           * the item is active.
           */
          secondaryItems: NavigationItem[];
        }
    );

  export interface NavigationGroup {
    /**
     * Unique identifier for the group of links.
     */
    id: string;
    /**
     * Label for the group of links. Important for accessibility.
     */
    label: string;
    /**
     * Hides the label visually but keeps it accessible to screen readers.
     */
    hideLabel?: boolean;
    items: PrimaryNavigationItem[];
  }
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { MediaQuery } from 'svelte/reactivity';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Groups of links. If you only have one and wish to omit its label, use
     * `hideLabel`.
     */
    groups: NavigationGroup[];
    /**
     * Accessible name of the navigation modal on small viewports.
     */
    label: string;
    /**
     * Whether the navigation modal (below 1024px) is open. Default: false.
     */
    open?: boolean;
    /**
     * Called when the navigation modal closes: via the close button, the
     * Escape key, a click outside, or a link.
     */
    onclose?: () => void;
    /**
     * Accessible label of the modal's close button. Default: 'Close'.
     */
    closeButtonLabel?: string;
    /**
     * Render placeholders while the navigation data loads. Default: false.
     */
    isLoading?: boolean;
    /**
     * Hash link to the page's main content, so keyboard and screen reader
     * users can skip the navigation (WCAG 2.1 SC 2.4.1).
     */
    skipNavigationHref?: string;
    skipNavigationLabel?: string;
    /**
     * Rendered above the groups, e.g. a logo linking to the home page.
     */
    logo?: Snippet;
  }

  let {
    groups,
    label,
    open = $bindable(false),
    onclose,
    closeButtonLabel = 'Close',
    isLoading = false,
    skipNavigationHref,
    skipNavigationLabel,
    logo,
    class: className,
    ...rest
  }: Props = $props();

  const SIDE_NAVIGATION_WIDTH = '240px';

  const uid = $props.id();
  const isMobile = new MediaQuery('max-width: 1023px', false);

  let dialog: HTMLDialogElement | undefined = $state();
  let expandedItems: Record<string, boolean> = $state({});

  $effect(() => {
    document.documentElement.style.setProperty('--side-navigation-width', SIDE_NAVIGATION_WIDTH);
    return () => document.documentElement.style.removeProperty('--side-navigation-width');
  });

  // The modal only opens on small viewports; on larger ones the navigation is always visible.
  $effect(() => {
    if (!dialog) return;
    const isShown = open && isMobile.current;
    if (isShown && !dialog.open) dialog.showModal();
    if (!isShown && dialog.open) dialog.close();
  });

  function closeNavigation() {
    dialog?.close();
  }

  function handleDialogClose() {
    open = false;
    onclose?.();
  }

  function handleDialogClick(event: MouseEvent) {
    if (event.target === dialog) closeNavigation();
  }

  function isExternal(item: NavigationItem | PrimaryNavigationItem) {
    return item.target === '_blank' || item.rel === 'external';
  }

  // Arrow keys move focus within a list and wrap around at the ends.
  function handleArrowKeys(event: KeyboardEvent) {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    const current = event.currentTarget as HTMLElement;
    const items = [
      ...document.querySelectorAll<HTMLElement>(`[data-focus-list="${current.dataset.focusList}"]`)
    ];
    const offset = event.key === 'ArrowUp' ? -1 : 1;
    const index = (items.indexOf(current) + offset + items.length) % items.length;
    items[index].focus();
  }
</script>

{#snippet externalIcon()}
  <svg class="external" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path
      fill="currentColor"
      d="M1.25 12.667V3.333A2.083 2.083 0 0 1 3.333 1.25h4a.75.75 0 0 1 0 1.5h-4a.583.583 0 0 0-.583.583v9.334a.583.583 0 0 0 .583.583h9.334a.583.583 0 0 0 .583-.583v-4a.75.75 0 0 1 1.5 0v4a2.083 2.083 0 0 1-2.083 2.083H3.333a2.083 2.083 0 0 1-2.083-2.083M14.75 6a.75.75 0 0 1-1.5 0V3.81L8.53 8.53a.75.75 0 1 1-1.06-1.06l4.72-4.72H10a.75.75 0 0 1 0-1.5h4a.75.75 0 0 1 .75.75z"
    />
  </svg>
{/snippet}

{#snippet externalDescription(item: NavigationItem | PrimaryNavigationItem, id: string)}
  {#if !isLoading && isExternal(item) && item.externalLabel}
    <span id="{id}-external" class="visually-hidden">{item.externalLabel}</span>
  {/if}
{/snippet}

{#snippet secondaryItem(item: NavigationItem, id: string, focusList: string, suffix: string)}
  {@const describedBy =
    !isLoading && isExternal(item) && item.externalLabel ? `${id}-external` : undefined}
  {@const onclick = (event: MouseEvent) => {
    item.onclick?.(event);
    if (suffix === 'mobile') closeNavigation();
  }}
  <li>
    {#if item.href}
      <a
        class="item"
        href={item.href}
        target={item.target}
        rel={item.rel}
        aria-current={item.isActive ? 'page' : undefined}
        aria-describedby={describedBy}
        data-focus-list={focusList}
        onkeydown={handleArrowKeys}
        {onclick}
      >
        <span class="label secondary-label skeleton" class:active={item.isActive}>{item.label}</span
        >
        {#if !isLoading && isExternal(item)}{@render externalIcon()}{/if}
      </a>
    {:else}
      <button
        type="button"
        class="item"
        aria-current={item.isActive ? 'page' : undefined}
        data-focus-list={focusList}
        onkeydown={handleArrowKeys}
        {onclick}
      >
        <span class="label secondary-label skeleton" class:active={item.isActive}>{item.label}</span
        >
      </button>
    {/if}
    {@render externalDescription(item, id)}
  </li>
{/snippet}

{#snippet primaryItem(item: PrimaryNavigationItem, key: string, suffix: string)}
  {@const id = `${uid}-${key}-${suffix}`}
  {@const Icon = (item.isActive && item.activeIcon) || item.icon}
  {@const secondaryItems = item.secondaryItems ?? []}
  {@const hasAccordion = secondaryItems.length > 0}
  {@const expanded = expandedItems[key] ?? item.isActive ?? false}
  {@const describedBy =
    !isLoading && isExternal(item) && item.externalLabel ? `${id}-external` : undefined}
  {@const onclick = (event: MouseEvent) => {
    item.onclick?.(event);
    if (hasAccordion) expandedItems[key] = !expanded;
    else if (suffix === 'mobile') closeNavigation();
  }}
  <li class="primary-item">
    {#snippet content()}
      <span class="label-container skeleton">
        <Icon size="24" aria-hidden="true" />
        <span class="label" class:active={item.isActive}>{item.label}</span>
      </span>
      {#if !isLoading && isExternal(item)}{@render externalIcon()}{/if}
      {#if !isLoading && hasAccordion}
        <svg
          class="chevron"
          class:chevron-up={expanded}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M11.528 6.528a.667.667 0 0 1 .944.944l-4 4a.667.667 0 0 1-.944 0l-4-4a.667.667 0 0 1 .944-.944L8 10.057z"
          />
        </svg>
      {/if}
    {/snippet}
    {#if item.href}
      <a
        class="item"
        href={item.href}
        target={item.target}
        rel={item.rel}
        aria-current={item.isActive ? 'page' : undefined}
        aria-describedby={describedBy}
        data-focus-list="{uid}-{suffix}"
        onkeydown={handleArrowKeys}
        {onclick}
      >
        {@render content()}
      </a>
    {:else}
      <button
        type="button"
        class="item"
        aria-current={item.isActive ? 'page' : undefined}
        aria-expanded={hasAccordion ? expanded : undefined}
        aria-controls={hasAccordion ? `${id}-items` : undefined}
        data-focus-list="{uid}-{suffix}"
        onkeydown={handleArrowKeys}
        {onclick}
      >
        {@render content()}
      </button>
    {/if}
    {@render externalDescription(item, id)}
    {#if hasAccordion}
      <div id="{id}-items" class="collapsible" class:expanded>
        <ul class="secondary-list">
          {#each secondaryItems as secondary, index (secondary.label)}
            {@render secondaryItem(secondary, `${id}-${index}`, `${id}-items`, suffix)}
          {/each}
        </ul>
      </div>
    {/if}
  </li>
{/snippet}

{#snippet navigationContent(suffix: 'desktop' | 'mobile')}
  <div
    class="content hide-scrollbar"
    class:loading={isLoading}
    aria-busy={isLoading ? 'true' : undefined}
    {...rest}
  >
    {#if suffix === 'desktop' && skipNavigationHref && skipNavigationLabel}
      <a class="skip-link" href={skipNavigationHref}>{skipNavigationLabel}</a>
    {/if}
    {#if logo}
      <div class="logo">{@render logo()}</div>
    {/if}
    <div class="sections">
      {#each groups as group (group.id)}
        {@const labelId = `${uid}-${group.id}-${suffix}`}
        <nav aria-labelledby={labelId}>
          <h2
            id={labelId}
            class={['group-label', 'skeleton', group.hideLabel && 'visually-hidden']}
          >
            {group.label}
          </h2>
          <ul class="list">
            {#each group.items as item, index (item.label)}
              {@render primaryItem(item, `${group.id}-${index}`, suffix)}
            {/each}
          </ul>
        </nav>
      {/each}
    </div>
  </div>
{/snippet}

<div class={['desktop', className]}>
  {@render navigationContent('desktop')}
</div>

<dialog
  bind:this={dialog}
  class={['mobile', className]}
  aria-label={label}
  onclose={handleDialogClose}
  onclick={handleDialogClick}
>
  <div class="mobile-content">
    {@render navigationContent('mobile')}
  </div>
  <button
    type="button"
    class="close-button"
    aria-label={closeButtonLabel}
    title={closeButtonLabel}
    onclick={closeNavigation}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.293 5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 1 1 1.414-1.414L12 10.586z"
      />
    </svg>
  </button>
</dialog>

<style>
  .hide-scrollbar {
    scrollbar-width: none;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    white-space: nowrap;
    border: 0;
    clip-path: inset(50%);
  }

  /* Desktop */

  .desktop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--cui-z-index-navigation);
    display: none;
    width: var(--side-navigation-width, 240px);
    min-width: var(--side-navigation-width, 240px);
    height: 100dvh;
    overflow-y: auto;
    background-color: var(--cui-bg-normal);
    border-right: var(--cui-border-width-kilo) solid var(--cui-border-subtle);
  }

  @media (min-width: 1024px) {
    .desktop {
      display: block;
    }
  }

  .skip-link {
    position: absolute;
    top: var(--cui-spacings-byte);
    left: var(--cui-spacings-byte);
    z-index: calc(var(--cui-z-index-navigation) + 1);
    width: 1px;
    height: 1px;
    padding: var(--cui-spacings-bit);
    margin: -1px;
    overflow: hidden;
    color: var(--cui-fg-normal);
    white-space: nowrap;
    background-color: var(--cui-bg-accent);
    clip-path: rect(0 0 0 0);
    transform: translateX(-100vw);
    transition: transform var(--cui-transitions-default);
  }

  .skip-link:focus,
  .skip-link:hover {
    width: auto;
    height: auto;
    clip-path: unset;
    transform: translateX(0);
  }

  /* Content */

  .content {
    display: flex;
    flex-direction: column;
    gap: var(--cui-spacings-giga);
    width: 100%;
    padding: var(--cui-spacings-mega) 0 0;
  }

  .sections {
    height: 100%;
  }

  .group-label {
    height: var(--cui-compact-s-line-height);
    padding: 0 var(--cui-spacings-kilo);
    margin: 0 0 var(--cui-spacings-kilo);
    font-size: var(--cui-compact-s-font-size);
    font-weight: var(--cui-font-weight-regular);
    line-height: var(--cui-compact-s-line-height);
    color: var(--cui-fg-subtle);
    text-transform: uppercase;
  }

  .list {
    padding: 0 var(--cui-spacings-byte) var(--cui-spacings-byte) var(--cui-spacings-byte);
    margin: 0 0 var(--cui-spacings-giga);
    list-style: none;
  }

  .primary-item {
    margin-bottom: var(--cui-spacings-bit);
  }

  .logo :global(svg) {
    color: var(--cui-fg-normal);
  }

  .logo :global(a:focus-visible),
  .logo :global(button:focus-visible) {
    outline: var(--cui-border-width-mega) solid var(--cui-border-focus);
    outline-offset: var(--cui-border-width-mega);
  }

  @media (min-width: 1024px) {
    .content {
      padding: var(--cui-spacings-byte) 0;
    }

    .list {
      padding: 0 var(--cui-spacings-byte);
    }

    .logo {
      position: sticky;
      top: 0;
      z-index: 1;
      padding: 0 var(--cui-spacings-byte);
      background-color: var(--cui-bg-normal);
    }

    .logo::after {
      position: absolute;
      right: 0;
      bottom: calc(-1 * var(--cui-spacings-mega));
      left: 0;
      display: block;
      height: var(--cui-spacings-mega);
      pointer-events: none;
      content: '';
      background: linear-gradient(
        color-mix(in srgb, var(--cui-bg-normal) 100%, transparent),
        color-mix(in srgb, var(--cui-bg-normal) 66%, transparent),
        color-mix(in srgb, var(--cui-bg-normal) 1%, transparent)
      );
    }

    .desktop .content::after {
      position: fixed;
      bottom: env(safe-area-inset-bottom);
      left: 0;
      display: block;
      width: calc(var(--side-navigation-width, 240px) - 1px);
      height: var(--cui-spacings-tera);
      pointer-events: none;
      content: '';
      background: linear-gradient(
        color-mix(in srgb, var(--cui-bg-normal) 0%, transparent),
        color-mix(in srgb, var(--cui-bg-normal) 66%, transparent),
        color-mix(in srgb, var(--cui-bg-normal) 100%, transparent)
      );
    }
  }

  /* Items */

  .item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--cui-spacings-byte);
    font-family: inherit;
    color: var(--cui-fg-normal);
    text-align: left;
    text-decoration-color: transparent;
    cursor: pointer;
    background: none;
    border: none;
    border-radius: var(--cui-border-radius-byte);
    transition:
      color var(--cui-transitions-default),
      background-color var(--cui-transitions-default);
  }

  .item:hover {
    background-color: var(--cui-bg-normal-hovered);
  }

  .item:active {
    background-color: var(--cui-bg-normal-pressed);
  }

  .item:focus-visible {
    outline: var(--cui-border-width-mega) solid var(--cui-border-focus);
    outline-offset: calc(-1 * var(--cui-border-width-mega));
  }

  .label-container {
    display: flex;
    gap: var(--cui-spacings-byte);
    min-width: 0;
  }

  /* Icons are proportional to the adjacent text's line height. */
  .label-container > :global(svg) {
    width: var(--cui-body-s-line-height);
    min-width: var(--cui-body-s-line-height);
    height: var(--cui-body-s-line-height);
    color: var(--cui-fg-normal);
  }

  .label {
    overflow: hidden;
    font-size: var(--cui-body-s-font-size);
    font-weight: var(--cui-font-weight-regular);
    line-height: var(--cui-body-s-line-height);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .label.active {
    font-weight: var(--cui-font-weight-bold);
  }

  .external,
  .chevron {
    flex-shrink: 0;
    color: var(--cui-fg-subtle);
  }

  .chevron {
    transition: transform var(--cui-transitions-default);
  }

  .chevron-up {
    transform: rotate(180deg);
  }

  .collapsible {
    display: grid;
    grid-template-rows: 0fr;
    visibility: hidden;
    opacity: 0;
    transition: all 300ms ease-in-out;
  }

  .collapsible.expanded {
    grid-template-rows: 1fr;
    margin-bottom: var(--cui-spacings-byte);
    visibility: visible;
    opacity: 1;
  }

  .secondary-list {
    min-height: 0;
    padding: 0 0 0 var(--cui-spacings-mega);
    margin: 0;

    /* Vertically align the border with the icons above: padding + half the icon width */
    margin-left: calc(var(--cui-spacings-byte) + (var(--cui-body-s-line-height) / 2));
    overflow: hidden;
    list-style: none;
    border-left: var(--cui-border-width-kilo) solid var(--cui-border-subtle);
  }

  /* Loading placeholders */

  .loading {
    pointer-events: none;
    user-select: none;
  }

  .secondary-label {
    display: inline-block;
  }

  .loading .skeleton {
    --skeleton-pulse-width: 8rem;

    color: transparent;
    background-color: var(--cui-bg-highlight);
    background-image: linear-gradient(
      90deg,
      var(--cui-bg-highlight),
      var(--cui-bg-subtle),
      var(--cui-bg-highlight)
    );
    background-repeat: no-repeat;
    background-size: var(--skeleton-pulse-width) 100%;
    border-radius: var(--cui-border-radius-byte);
    animation: pulse 3s ease-in-out infinite;
  }

  .loading .skeleton > :global(*) {
    visibility: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    .loading .skeleton {
      animation: none;
    }
  }

  @keyframes pulse {
    0% {
      background-position: calc(-1 * var(--skeleton-pulse-width)) 0;
    }

    50%,
    100% {
      background-position: calc(var(--skeleton-pulse-width) + 100%) 0;
    }
  }

  /* Mobile */

  .mobile {
    width: 80vw;
    max-width: 300px;
    height: 100dvh;
    max-height: unset;
    padding: 0;
    margin: 0;
    color: var(--cui-fg-normal);
    background-color: color-mix(in srgb, var(--cui-bg-normal) 80%, transparent);
    border: none;
    box-shadow: 0 0 0 100vmax var(--cui-bg-overlay);
    backdrop-filter: blur(20px);
    transform: translateX(-100%);
    transition:
      transform 120ms,
      overlay 120ms allow-discrete,
      display 120ms allow-discrete;
  }

  .mobile[open] {
    transform: translateX(0);
  }

  @starting-style {
    .mobile[open] {
      transform: translateX(-100%);
    }
  }

  .mobile::backdrop {
    background: transparent;
  }

  .mobile::after {
    position: absolute;
    right: 0;
    bottom: env(safe-area-inset-bottom);
    left: 0;
    display: block;
    height: var(--cui-spacings-giga);
    pointer-events: none;
    content: '';
    background: linear-gradient(
      color-mix(in srgb, var(--cui-bg-elevated) 0%, transparent),
      color-mix(in srgb, var(--cui-bg-elevated) 66%, transparent),
      color-mix(in srgb, var(--cui-bg-elevated) 100%, transparent)
    );
  }

  @media (max-width: 479px) {
    .mobile::after {
      height: var(--cui-spacings-mega);
    }
  }

  @media (min-width: 1024px) {
    .mobile {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mobile {
      transition: none;
    }
  }

  :global(html):has(.mobile[open]) {
    overflow: hidden;
  }

  .mobile-content {
    height: 100dvh;
    padding: var(--cui-spacings-mega);
    padding-top: var(--cui-spacings-zetta);
    overflow-y: auto;
  }

  .close-button {
    position: absolute;
    top: var(--cui-spacings-kilo);
    left: var(--cui-spacings-mega);
    z-index: calc(var(--cui-z-index-input) + 1);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    color: var(--cui-fg-normal);
    cursor: pointer;
    background-color: var(--cui-bg-subtle);
    border: none;
    border-radius: var(--cui-border-radius-circle);
    transition: background-color var(--cui-transitions-default);
  }

  .close-button:hover {
    background-color: var(--cui-bg-normal-hovered);
  }

  .close-button:active {
    background-color: var(--cui-bg-highlight);
  }

  .close-button:focus-visible {
    outline: 0;
    box-shadow:
      0 0 0 0 var(--cui-bg-normal),
      0 0 0 2px var(--cui-border-focus);
  }
</style>
