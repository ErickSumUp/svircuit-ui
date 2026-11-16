<script lang="ts">
  import type { HTMLDialogAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { MediaQuery } from 'svelte/reactivity';

  interface Props extends Omit<HTMLDialogAttributes, 'open' | 'onclose' | 'children'> {
    /**
     * Whether the side panel is open. Bind it to open and close the panel.
     */
    open?: boolean;
    /**
     * The headline of the side panel, which also labels it.
     */
    headline: string;
    /**
     * Called when the user closes the side panel with the close button or the
     * Escape key. Return a rejected promise to keep the panel open.
     */
    onclose?: () => void | Promise<void>;
    /**
     * Called when the user clicks the back button or presses Escape. The back
     * button is shown when both `onback` and `backButtonLabel` are set.
     */
    onback?: () => void;
    /**
     * The back button's accessible name.
     */
    backButtonLabel?: string;
    /**
     * The close button's accessible name. The close button is only shown when
     * it's set.
     */
    closeButtonLabel?: string;
    /**
     * Stops the Escape key from closing the side panel. Default: `false`.
     */
    preventEscapeKeyClose?: boolean;
    children: Snippet;
  }

  let {
    open = $bindable(false),
    headline,
    onclose,
    onback,
    backButtonLabel,
    closeButtonLabel,
    preventEscapeKeyClose = false,
    children,
    class: className,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const isMobile = new MediaQuery('max-width: 767px', false);

  let dialog: HTMLDialogElement | undefined = $state();
  let isModal = false;
  let isHeaderSticky = $state(false);

  // The panel is a modal on small viewports, and sits next to the page content on larger ones.
  function syncOpen(element: HTMLDialogElement) {
    const shouldBeModal = isMobile.current;
    if (element.open && (!open || isModal !== shouldBeModal)) element.close();
    if (open && !element.open) {
      isModal = shouldBeModal;
      if (isModal) element.showModal();
      else element.show();
    }
  }

  async function requestClose() {
    try {
      await onclose?.();
      open = false;
    } catch {
      // A rejected `onclose` keeps the panel open.
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || !open || preventEscapeKeyClose || !dialog?.open) return;
    // Only the panel on top of a stack reacts.
    const openPanels = document.querySelectorAll('dialog[data-side-panel][open]');
    if (openPanels[openPanels.length - 1] !== dialog) return;
    event.preventDefault();
    if (onback) onback();
    else requestClose();
  }

  function handleClose(event: Event & { currentTarget: HTMLDialogElement }) {
    // A `<form method="dialog">` inside the panel closes it natively.
    if (!event.currentTarget.open) open = false;
  }
</script>

<svelte:document onkeydown={handleKeydown} />

<!--
  @component
  A panel that slides in from the right to show the details of the selected
  item next to the page content. On small viewports it covers the whole screen.

  Unlike circuit's `useSidePanel` hook, the panel is declarative: render it with
  `bind:open`. Render a second panel inside the first one to stack them. Wrap
  the page content in a `SidePanelProvider` to make room for open panels.
-->
<dialog
  {...rest}
  bind:this={dialog}
  class={['base', className]}
  data-side-panel
  aria-labelledby={`${uid}-headline`}
  closedby="none"
  oncancel={(event) => event.preventDefault()}
  onclose={handleClose}
  {@attach syncOpen}
>
  <div class="wrapper" onscroll={(event) => (isHeaderSticky = event.currentTarget.scrollTop > 0)}>
    <header class={['header', isHeaderSticky && 'sticky']}>
      {#if onback && backButtonLabel}
        <button
          type="button"
          class="button"
          title={backButtonLabel}
          aria-label={backButtonLabel}
          onclick={onback}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              fill="currentColor"
              d="M11.293 4.293a1 1 0 1 1 1.414 1.414L7.414 11H20v2H7.414l5.293 5.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414z"
            />
          </svg>
        </button>
      {/if}
      <h2 id={`${uid}-headline`} class="headline">{headline}</h2>
      {#if closeButtonLabel}
        <button
          type="button"
          class="button"
          title={closeButtonLabel}
          aria-label={closeButtonLabel}
          onclick={requestClose}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              fill="currentColor"
              d="M17.293 5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 1 1 1.414-1.414L12 10.586z"
            />
          </svg>
        </button>
      {/if}
    </header>
    <div class="content">
      {@render children()}
    </div>
  </div>
</dialog>

<style>
  .base {
    position: fixed;
    right: 0;
    bottom: 0;
    left: unset;
    z-index: var(--cui-z-index-side-panel);
    max-width: none;
    padding: 0;
    color: var(--cui-fg-normal);
    background-color: var(--cui-bg-elevated);
    border: none;
    transform: translateX(100%);
    transition:
      transform 300ms ease-in-out,
      overlay 300ms allow-discrete,
      display 300ms allow-discrete;
  }

  /* `none` rather than `translateX(0)`, so a stacked panel inside isn't positioned relative to this one. */
  .base[open] {
    transform: none;
  }

  @starting-style {
    .base[open] {
      transform: translateX(100%);
    }
  }

  .base::backdrop {
    background: transparent;
  }

  .base:focus {
    outline: none;
  }

  /* Fades out content that scrolls under the bottom edge. */
  .base::after {
    position: absolute;
    right: 0;
    bottom: env(safe-area-inset-bottom);
    left: 0;
    display: block;
    height: var(--cui-spacings-mega);
    pointer-events: none;
    content: '';
    background: linear-gradient(
      color-mix(in srgb, var(--cui-bg-elevated) 0%, transparent),
      color-mix(in srgb, var(--cui-bg-elevated) 66%, transparent),
      color-mix(in srgb, var(--cui-bg-elevated) 100%, transparent)
    );
  }

  .wrapper {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom)
      env(safe-area-inset-left);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .header {
    position: sticky;
    top: 0;
    /* Stays below stacked panels, which render inside the content. */
    z-index: 1;
    box-sizing: border-box;
    display: flex;
    flex: none;
    align-items: center;
    width: 100%;
    min-height: 56px;
    background-color: var(--cui-bg-elevated);
  }

  .sticky {
    box-shadow: inset 0 calc(-1 * var(--cui-border-width-kilo)) 0 var(--cui-border-divider);
  }

  .headline {
    flex: 1 1 auto;
    margin: 0;
    margin-left: var(--cui-spacings-zetta);
    overflow-x: hidden;
    font-size: var(--cui-headline-s-font-size);
    font-weight: var(--cui-font-weight-bold);
    line-height: var(--cui-headline-s-line-height);
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .content {
    box-sizing: border-box;
    width: 100%;
    padding: 0 var(--cui-spacings-mega);
  }

  @media (max-width: 767px) {
    .base {
      top: 0;
      width: 100vw;
      height: 100vh;
      height: 100dvh;
      max-height: none;
      margin: auto;
    }
  }

  @media (min-width: 768px) {
    .base {
      top: var(--top-navigation-height, 0);
      box-sizing: border-box;
      width: var(--side-panel-width, 440px);
      height: calc(100vh - var(--top-navigation-height, 0px));
      height: calc(100dvh - var(--top-navigation-height, 0px));
      max-height: none;
      padding: var(--cui-spacings-mega) 0;
      margin: 0;
      background-color: var(--cui-bg-normal);
    }

    .base::after {
      bottom: calc(var(--cui-spacings-mega) + var(--cui-border-width-kilo));
      left: var(--cui-border-radius-kilo);
      width: calc(
        var(--side-panel-width, 440px) - var(--cui-border-radius-kilo) * 2 -
          var(--cui-spacings-mega) * 2
      );
      height: var(--cui-spacings-giga);
      background: linear-gradient(
        color-mix(in srgb, var(--cui-bg-normal) 0%, transparent),
        color-mix(in srgb, var(--cui-bg-normal) 66%, transparent),
        color-mix(in srgb, var(--cui-bg-normal) 100%, transparent)
      );
      border-bottom-right-radius: var(--cui-border-radius-kilo);
      border-bottom-left-radius: var(--cui-border-radius-kilo);
    }

    .wrapper {
      margin-right: var(--cui-spacings-tera);
      border: var(--cui-border-width-kilo) solid var(--cui-border-subtle);
      border-radius: var(--cui-border-radius-kilo);
    }

    .header {
      background-color: var(--cui-bg-normal);
      border-top-left-radius: var(--cui-border-radius-mega);
    }

    .content {
      padding: 0 var(--cui-spacings-giga) var(--cui-spacings-giga);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .base {
      transition: none;
    }
  }

  /* Back and close buttons — inlined from IconButton and CloseButton, tertiary, size `m` */
  .button {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    padding: calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));
    margin: var(--cui-spacings-bit);
    color: var(--cui-fg-accent);
    cursor: pointer;
    background-color: transparent;
    border: var(--cui-border-width-kilo) solid transparent;
    border-radius: var(--cui-border-radius-kilo);
    transition: color var(--cui-transitions-default);
  }

  .button:hover {
    color: var(--cui-fg-accent-hovered);
  }

  .button:active {
    color: var(--cui-fg-accent-pressed);
    transform: translate(0, 1px);
  }

  .button:focus-visible {
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }
</style>
