<script context="module" lang="ts">
  function getWidth(value = 0, max = 1): string {
    const width = value && max ? ((value / max) * 100).toFixed(2) : 0;
    return `${width}%`;
  }
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
		id?: string;
		/**
		 * Choose from size variants.
		 */
    size?: 's' | 'm' | 'l';
		/**
		 * A number greater than zero, indicating how much work the task requires.
		 */
		max?: number;
		/**
		 * A number between 0 and max, indicating how much of the task has been
		 * completed.
		 */
		value?: number;
		/**
		 * Whether the progress animation should loop indefinitely.
		 */
		loop?: boolean;
		/**
		 * The time it takes the progress bar to fill up in milliseconds.
		 */
		duration?: number;
		/**
		 * Whether the animation should the paused.
		 */
		paused?: boolean;
		/**
		 * A descriptive label that is used by screen readers.
		 */
		label?: string;
		/**
		 * Visually hide the label. This should only be used in rare cases and only
		 * if the purpose of the field can be inferred from other context.
		 */
		hideLabel?: boolean;
  }

  let {
		id = 'progress-bar',
    size = 'm',
    max = 0,
    value = 0,
    loop = false,
    duration = 3000,
    paused = false,
    label = 'Loading...',
    hideLabel = false
  }: Props = $props();
</script>

<div class="wrapper">
  {#if max || value}
    <span
      role="progressbar"
      class="base {size}"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-labelledby={id}
      aria-label={label}
      style="--pagination-width: {getWidth(value, max)};"
		></span>
  {:else}
    <span
      role="progressbar"
      aria-labelledby={id}
      class="base {size}"
      data-loop={loop}
      aria-label={label}
      style="--pagination-animation-duration: {duration}ms; --pagination-animation-play-state: {paused
        ? 'paused'
        : 'running'};"
    ></span>
  {/if}
  <span {id} class="label" class:hide-visually={hideLabel}>{label}</span>
</div>

<style>
  .wrapper {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .base {
    position: relative;
    width: 100%;
    overflow: hidden;
    background-color: var(--cui-bg-highlight);
    border-radius: var(--cui-border-radius-pill);
  }

  .base::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    display: block;
    width: 1px;
    height: 100%;
    content: '';
    background-color: var(--cui-bg-accent-strong);
    transition: width 0.05s ease-out;
  }

  /* Task */
  .base[aria-valuenow]::after {
    width: var(--pagination-width);
  }

  /* Timed */
  @keyframes one {
    0% {
      width: 0;
    }

    100% {
      width: 100%;
    }
  }

  @keyframes loop {
    0% {
      width: 0;
      transform: translateX(0%);
    }

    90% {
      width: 100%;
      transform: translateX(0%);
    }

    100% {
      width: 100%;
      transform: translateX(100%);
    }
  }

  .base:not([aria-valuenow])::after {
    border-radius: var(--cui-border-radius-pill);
    animation-name: one;
    animation-duration: var(--pagination-animation-duration);
    animation-play-state: var(--pagination-animation-play-state);
    animation-fill-mode: forwards;
  }

  .base:not([aria-valuenow])[data-loop]::after {
    animation-name: loop;
    animation-iteration-count: infinite;
  }

  /* Sizes */
  .s {
    height: var(--cui-spacings-bit);
  }

  .m {
    height: var(--cui-spacings-byte);
  }

  .l {
    height: var(--cui-spacings-mega);
  }

  .label {
    flex-shrink: 0;
    margin-left: var(--cui-spacings-byte);
    font-size: var(--cui-typography-body-two-font-size);
    line-height: var(--cui-typography-body-two-line-height);
  }

  .hide-visually {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
</style>
