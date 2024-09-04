<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    size?: 'one' | 'two';
    variant?: '' | 'highlight' | 'quote';
    href: string;
    children: Snippet;
  }

  let { size = 'one', variant = '', href, children, ...rest }: Props = $props();
</script>

<a
  {href}
  class="base"
  class:one={size === 'one'}
  class:two={size === 'two'}
  class:highlight={variant === 'highlight'}
  class:quote={variant === 'quote'}
  {...rest}
>
  {@render children()}</a
>

<style>
  .base {
    display: inline-block;
    padding: 0;
    margin-top: 0;
    margin-right: 0;
    margin-left: 0;
    color: var(--cui-fg-accent);
    text-decoration: underline;
    text-decoration-skip-ink: auto;
    background: none;
    border: 0;
    border-radius: var(--cui-border-radius-byte);
    outline: none;
    transition:
      opacity var(--cui-transitions-default),
      color var(--cui-transitions-default),
      background-color var(--cui-transitions-default),
      border-color var(--cui-transitions-default);
  }

  .base:hover {
    color: var(--cui-fg-accent-hovered);
    cursor: pointer;
  }

  .base:active {
    color: var(--cui-fg-accent-pressed);
  }

  .base {
    font-weight: var(--cui-font-weight-regular);
  }
  .one {
    font-size: var(--cui-typography-body-one-font-size);
    line-height: var(--cui-typography-body-one-line-height);
  }
  .two {
    font-size: var(--cui-typography-body-two-font-size);
    line-height: var(--cui-typography-body-two-line-height);
  }

  .highlight {
    font-weight: var(--cui-font-weight-bold);
  }

  .quote {
    font-style: italic;
  }
</style>
