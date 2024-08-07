<script>
  /**
   * Choose between 'action' and 'navigation' variant. Default: 'action'.
   * The `navigation` variant renders a chevron in the trailing section.
   * @type {('action' | 'navigation')}
   */
  export let variant = 'action';
  /**
   * Visually mark the list item as selected.
   * @type {boolean}
   */
  export let selected = false;
  /**
   * Link to another part of the application or external page.
   * @type {string}
   */
  export let href = undefined;
  /**
   * @type {() => void | undefined}
   */
  export let onClick = undefined;

  let as = 'div';
  $: {
    if (href) {
      as = 'a';
    } else if (onClick) {
      as = 'button';
    }
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
  this={as}
  class="base"
  class:navigation={variant === 'navigation'}
  aria-current={$$props.onClick || $$props.href ? selected : undefined}
  on:click={onClick}
  {href}
  {...$$restProps}
>
  {#if $$slots['leading']}
    <div class="leading">
      <slot name="leading" />
    </div>
  {/if}
  <div class="content">
    <div class="main">
      <div class="label">
        <slot />
      </div>
      {#if $$slots['details']}
        <slot name="details" />
      {/if}
    </div>
    {#if $$slots['trailing-label'] || $$slots['trailing-component'] || variant === 'navigation'}
      <div class="trailing" class:has-label={$$slots['trailing-label']}>
        <div class="chevron">
          <slot name="trailing-label" />
          <slot name="trailing-component" />
          {#if variant === 'navigation'}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 8c0 .266-.104.52-.29.71l-4 4c-.19.186-.444.29-.71.29a1 1 0 0 1-1-1c0-.265.104-.52.29-.71L8.58 8 5.29 4.71A1.013 1.013 0 0 1 5 4a1 1 0 0 1 1-1c.266 0 .52.104.71.29l4 4c.186.19.29.444.29.71z"
                fill="currentColor"
              />
            </svg>
          {/if}
        </div>
        {#if $$slots['trailing-details']}
          <div class="details">
            <slot name="trailing-details" />
          </div>
        {/if}
      </div>
    {/if}
  </div>
</svelte:element>

<style>
  .base {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: var(--cui-spacings-kilo) var(--cui-spacings-mega);
    margin: 0;
    color: var(--cui-fg-normal);
    text-align: left;
    text-decoration: none;
    background-color: var(--cui-bg-normal);
    border: var(--cui-border-width-mega) solid var(--cui-border-subtle);
    border-radius: var(--cui-border-radius-mega);
  }

  .base:disabled,
  .base[disabled],
  .base[aria-disabled='true'] {
    color: var(--cui-fg-normal-disabled);
    pointer-events: none;
    background-color: var(--cui-bg-normal-disabled);
    border-color: var(--cui-border-subtle-disabled);
  }

  /* Interactive */

  a.base,
  button.base {
    cursor: pointer;
  }

  a.base:hover,
  button.base:hover {
    color: var(--cui-fg-normal-hovered);
    background-color: var(--cui-bg-normal-hovered);
    border-color: var(--cui-border-subtle-hovered);
  }

  a.base:focus,
  button.base:focus {
    z-index: 2;
    border-color: transparent;
    outline: 0;
    box-shadow:
      0 0 0 4px var(--cui-bg-normal),
      0 0 0 6px var(--cui-border-focus);
  }

  a.base:focus::-moz-focus-inner,
  button.base:focus::-moz-focus-inner {
    border: 0;
  }

  a.base:focus:not(:focus-visible),
  button.base:focus:not(:focus-visible) {
    z-index: auto;
    border-color: var(--cui-border-subtle);
    box-shadow: none;
  }

  a.base:active,
  button.base:active {
    color: var(--cui-fg-normal-pressed);
    background-color: var(--cui-bg-normal-pressed);
    border-color: var(--cui-border-subtle-pressed);
  }

  .base[aria-current='true'] {
    background-color: var(--cui-bg-accent);
  }

  .base[aria-current='true']:hover,
  .base[aria-current='true']:active {
    background-color: var(--cui-bg-accent);
  }

  .base[aria-current='true']::after {
    position: absolute;
    top: calc(-1 * var(--cui-border-width-mega));
    right: calc(-1 * var(--cui-border-width-mega));
    bottom: calc(-1 * var(--cui-border-width-mega));
    left: calc(-1 * var(--cui-border-width-mega));
    z-index: 1;
    pointer-events: none;
    content: '';
    border: var(--cui-border-width-mega) solid var(--cui-border-accent);
    border-radius: var(--cui-border-radius-mega);
  }

  .leading {
    display: flex;
    flex: none;
    margin-right: var(--cui-spacings-mega);
  }

  .content {
    display: flex;
    flex: auto;
    align-items: center;
    min-width: 0;
  }

  .main {
    display: flex;
    flex: auto;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
  }

  .label {
    max-width: 100%;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .details {
    display: flex;
    align-items: center;
    max-width: 100%;
    min-height: var(--cui-typography-body-one-line-height);
  }

  .trailing {
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: flex-end;
    align-self: stretch;
    justify-content: center;
    margin-left: var(--cui-spacings-mega);
  }

  .trailing.has-label {
    justify-content: flex-start;
  }

  .navigation .trailing {
    margin-right: calc(-1 * var(--cui-spacings-bit));
  }

  .chevron {
    display: flex;
    align-items: center;
  }

  /* When the chevron is preceded by other content */
  .navigation .chevron svg:not(:first-child) {
    margin-left: var(--cui-spacings-bit);
  }

  .navigation .trailing .details {
    height: var(--cui-typography-body-one-line-height);
    margin-right: calc(var(--cui-spacings-mega) + var(--cui-spacings-bit));
  }
</style>
