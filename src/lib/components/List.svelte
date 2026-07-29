<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLOlAttributes } from 'svelte/elements';

  interface Props extends HTMLOlAttributes {
    /**
     * A Body size. Should match the surrounding text. Default: `m`.
     */
    size?:
      | 's'
      | 'm'
      | 'l'
      /**
       * @deprecated Use `m` instead.
       */
      | 'one'
      /**
       * @deprecated Use `s` instead.
       */
      | 'two';
    /**
     * Whether the list should be presented as an ordered or unordered list.
     * Default: `unordered`.
     */
    variant?: 'ordered' | 'unordered';
    children: Snippet;
    [key: string]: unknown;
  }

  let { size = 'm', variant = 'unordered', children, ...rest }: Props = $props();

  const deprecatedSizeMap: Record<string, string> = { one: 'm', two: 's' };

  const fontSize = $derived(deprecatedSizeMap[size] ?? size);
</script>

<svelte:element this={variant === 'ordered' ? 'ol' : 'ul'} class={['base', fontSize]} {...rest}>
  {@render children()}
</svelte:element>

<style>
  /* The list items come from the consumer, so they are matched globally. */
  .base {
    margin: 0;
    font-weight: var(--cui-font-weight-regular);
  }

  /* Sizes */
  .l {
    padding-left: var(--cui-spacings-kilo);
    font-size: var(--cui-body-l-font-size);
    line-height: var(--cui-body-l-line-height);
  }

  .l :global(li) {
    margin-bottom: var(--cui-spacings-kilo);
    margin-left: var(--cui-spacings-mega);
  }

  .l :global(li:last-child) {
    margin-bottom: 0;
  }

  .l :global(ul),
  .l :global(ol) {
    margin-bottom: var(--cui-spacings-byte);
    margin-left: var(--cui-spacings-kilo);
  }

  .l :global(ul:last-child),
  .l :global(ol:last-child) {
    margin-bottom: 0;
  }

  .m {
    padding-left: var(--cui-spacings-kilo);
    font-size: var(--cui-body-m-font-size);
    line-height: var(--cui-body-m-line-height);
  }

  .m :global(li) {
    margin-bottom: var(--cui-spacings-byte);
    margin-left: var(--cui-spacings-kilo);
  }

  .m :global(li:last-child) {
    margin-bottom: 0;
  }

  .m :global(ul),
  .m :global(ol) {
    margin-bottom: var(--cui-spacings-byte);
    margin-left: var(--cui-spacings-kilo);
  }

  .m :global(ul:last-child),
  .m :global(ol:last-child) {
    margin-bottom: 0;
  }

  .s {
    padding-left: var(--cui-spacings-kilo);
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
  }

  .s :global(li) {
    margin-bottom: var(--cui-spacings-byte);
    margin-left: var(--cui-spacings-bit);
  }

  .s :global(li:last-child) {
    margin-bottom: 0;
  }

  .s :global(ul),
  .s :global(ol) {
    margin-bottom: var(--cui-spacings-byte);
    margin-left: var(--cui-spacings-bit);
  }

  .s :global(ul:last-child),
  .s :global(ol:last-child) {
    margin-bottom: 0;
  }
</style>
