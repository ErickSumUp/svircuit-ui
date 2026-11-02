<script lang="ts" module>
  import type { Snippet } from 'svelte';

  /**
   * The navigation's height. It is also available as the
   * `--top-navigation-height` custom property inside the navigation.
   */
  export const TOP_NAVIGATION_HEIGHT = '68px';

  export type UtilityLink = {
    /**
     * Short label for the link. It is shown in a tooltip and names the link
     * for screen readers.
     */
    label: string;
    /**
     * A 24px icon that identifies the link.
     */
    icon: Snippet;
    /**
     * Renders the link as an anchor. Without it, it is a button.
     */
    href?: string;
    target?: string;
    rel?: string;
    onclick?: (event: MouseEvent) => void;
    /**
     * Whether the link is the current page.
     */
    isActive?: boolean;
  };

  export type CustomLink = {
    /**
     * Uniquely identifies the item among the links.
     */
    key: string;
    /**
     * Custom content. Make sure interactive content matches the hover, focus
     * and active styles of the regular links.
     */
    children: Snippet;
  };
</script>

<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import Hamburger from '$lib/components/Hamburger.svelte';
  import SkeletonContainer from '$lib/components/SkeletonContainer.svelte';
  import SkipLink from '$lib/components/SkipLink.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';

  interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * The brand, usually a SumUpLogo inside a link to the home page.
     */
    logo?: Snippet;
    /**
     * Utility links on the right, such as settings or the user's profile.
     */
    links?: (UtilityLink | CustomLink)[];
    /**
     * A Hamburger, shown below 1024px, that toggles the SideNavigation.
     */
    hamburger?: ComponentProps<typeof Hamburger>;
    isLoading?: boolean;
    /**
     * Hash link to the page's main content, so keyboard and screen reader
     * users can skip the navigation. Required to comply with
     * [WCAG 2.1 SC 2.4.1](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html).
     */
    skipNavigationHref?: string;
    skipNavigationLabel?: string;
  }

  let {
    logo,
    links,
    hamburger,
    isLoading = false,
    skipNavigationHref,
    skipNavigationLabel,
    class: className,
    ...rest
  }: Props = $props();

  function isCustomLink(link: UtilityLink | CustomLink): link is CustomLink {
    return 'children' in link;
  }
</script>

<!--
  @component
  The top bar of the application shell, with the brand, utility links and,
  below 1024px, the Hamburger that toggles the SideNavigation.
-->
<header {...rest} class={['base', className]}>
  {#if skipNavigationHref && skipNavigationLabel}
    <SkipLink href={skipNavigationHref}>{skipNavigationLabel}</SkipLink>
  {/if}

  <div class="wrapper">
    {#if hamburger}
      <div class="hamburger">
        <SkeletonContainer {isLoading}>
          <Hamburger {...hamburger} />
        </SkeletonContainer>
      </div>
    {/if}
    {#if logo}
      <div class="logo">{@render logo()}</div>
    {/if}
  </div>

  {#if links}
    <SkeletonContainer {isLoading}>
      <ul class="links">
        {#each links as link (isCustomLink(link) ? link.key : link.label)}
          {#if isCustomLink(link)}
            <li class="custom">{@render link.children()}</li>
          {:else}
            <li>
              <Tooltip label={link.label} type="label" placement="bottom">
                {#snippet trigger(attributes)}
                  {#if link.href}
                    <a
                      {...attributes}
                      class="link"
                      href={link.href}
                      target={link.target}
                      rel={link.rel}
                      aria-current={link.isActive ? 'page' : undefined}
                      onclick={link.onclick}
                    >
                      {@render link.icon()}
                    </a>
                  {:else}
                    <button
                      {...attributes}
                      type="button"
                      class="link"
                      aria-current={link.isActive ? 'page' : undefined}
                      onclick={link.onclick}
                    >
                      {@render link.icon()}
                    </button>
                  {/if}
                {/snippet}
              </Tooltip>
            </li>
          {/if}
        {/each}
      </ul>
    </SkeletonContainer>
  {/if}
</header>

<style>
  .base {
    --top-navigation-height: 68px;

    position: sticky;
    top: 0;
    z-index: calc(var(--cui-z-index-navigation) + 1);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: var(--top-navigation-height);
    padding: var(--cui-spacings-kilo) var(--cui-spacings-mega);
    background-color: var(--cui-bg-normal);
    box-shadow: 0 0 0 0 rgb(0 0 0 / 20%);
  }

  /* A line under the navigation once the page is scrolled, driven by the
     page's scroll position instead of a JavaScript observer. */
  @supports (animation-timeline: scroll()) {
    .base {
      animation: scrolled linear both;
      animation-timeline: scroll(root block);
      animation-range: 0 1px;
    }
  }

  @keyframes scrolled {
    to {
      box-shadow: 0 var(--cui-border-width-kilo) 0 0 var(--cui-border-subtle);
    }
  }

  .wrapper {
    display: flex;
    gap: var(--cui-spacings-kilo);
    align-items: center;
    min-width: 0;
    max-width: 100%;
  }

  .logo {
    height: 100%;
  }

  .logo :global(:is(a, button):focus) {
    outline: var(--cui-border-width-mega) solid var(--cui-border-focus);
    outline-offset: var(--cui-border-width-mega);
  }

  .logo :global(:is(a, button):focus:not(:focus-visible)) {
    outline-color: transparent;
  }

  /* Utility links — inlined from circuit's UtilityLinks and NavigationButton */
  .links {
    display: flex;
    gap: var(--cui-spacings-byte);
    align-items: center;
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  .custom {
    height: 100%;
  }

  .link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));
    margin: 0;
    color: var(--cui-fg-normal);
    cursor: pointer;
    background-color: var(--cui-bg-subtle);
    border: none;
    border-radius: var(--cui-border-radius-circle);
    transition: background-color var(--cui-transitions-default);
  }

  .link :global(svg) {
    width: var(--cui-icon-sizes-mega);
    height: var(--cui-icon-sizes-mega);
  }

  .link:hover {
    background-color: var(--cui-bg-normal-hovered);
  }

  .link:active,
  .link[aria-current='page'] {
    background-color: var(--cui-bg-highlight);
  }

  .link:active {
    transform: translate(0, 1px);
  }

  .link:focus-visible {
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  @media (min-width: 1024px) {
    .base {
      padding: var(--cui-spacings-mega) var(--cui-spacings-tera);
    }

    .hamburger {
      display: none;
    }
  }
</style>
