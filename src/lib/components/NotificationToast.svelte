<script context="module" lang="ts">
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';

  type NotificationToast = {
    id?: number;
    variant: 'info' | 'success' | 'warning' | 'danger';
    headline?: string;
    body: string;
    timeout?: number;
  };

  export const toasts: Writable<Array<NotificationToast>> = writable([]);

  export const addToast = (toast: NotificationToast) => {
    // Create a unique ID, so we can easily find/remove it
    // if it is dismissible/has a timeout.
    const id = Math.floor(Math.random() * 10000);

    const timeoutSeconds = 5 + toast.body.length / 120;
    const timeout = toast.timeout || timeoutSeconds * 1000;

    // Push the toast to the top of the list of toasts
    toasts.update((all) => [
      {
        id,
        variant: toast.variant,
        headline: toast.headline,
        body: toast.body,
        timeout
      },
      ...all
    ]);

    // If toast is dismissible, dismiss it after "timeout" amount of time.
    if (timeout) setTimeout(() => dismissToast(id), timeout);
  };

  export const dismissToast = (id: number) => {
    toasts.update((all) => all.filter((t: NotificationToast) => t.id !== id));
  };
</script>

<script lang="ts">
  export let variant: 'info' | 'success' | 'warning' | 'danger' = 'info';
  export let headline: string = '';
  export let iconLabel: string = '';
  export let body: string = '';
</script>

<div
  class="base"
  class:info={variant === 'info'}
  class:success={variant === 'success'}
  class:warning={variant === 'warning'}
  class:danger={variant === 'danger'}
>
  <div class="wrapper">
    <div class="icon">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {#if variant === 'danger'}
          <path
            d="M11.988 1A10.994 10.994 0 1 0 12 1h-.012zm4.71 14.29c.186.19.29.445.29.71a1 1 0 0 1-1 1c-.265 0-.52-.104-.71-.29l-3.29-3.29-3.29 3.29c-.19.186-.444.29-.71.29a1 1 0 0 1-1-1c0-.265.104-.52.29-.71l3.29-3.29-3.29-3.29a1.013 1.013 0 0 1-.29-.71 1 1 0 0 1 1-1c.266 0 .52.104.71.29l3.29 3.29 3.29-3.29c.19-.186.444-.29.71-.29a1 1 0 0 1 1 1c0 .266-.104.52-.29.71L13.408 12l3.29 3.29z"
            fill="currentColor"
          />
        {:else if variant === 'success'}
          <path
            d="M11.988 1A10.994 10.994 0 1 0 12 1h-.012zm5.77 7.64-7 8a1.008 1.008 0 0 1-1.48.07l-3-3a1.013 1.013 0 0 1-.29-.71 1 1 0 0 1 1-1c.266 0 .52.104.71.29l2.22 2.23 6.3-7.16a1 1 0 1 1 1.54 1.28z"
            fill="currentColor"
          />
        {:else if variant === 'warning'}
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.544 3.481c-1.13-1.975-3.958-1.975-5.088 0L1.398 17.556C.268 19.53 1.681 22 3.942 22h16.116c2.261 0 3.675-2.47 2.544-4.444L14.544 3.48zM11 8a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0V8zm1 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
            fill="currentColor"
          />
        {:else}
          <path
            d="M12 22.988a10.994 10.994 0 1 0-.012 0H12zm1-6a1 1 0 0 1-2 0v-5a1 1 0 0 1 2 0v5zm-1-11a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
            fill="currentColor"
          />
        {/if}
      </svg>
    </div>
    <span class="hide-visually">
      {iconLabel}
    </span>
    <div class="content">
      {#if headline !== undefined && headline !== ''}
        <h3 class="headline">{headline}</h3>
      {/if}
      <p class="body">{body}</p>
    </div>
  </div>
</div>

<style>
  .base {
    overflow: hidden;
    background-color: var(--cui-bg-elevated);
    border-radius: var(--cui-border-radius-byte);
    transition:
      opacity var(--cui-transitions-slow),
      height var(--cui-transitions-slow),
      visibility var(--cui-transitions-slow);
    will-change: height;
  }
  .wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: var(--cui-spacings-kilo) var(--cui-spacings-mega);
  }
  .icon {
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    align-self: flex-start;
    line-height: 0;
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
  .info {
    border: var(--cui-border-width-mega) solid var(--cui-border-accent);
  }
  .info .icon {
    color: var(--cui-fg-accent);
  }
  .success {
    border: var(--cui-border-width-mega) solid var(--cui-border-success);
  }
  .success .icon {
    color: var(--cui-fg-success);
  }
  .warning {
    border: var(--cui-border-width-mega) solid var(--cui-border-warning);
  }
  .warning .icon {
    color: var(--cui-fg-warning);
  }
  .danger {
    border: var(--cui-border-width-mega) solid var(--cui-border-danger);
  }

  .danger .icon {
    color: var(--cui-fg-danger);
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-right: var(--cui-spacings-peta);
    padding-left: var(--cui-spacings-mega);
  }
  .headline {
    font-size: var(--cui-typography-body-one-font-size);
    line-height: var(--cui-typography-body-one-line-height);
    font-weight: var(--cui-font-weight-bold);
  }
  .body {
    font-weight: var(--cui-font-weight-regular);
    font-size: var(--cui-typography-body-one-font-size);
    line-height: var(--cui-typography-body-one-line-height);
  }
</style>
