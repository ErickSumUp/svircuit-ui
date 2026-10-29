<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface Props extends HTMLButtonAttributes {
    /**
     * When active, the Hamburger morphs into a close icon. Default: false.
     */
    isActive?: boolean;
    /**
     * Label for the active state. Displayed on hover and read by screen readers.
     */
    activeLabel: string;
    /**
     * Label for the inactive state. Displayed on hover and read by screen readers.
     */
    inactiveLabel: string;
    /**
     * Choose from 2 sizes. Default: `m`.
     */
    size?: 's' | 'm';
  }

  let {
    isActive = false,
    activeLabel,
    inactiveLabel,
    size = 'm',
    class: className,
    ...rest
  }: Props = $props();

  const label = $derived(isActive ? activeLabel : inactiveLabel);
</script>

<button
  type="button"
  aria-label={label}
  title={label}
  {...rest}
  class={['base', size, isActive && 'active', className]}
>
  <span class="icon" aria-hidden="true">
    <span class="lines"></span>
  </span>
</button>

<style>
  /* Inlined from circuit's NavigationButton (a tertiary IconButton). */
  .base {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    color: var(--cui-fg-normal);
    cursor: pointer;
    background-color: var(--cui-bg-subtle);
    border: none;
    border-radius: var(--cui-border-radius-circle);
    transition:
      color var(--cui-transitions-default),
      background-color var(--cui-transitions-default);
  }

  .base:hover {
    background-color: var(--cui-bg-normal-hovered);
  }

  .base:active,
  .base[aria-current='page'],
  .base[aria-pressed='true'],
  .base[aria-expanded='true'] {
    background-color: var(--cui-bg-highlight);
  }

  .base:active {
    transform: translate(0, 1px);
  }

  .base:focus-visible {
    outline: var(--cui-border-width-mega) solid var(--cui-border-focus);
    outline-offset: var(--cui-border-width-mega);
  }

  .base.s {
    padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo));
  }

  .base.m {
    padding: calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));
  }

  .icon {
    position: relative;
    display: flex;
    justify-content: center;
    transform: translateY(-1px);
  }

  .s .icon {
    width: var(--cui-icon-sizes-s);
    height: var(--cui-icon-sizes-s);
  }

  .m .icon {
    width: var(--cui-icon-sizes-m);
    height: var(--cui-icon-sizes-m);
  }

  .s .icon {
    --hamburger-width: calc(var(--cui-icon-sizes-s) - 2px);
    --hamburger-offset: 5px;
  }

  .m .icon {
    --hamburger-width: calc(var(--cui-icon-sizes-m) - 2px);
    --hamburger-offset: 7px;
  }

  .lines {
    top: 50%;
    width: var(--hamburger-width);
  }

  .lines,
  .lines::before,
  .lines::after {
    position: absolute;
    display: block;
    height: 2px;
    background-color: currentColor;
    border-radius: 1px;
    transition:
      width 0.2s ease-out 0.15s,
      opacity 0.1s ease-in,
      transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  .lines::before,
  .lines::after {
    top: 0;
    content: '';
  }

  .lines::before {
    width: calc(var(--hamburger-width) * 0.64);
    transform: translateY(calc(-1 * var(--hamburger-offset)));
  }

  .lines::after {
    width: calc(var(--hamburger-width) * 0.82);
    transform: translateY(var(--hamburger-offset));
  }

  .active .lines {
    transform: rotate(225deg);
  }

  .active .lines,
  .active .lines::before,
  .active .lines::after {
    width: var(--hamburger-width);
    transition:
      width 0.2s ease-out 0.15s,
      opacity 0.1s ease-out 0.15s,
      transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0.15s;
  }

  .active .lines::before {
    opacity: 0;
    transform: translateY(0);
  }

  .active .lines::after {
    transform: translateY(0) rotate(-90deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .lines,
    .lines::before,
    .lines::after {
      transition: none !important;
    }
  }
</style>
