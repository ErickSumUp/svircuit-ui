<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLAnchorAttributes {
    /**
     * Choose from 3 font sizes. Default: `m`.
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
     * Choose from three font weights. Default: `regular`.
     */
    weight?: 'regular' | 'semibold' | 'bold';
    /**
     * Choose a text decoration. Underline is reserved for the link itself.
     */
    decoration?: 'strikethrough';
    /**
     * @deprecated Use the `weight` prop instead of the `highlight` variant.
     * Use custom CSS for the `quote` variant.
     */
    variant?: '' | 'highlight' | 'quote';
    /**
     * The URL the link points to. Without it, and without an `onclick`
     * handler, the text is rendered as a `span`.
     */
    href?: string;
    /**
     * Short label to describe that the link leads to an external page or opens
     * in a new tab. Required for links with `target="_blank"` or
     * `rel="external"`.
     */
    externalLabel?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    size = 'm',
    weight = 'regular',
    decoration,
    variant = '',
    href,
    externalLabel,
    'aria-describedby': describedBy,
    children,
    ...rest
  }: Props = $props();

  const deprecatedSizeMap: Record<string, string> = { one: 'm', two: 's' };

  const fontSize = $derived(deprecatedSizeMap[size] ?? size);

  const uid = $props.id();
  const externalLabelId = `anchor-external-${uid}`;

  const isExternalLink = $derived(rest.rel === 'external' || rest.target === '_blank');
  const showsExternalLabel = $derived(Boolean(isExternalLink && externalLabel));

  const describedByIds = $derived(
    [showsExternalLabel && externalLabelId, describedBy].filter(Boolean).join(' ') || undefined
  );

  /* Text that leads nowhere is rendered as a span, so that it isn't announced
     as a link, but still matches the surrounding copy. */
  const element = $derived(href ? 'a' : rest.onclick ? 'button' : 'span');
</script>

<svelte:element
  this={element}
  class={['text', element !== 'span' && 'base', fontSize, weight, decoration, variant]}
  {href}
  type={element === 'button' ? 'button' : undefined}
  aria-describedby={describedByIds}
  {...rest}
>
  {@render children()}{#if showsExternalLabel}<span
      aria-hidden="true"
      id={externalLabelId}
      class="hide-visually">{externalLabel}</span
    >{/if}
</svelte:element>

<style>
  /* Typography — inlined from the Body component */
  .text {
    letter-spacing: var(--cui-letter-spacing);
  }

  .l {
    font-size: var(--cui-body-l-font-size);
    line-height: var(--cui-body-l-line-height);
  }

  .m {
    font-size: var(--cui-body-m-font-size);
    line-height: var(--cui-body-m-line-height);
  }

  .s {
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
  }

  .regular {
    font-weight: var(--cui-font-weight-regular);
  }

  .semibold {
    font-weight: var(--cui-font-weight-semibold);
  }

  .bold {
    font-weight: var(--cui-font-weight-bold);
  }

  .strikethrough {
    text-decoration: line-through;
  }

  .highlight {
    font-weight: var(--cui-font-weight-semibold);
  }

  .quote {
    padding-left: var(--cui-spacings-kilo);
    font-style: italic;
    border-left: var(--cui-border-width-mega) solid var(--cui-border-accent);
  }

  /* Link */
  .base {
    display: inline-block;
    padding: 0;
    margin-top: 0;
    margin-right: 0;
    margin-left: 0;
    color: var(--cui-fg-accent);
    text-align: left;
    text-decoration: underline;
    text-decoration-skip-ink: auto;
    background: none;
    border: 0;
    border-radius: var(--cui-border-radius-bit);
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

  .base:focus {
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  .base:focus:not(:focus-visible) {
    box-shadow: none;
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
</style>
