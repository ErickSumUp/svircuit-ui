<script lang="ts" module>
  export type Link = {
    label: string;
    href: string;
    isActive: boolean;
    badge?: Badge;
  };

  export type Group = {
    label: string;
    links: Link[];
  };

  export type Badge = {
    label: string;
    circle: boolean;
  };
</script>

<script lang="ts">
  import { type Snippet } from 'svelte';

  interface Props {
    groups?: Group[];
    footerContent?: Snippet;
  }

  let { groups = [], footerContent }: Props = $props();

  type SubHeadlineProps = {
    label: string;
  };
  type PromoBadgeProps = {
    message: string;
    circle?: boolean;
  };
  type LinkLabelProps = {
    label: string;
    isActive: boolean;
  };
</script>

{#snippet subHeadline({ label }: SubHeadlineProps)}
  <h3 class="sub-headline">
    {label}
  </h3>
{/snippet}

{#snippet promoBadge({ message, circle }: PromoBadgeProps)}
  <span class="promo-badge-base promo-badge-promo" class:promo-badge-circle={circle}>
    {message}
  </span>
{/snippet}

{#snippet linkLabel({ label, isActive }: LinkLabelProps)}
  <p class="base" class:label-bold={isActive}>
    {label}
  </p>
{/snippet}

<div class="wrapper">
  <nav aria-label="secondary navigation">
    <ul>
      {#each groups as group, i (i)}
        <li>
          {#if group.label}
            <span class="group-headline-wrapper">
              {@render subHeadline({ label: group.label })}
            </span>
          {/if}
          <ul style="list-style: none;">
            {#each group.links as link, i (i)}
              <li>
                <a
                  href={link.href}
                  class="anchor navigation-item focus-visible-inset"
                  aria-current={link.isActive ? 'page' : undefined}
                >
                  <span class="label">
                    {@render linkLabel({ label: link.label, isActive: link.isActive })}
                  </span>
                  {#if link.badge}
                    {@render promoBadge({ message: link.badge.label, circle: link.badge.circle })}
                  {/if}
                </a>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </nav>
  <footer>
    {@render footerContent?.()}
  </footer>
</div>

<style>
  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-right: var(--cui-border-width-kilo) solid var(--cui-border-divider);
  }

  @media (max-width: 1900px) {
    .wrapper {
      flex-shrink: 0;
      min-width: var(--cui-secondary-navigation-width-closed);
    }
  }

  @media (min-width: 1900px) {
    .wrapper {
      min-width: var(--cui-secondary-navigation-width-open);
    }
  }

  nav {
    position: sticky;
    top: var(--top-navigation-height, 0);
    display: flex;
    flex-direction: column;
    width: 200px;
    height: calc(100vh - var(--top-navigation-height, 0px));
    overflow-y: auto;
    background-color: var(--cui-bg-normal);
  }

  @media (min-width: 1900px) {
    nav {
      width: var(--cui-secondary-navigation-width-open);
    }

    nav:hover,
    nav:focus-within {
      box-shadow: 1px 0 var(--cui-border-divider);
    }
  }

  ul {
    list-style: none;
  }

  [aria-current='page'] .label {
    font-weight: var(--cui-font-weight-bold);
  }

  .focus-visible-inset:focus {
    outline: 0;
    box-shadow: inset 0 0 0 4px var(--cui-border-focus);
  }

  .focus-visible-inset:focus::-moz-focus-inner {
    border: 0;
  }

  .focus-visible-inset:focus:not(:focus-visible) {
    box-shadow: none;
  }

  [aria-current='page'] .label {
    font-weight: var(--cui-font-weight-bold);
  }

  .anchor {
    flex-wrap: wrap;
    padding: var(--cui-spacings-mega) var(--cui-spacings-giga);
    hyphens: auto;
    text-decoration: none;
    word-break: break-word;
  }

  .label {
    margin-right: var(--cui-spacings-byte);
  }

  .group-headline-wrapper {
    display: inline-block;
    margin: var(--cui-spacings-tera) var(--cui-spacings-mega) var(--cui-spacings-byte);
  }

  .navigation-item {
    display: flex;
    align-items: center;
    color: var(--cui-fg-normal);
    text-align: left;
    cursor: pointer;
    background-color: var(--cui-bg-normal);
    border: none;
    outline: none;
    transition:
      color var(--cui-transitions-default),
      background-color var(--cui-transitions-default);
  }

  .navigation-item:hover {
    color: var(--cui-fg-normal-hovered);
    background-color: var(--cui-bg-normal-hovered);
  }

  .navigation-item:active {
    color: var(--cui-fg-normal-pressed);
    background-color: var(--cui-bg-normal-pressed);
  }

  .navigation-item:disabled {
    color: var(--cui-fg-normal-disabled);
    pointer-events: none;
    background-color: var(--cui-bg-normal-disabled);
  }

  .navigation-item[aria-current='page'] {
    color: var(--cui-fg-accent);
    background-color: var(--cui-bg-accent);
  }

  .navigation-item[aria-current='page']:hover {
    color: var(--cui-fg-accent-hovered);
    background-color: var(--cui-bg-accent-hovered);
  }

  .navigation-item[aria-current='page']:active {
    color: var(--cui-fg-accent-pressed);
    background-color: var(--cui-bg-accent-pressed);
  }

  .navigation-item[aria-current='page']:disabled {
    color: var(--cui-fg-accent-disabled);
    background-color: var(--cui-bg-accent-disabled);
  }

  .focus-visible-inset:focus {
    outline: 0;
    box-shadow: inset 0 0 0 4px var(--cui-border-focus);
  }

  .focus-visible-inset:focus::-moz-focus-inner {
    border: 0;
  }

  .focus-visible-inset:focus:not(:focus-visible) {
    box-shadow: none;
  }

  .sub-headline {
    font-size: var(--cui-ty-sub-headline-font-size);
    font-weight: var(--cui-font-weight-bold);
    line-height: var(--cui-ty-sub-headline-line-height);
    color: var(--cui-fg-normal);
    text-transform: uppercase;
  }

  .promo-badge-base {
    display: inline-block;
    padding: 2px var(--cui-spacings-byte);
    font-size: var(--cui-typography-body-m-font-size);
    font-weight: var(--cui-font-weight-bold);
    line-height: var(--cui-typography-body-m-line-height);
    text-align: center;
    letter-spacing: 0.25px;
    border-radius: var(--cui-border-radius-pill);
  }

  .promo-badge-base {
    color: var(--cui-fg-on-strong);
    background-color: var(--cui-bg-promo-strong);
  }

  .promo-badge-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 2px 4px;
  }
</style>
