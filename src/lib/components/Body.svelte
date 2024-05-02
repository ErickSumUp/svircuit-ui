<script lang="ts">
  /**
   * Choose from size variants.
   * @type {('one' | 'two')}
   */
  export let size: 'one' | 'two' = 'one';
  /**
   * Choose from variant styles.
   * @type {('highlight' | 'quote' | 'confirm' | 'alert' | 'subtle' | 'p')}
   */
  export let variant: 'highlight' | 'quote' | 'confirm' | 'alert' | 'subtle' | 'p' = 'p';
  /**
   * Render the text using any HTML element.
   * @type {string}
   */
  export let as: string = 'p';

  $: element = 'p';

  $: if (variant === 'highlight') {
    element = 'strong';
  } else if (variant === 'quote') {
    element = 'blockquote';
  } else {
    element = 'p';
  }
</script>

<svelte:element
  this={as || element}
  class="base"
  class:one={size === 'one'}
  class:two={size === 'two'}
  class:highlight={variant === 'highlight'}
  class:quote={variant === 'quote'}
  class:confirm={variant === 'confirm'}
  class:alert={variant === 'alert'}
  class:subtle={variant === 'subtle'}
  {...$$restProps}><slot /></svelte:element
>

<style>
  .base,
  p {
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

  .highlight,
  strong {
    font-weight: var(--cui-font-weight-bold);
  }
  .quote,
  blockquote {
    padding-left: var(--cui-spacings-kilo);
    font-style: italic;
    border-left: var(--cui-border-width-mega) solid var(--cui-border-accent);
  }

  .confirm {
    color: var(--cui-fg-success);
  }

  .alert {
    color: var(--cui-fg-danger);
  }

  .subtle {
    color: var(--cui-fg-subtle);
  }
</style>
