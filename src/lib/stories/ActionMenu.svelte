<script lang="ts" module>
  import type { Snippet } from 'svelte';

  export type ActionMenuAction = {
    label: string;
    /**
     * Called when the action is clicked, before the menu closes.
     */
    onclick?: (event: MouseEvent) => void;
    /**
     * Renders the action as a link.
     */
    href?: string;
    target?: string;
    rel?: string;
    /**
     * A leading 24px icon.
     */
    icon?: Snippet;
    /**
     * Signals that the action is irreversible or otherwise dangerous.
     */
    destructive?: boolean;
    disabled?: boolean;
  };

  export type ActionMenuDivider = { type: 'divider' };
</script>

<script lang="ts">
  import { MediaQuery } from 'svelte/reactivity';
  import { tick, type ComponentProps } from 'svelte';
  import Popover from '$lib/components/Popover.svelte';

  type PopoverProps = ComponentProps<typeof Popover>;
  type TriggerProps = Parameters<PopoverProps['trigger']>[0] & {
    onkeydown: (event: KeyboardEvent) => void;
  };

  interface Props extends Omit<
    PopoverProps,
    'trigger' | 'children' | 'hideCloseButton' | 'offset' | 'open' | 'sheetOnMobile'
  > {
    /**
     * Whether the menu is open. Bindable.
     */
    open?: boolean;
    /**
     * Open as a sheet at the bottom of the viewport, with a close button, on
     * narrow screens. Default: true.
     */
    sheetOnMobile?: boolean;
    /**
     * The actions, in order. A divider separates groups of actions.
     */
    actions: (ActionMenuAction | ActionMenuDivider)[];
    /**
     * The button that toggles the menu. Spread the provided attributes onto
     * it; they also open the menu with the arrow keys.
     */
    trigger: Snippet<[TriggerProps]>;
    /**
     * Moves the menu away from its trigger, as Popover's `offset`. Default: 0.
     */
    offset?: PopoverProps['offset'];
  }

  let {
    open = $bindable(false),
    actions,
    trigger: triggerSnippet,
    offset = 0,
    sheetOnMobile = true,
    style,
    ...rest
  }: Props = $props();

  const isMobile = new MediaQuery('max-width: 479px', false);

  let menu: HTMLDivElement | undefined = $state();
  let focusLast = false;

  function isDivider(action: ActionMenuAction | ActionMenuDivider): action is ActionMenuDivider {
    return 'type' in action && action.type === 'divider';
  }

  function getItems() {
    return [...(menu?.querySelectorAll<HTMLElement>('.item:not(:disabled)') ?? [])];
  }

  /* Like circuit, the first action receives focus when the menu opens, or the
     last one when it was opened with the up arrow. */
  $effect(() => {
    if (!open) return;
    tick().then(() => {
      const items = getItems();
      (focusLast ? items.at(-1) : items[0])?.focus();
      focusLast = false;
    });
  });

  function handleTriggerKeyDown(event: KeyboardEvent) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    focusLast = event.key === 'ArrowUp';
    open = true;
  }

  function handleMenuKeyDown(event: KeyboardEvent) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const items = getItems();
    const index = items.indexOf(event.target as HTMLElement);
    const next = event.key === 'ArrowDown' ? index + 1 : index - 1;
    items.at(next % items.length)?.focus();
  }
</script>

<!--
  @component
  A list of actions in a popover, opened from a button. Composes Popover.
-->
<Popover
  bind:open
  {...rest}
  {offset}
  {sheetOnMobile}
  hideCloseButton={!(sheetOnMobile && isMobile.current)}
  style={['--popover-padding-block: 0; --popover-padding-inline: 0', style]
    .filter(Boolean)
    .join('; ')}
>
  {#snippet trigger(props)}
    {@render triggerSnippet({ ...props, onkeydown: handleTriggerKeyDown })}
  {/snippet}

  {#snippet children({ close })}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div bind:this={menu} class="menu" onkeydown={handleMenuKeyDown}>
      {#each actions as action, index (index)}
        {#if isDivider(action)}
          <hr class="divider" aria-hidden="true" />
        {:else if action.href && !action.disabled}
          <a
            class={['item', action.destructive && 'destructive']}
            href={action.href}
            target={action.target}
            rel={action.rel}
            onclick={(event) => {
              action.onclick?.(event);
              close();
            }}
          >
            {@render content(action)}
          </a>
        {:else}
          <button
            type="button"
            class={['item', action.destructive && 'destructive']}
            disabled={action.disabled}
            onclick={(event) => {
              action.onclick?.(event);
              close();
            }}
          >
            {@render content(action)}
          </button>
        {/if}
      {/each}
    </div>
  {/snippet}
</Popover>

{#snippet content(action: ActionMenuAction)}
  {#if action.icon}
    <span class="icon" aria-hidden="true">{@render action.icon()}</span>
  {/if}
  {action.label}
{/snippet}

<style>
  .menu {
    box-sizing: border-box;
    padding: var(--cui-spacings-byte) 0;
    border: var(--cui-border-width-kilo) solid var(--cui-border-subtle);
    border-radius: var(--cui-border-radius-byte);
  }

  /* Inlined from circuit's shared list item styles */
  .item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: var(--cui-spacings-byte) var(--cui-spacings-giga) var(--cui-spacings-byte)
      var(--cui-spacings-kilo);
    margin: 0;
    font-family: inherit;
    font-size: var(--cui-body-m-font-size);
    font-weight: var(--cui-font-weight-regular);
    line-height: var(--cui-body-m-line-height);
    color: var(--cui-fg-normal);
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    background-color: var(--cui-bg-normal);
    border: 0;
  }

  .item:hover {
    background-color: var(--cui-bg-normal-hovered);
  }

  .item:active {
    background-color: var(--cui-bg-normal-pressed);
  }

  .item:focus {
    outline: var(--cui-border-width-mega) solid var(--cui-border-focus);
    outline-offset: calc(-1 * var(--cui-border-width-mega));
  }

  .item:focus:not(:focus-visible) {
    outline-color: transparent;
  }

  .item:disabled {
    color: var(--cui-fg-normal-disabled);
    pointer-events: none;
    background-color: var(--cui-bg-normal-disabled);
  }

  .destructive {
    color: var(--cui-fg-danger);
  }

  .destructive:disabled {
    color: var(--cui-fg-danger-disabled);
  }

  .icon {
    display: flex;
    flex-shrink: 0;
    margin-right: var(--cui-spacings-byte);
  }

  .icon :global(svg) {
    width: var(--cui-icon-sizes-mega);
    height: var(--cui-icon-sizes-mega);
  }

  /* Inlined from the Hr component */
  .divider {
    display: block;
    margin: var(--cui-spacings-bit) var(--cui-spacings-kilo);
    border: 0;
    border-top: var(--cui-border-width-kilo) solid var(--cui-border-divider);
  }
</style>
