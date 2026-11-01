<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  interface Props extends HTMLAnchorAttributes {
    /**
     * The id of the main content, e.g. `#main-content`.
     */
    href: string;
    children: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<!--
  @component
  A shortcut to the main content of a page, visually hidden until it receives
  keyboard focus (WCAG 2.1 SC 2.4.1). Place it at the top of the page.
-->
<a {...rest} class={['base', className]}>{@render children()}</a>

<style>
  /* Link — inlined from the Anchor component, size `m` */
  .base {
    font-size: var(--cui-body-m-font-size);
    font-weight: var(--cui-font-weight-regular);
    line-height: var(--cui-body-m-line-height);
    color: var(--cui-fg-accent);
    text-decoration: underline;
    text-decoration-skip-ink: auto;
    letter-spacing: var(--cui-letter-spacing);
    border-radius: var(--cui-border-radius-bit);
    outline: none;
  }

  .base:hover {
    color: var(--cui-fg-accent-hovered);
  }

  .base:active {
    color: var(--cui-fg-accent-pressed);
  }

  .base:focus-visible {
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  /* Skip link */
  .base {
    position: absolute;
    top: var(--cui-spacings-byte);
    left: var(--cui-spacings-byte);
    z-index: calc(var(--cui-z-index-navigation) + 1);
    width: 1px;
    height: 1px;
    padding: var(--cui-spacings-bit);
    margin: -1px;
    overflow: hidden;
    white-space: nowrap;
    background-color: var(--cui-bg-accent);
    clip-path: rect(0 0 0 0);
    transform: translateX(-100vw);
    transition: transform var(--cui-transitions-default);
  }

  .base:focus,
  .base:hover {
    width: auto;
    height: auto;
    clip-path: unset;
    transform: translateX(0);
  }
</style>
