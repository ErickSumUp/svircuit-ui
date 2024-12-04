<script>
  import Body from '$lib/components/Body.svelte';
  import SubHeadline from '$lib/SubHeadline.svelte';
  import Badge from '$lib/components/Badge.svelte';

  /**
   * @typedef {Object} Badge
   * @property {string} [label]
   * @property {boolean} [circle]
   * @property {('promo'|'danger'|'neutral'|'success'|'warning')} [variant]
   */

  /**
   * @typedef {Object} Link
   * @property {string} label
   * @property {string} href
   * @property {boolean} isActive
   * @property {Badge} [badge]
   */

  /**
   * @typedef {Object} Group
   * @property {string} label
   * @property {Array.<Link>} links
   */

  /**
   * @typedef {Object} Props
   * @property {Array.<Group>} [groups]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let {
    groups = [
      {
        label: 'Home',
        links: [
          {
            label: 'Home',
            href: '/home',
            isActive: true,
            badge: {
              label: 'New',
              circle: true,
              variant: 'promo'
            }
          }
        ]
      }
    ],
    children
  } = $props();
</script>

<div class="wrapper">
  <nav aria-label="secondary navigation">
    <ul>
      {#each groups as group}
        <li>
          {#if group.label}
            <span class="group-headline-wrapper">
              <SubHeadline as="h3">{group.label}</SubHeadline>
            </span>
          {/if}
          <ul style="list-style: none;">
            {#each group.links as link}
              <li>
                <a
                  href={link.href}
                  class="anchor navigation-item focus-visible-inset"
                  aria-current={link.isActive ? 'page' : undefined}
                >
                  <span class="label">
                    <Body size="one" variant={link.isActive ? 'highlight' : 'p'}>{link.label}</Body>
                  </span>
                  {#if link.badge}
                    <Badge variant={link.badge.variant} circle={link.badge.circle}
                      >{link.badge.label}</Badge
                    >
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
    {@render children?.()}
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
</style>
