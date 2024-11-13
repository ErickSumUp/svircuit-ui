<script lang="ts">
  import type { Snippet } from 'svelte';
  import {
    type HTMLAnchorAttributes,
    type HTMLAttributes,
    type HTMLButtonAttributes,
  } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & HTMLAnchorAttributes & HTMLButtonAttributes & {
    /**
     * Choose between 'action' and 'navigation' variant. Default: 'action'.
     * The `navigation` variant renders a chevron in the trailing section.
     * @type {('action' | 'navigation')}
     */
    variant?: 'action' | 'navigation';
    /**
     * Visually mark the list item as selected.
     * @type {boolean}
     */
    selected?: boolean;
    /**
     * Function that is called when the list item is clicked.
     */
    disabled?: boolean;
    /**
     * Link to another part of the application or external page.
     * @type {string}
     */
    href?: string;
    /**
     * @type {() => void | undefined}
     */
    onclick?;
    /**
     * Display a leading component.
     * Pass an icon or a custom component.
     */
    leading?: Snippet;
    /**
     * Display a details line below the main label.
     */
    details?: Snippet;
    /**
     * Display a trailing label.
     * If using the `navigation` variant, the chevron icon will be center aligned with this label.
     */
    trailingLabel?: Snippet;
    /**
     * Display a trailing details label.
     */
    trailingDetails?: Snippet;
    /**
     * Display a custom trailing component.
     * If using the `navigation` variant, the chevron icon will be center aligned with this component.
     */
    trailingComponent?: Snippet;
    children: Snippet;
  }

  let as: 'a' | 'button' | 'div' = $derived.by(() => {
    if (href) {
      return 'a';
    } else if (onclick) {
      return 'button';
    } else {
      return 'div';
    }
  });

  let {
    variant = 'action',
    selected = false,
    disabled,
    href,
    onclick,
    leading,
    details,
    trailingLabel,
    trailingDetails,
    trailingComponent,
    children,
    ...rest
  }: Props = $props();
</script>

<svelte:element
  this={as}
  class="base"
  class:navigation={variant === 'navigation'}
  aria-current={onclick || href ? selected : undefined}
  {onclick}
  {href}
  role={as === 'button' ? 'button' : undefined}
  {disabled}
  aria-disabled={disabled}
  {...rest}
>
  {#if leading}
    <div class="leading">
      {@render leading?.()}
    </div>
  {/if}
  <div class="content">
    <div class="main">
      <div class="label">
        {@render children()}
      </div>
      {#if details}
        {@render details?.()}
      {/if}
    </div>
    {#if trailingLabel || trailingComponent || variant === 'navigation'}
      <div class="trailing" class:has-label={trailingLabel}>
        <div class="chevron">
          {@render trailingLabel?.()}
          {@render trailingComponent?.()}
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
        {#if trailingDetails}
          <div class="details">
            {@render trailingDetails?.()}
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
