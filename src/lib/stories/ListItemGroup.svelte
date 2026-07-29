<script lang="ts" module>
  import type { ComponentProps } from 'svelte';
  import ListItem from '$lib/components/ListItem.svelte';

  export type Item = ComponentProps<typeof ListItem> & { key: string | number };
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Choose between the `inset` variant, which draws an outer border and
     * dividers, and `plain`, which draws dividers only. Default: `inset`.
     */
    variant?: 'plain' | 'inset';
    /**
     * The list items to render as a group. Each item needs a unique `key`.
     */
    items: Item[];
    /**
     * A label describing the group. Alternatively, provide an `aria-label` or
     * `aria-labelledby`.
     */
    label?: string;
    /**
     * Visually hide the label. Only use this where the purpose of the group can
     * be inferred from its context.
     */
    hideLabel?: boolean;
    /**
     * A secondary, right-aligned label.
     */
    details?: string;
    [key: string]: unknown;
  }

  let { variant = 'inset', items, label, hideLabel, details, ...rest }: Props = $props();
</script>

<div class="base" class:plain={variant === 'plain'} {...rest}>
  {#if label || details}
    <div class="header">
      {#if label}
        <h4 class="label" class:hide-visually={hideLabel}>{label}</h4>
      {/if}
      {#if details}
        <div class="details">{details}</div>
      {/if}
    </div>
  {/if}
  <ul class="items">
    {#each items as { key, ...item } (key)}
      <li class="item">
        <ListItem {...item} />
      </li>
    {/each}
  </ul>
</div>

<style>
  .base {
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    flex: none;
    align-items: flex-end;
    justify-content: flex-end;
    margin: 0 var(--cui-spacings-mega);
  }

  .plain .header {
    margin: 0 calc(var(--cui-spacings-mega) - var(--cui-border-width-mega));
  }

  .label {
    flex: auto;
    min-width: 0;
    max-width: 100%;
    margin: 0 0 var(--cui-spacings-byte);
    overflow-x: hidden;
    font-size: var(--cui-body-s-font-size);
    font-weight: var(--cui-font-weight-regular);
    line-height: var(--cui-body-s-line-height);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .details {
    flex: none;
    margin-bottom: var(--cui-spacings-byte);
    margin-left: var(--cui-spacings-mega);
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
  }

  .hide-visually {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    white-space: nowrap;
    border: 0;
    clip-path: rect(0 0 0 0);
  }

  .items {
    display: flex;
    flex: auto;
    flex-direction: column;
    padding: 0;
    margin: 0;
    border: var(--cui-border-width-mega) solid var(--cui-border-subtle);
    border-radius: var(--cui-border-radius-mega);
  }

  .plain .items {
    border-width: var(--cui-border-width-kilo) 0;
    border-radius: 0;
  }

  .item {
    list-style: none;
  }

  /* The group owns the outer border, so each item drops its own. */
  .item > :global(*) {
    border: none;
    border-radius: calc(var(--cui-border-radius-mega) - var(--cui-border-width-mega));
  }

  /* The divider is drawn above each item's content, inset to line up with the
     label rather than the edge of the group. */
  .item:not(:first-of-type) > :global(* > div:last-of-type) {
    position: relative;
  }

  .item:not(:first-of-type) > :global(* > div:last-of-type)::before {
    position: absolute;
    top: calc(-1 * var(--cui-spacings-kilo));
    right: calc(-1 * var(--cui-spacings-mega));
    left: 0;
    content: '';
    border-top: var(--cui-border-width-kilo) solid var(--cui-border-divider);
  }

  /* An item that is hovered, focused or selected paints its own background, so
     the dividers touching it are hidden. Circuit tracks the focused item in
     JavaScript; `:has()` expresses the same thing in CSS. */
  .item:hover:not(:first-of-type) > :global(* > div:last-of-type)::before,
  .item:hover + .item:not(:first-of-type) > :global(* > div:last-of-type)::before,
  .item:has(:focus-visible):not(:first-of-type) > :global(* > div:last-of-type)::before,
  .item:has(:focus-visible) + .item:not(:first-of-type) > :global(* > div:last-of-type)::before,
  .item:has([aria-current='true']):not(:first-of-type) > :global(* > div:last-of-type)::before,
  .item:has([aria-current='true'])
    + .item:not(:first-of-type)
    > :global(* > div:last-of-type)::before {
    border-top-width: 0;
  }

  .plain .item > :global([aria-current='true'])::after {
    top: calc(-1 * var(--cui-border-width-kilo));
    right: 0;
    bottom: calc(-1 * var(--cui-border-width-kilo));
    left: 0;
  }
</style>
