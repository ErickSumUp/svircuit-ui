<script lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements';

  interface Props extends HTMLImgAttributes {
    /**
     * The image URL. Without it, a placeholder for the variant is shown.
     */
    src?: string;
    /**
     * Describes the image. Pass an empty string if the avatar is decorative,
     * for example next to the name it depicts.
     */
    alt: string;
    /**
     * `object` for products, `business` for companies and merchants, `person`
     * for people. Default: `object`.
     */
    variant?: 'object' | 'business' | 'person';
    /**
     * `s` is 48px, `m` is 96px. Default: `m`.
     */
    size?: 's' | 'm';
    /**
     * One or two letters, usually an abbreviated name, shown instead of the
     * placeholder icon. Only used by the `person` variant.
     */
    initials?: string;
  }

  let {
    src,
    alt,
    variant = 'object',
    size = 'm',
    initials,
    class: className,
    ...rest
  }: Props = $props();

  const classes = $derived(['base', size, variant === 'person' && 'person', className]);
</script>

<!--
  @component
  An image representing an object, person or business, with a placeholder
  when there is no image.
-->
{#if src}
  <img {...rest} {src} {alt} class={classes} />
{:else}
  <div
    {...rest as Record<string, unknown>}
    class={classes}
    role={alt ? 'img' : undefined}
    aria-label={alt || undefined}
    aria-hidden={alt ? undefined : 'true'}
  >
    {#if variant === 'person' && initials}
      {initials.slice(0, 2).toUpperCase()}
    {:else}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {#if variant === 'person'}
          <path
            fill="currentColor"
            d="M15.188 7.723C15.188 5.66 13.53 4 11.5 4S7.813 5.66 7.813 7.723s1.658 3.721 3.687 3.721 3.687-1.659 3.688-3.721m2 0c0 1.82-.847 3.443-2.167 4.492a8.5 8.5 0 0 1 2.492 1.738A8.58 8.58 0 0 1 20 20a1 1 0 1 1-2 0c0-1.74-.687-3.409-1.906-4.638a6.47 6.47 0 0 0-4.594-1.918c-1.722 0-3.374.69-4.594 1.918A6.58 6.58 0 0 0 5 20a1 1 0 1 1-2 0c0-2.267.894-4.442 2.487-6.047a8.5 8.5 0 0 1 2.492-1.738 5.73 5.73 0 0 1-2.166-4.492C5.813 4.569 8.352 2 11.5 2s5.688 2.57 5.688 5.723"
          />
        {:else if variant === 'business'}
          <path
            fill="currentColor"
            d="M12.8 17.333a.77.77 0 0 0-.23-.545.81.81 0 0 0-1.14 0 .77.77 0 0 0-.23.545V19h1.6zm1-6.333a1 1 0 1 1 0 2h-3.6a1 1 0 1 1 0-2zm0-3.556a1 1 0 0 1 0 2h-3.6a1 1 0 1 1 0-2zM20 9.333a.77.77 0 0 0-.23-.545.81.81 0 0 0-.57-.232h-.8V19h.8a.81.81 0 0 0 .57-.232.77.77 0 0 0 .23-.545zm-16 8.89c0 .202.081.398.23.545s.354.232.57.232h.8v-7.777h-.8a.8.8 0 0 0-.57.231A.77.77 0 0 0 4 12zM16.4 5.777a.77.77 0 0 0-.23-.545A.8.8 0 0 0 15.6 5H8.4a.8.8 0 0 0-.57.232.77.77 0 0 0-.23.545V19h1.6v-1.667c0-.74.298-1.448.824-1.968a2.81 2.81 0 0 1 3.952 0c.526.52.824 1.228.824 1.968V19h1.6zm2 .779h.8c.739 0 1.45.29 1.976.81S22 8.592 22 9.332v8.89c0 .74-.298 1.448-.824 1.967S19.939 21 19.2 21H4.8c-.739 0-1.45-.29-1.976-.81A2.77 2.77 0 0 1 2 18.223V12c0-.74.298-1.449.824-1.969A2.8 2.8 0 0 1 4.8 9.223h.8V5.777c0-.74.298-1.448.825-1.967A2.8 2.8 0 0 1 8.4 3h7.2c.738 0 1.45.29 1.975.81.527.52.825 1.227.825 1.967z"
          />
        {:else}
          <path
            fill="currentColor"
            d="m19 15.081-2.45-2.45a.777.777 0 0 0-1.043-.052l-.057.052L9.081 19h9.142c.429 0 .777-.348.777-.777zm-8.889-5.748a.778.778 0 1 0-1.556.001.778.778 0 0 0 1.556-.001M19 5.777A.78.78 0 0 0 18.223 5H5.777A.78.78 0 0 0 5 5.777v12.446c0 .429.348.777.777.777h.476l7.783-7.783a2.78 2.78 0 0 1 3.928 0L19 12.253zm-6.889 3.556a2.779 2.779 0 1 1-5.557 0 2.779 2.779 0 0 1 5.557 0M21 18.223A2.78 2.78 0 0 1 18.223 21H5.777A2.78 2.78 0 0 1 3 18.223V5.777A2.78 2.78 0 0 1 5.777 3h12.446A2.78 2.78 0 0 1 21 5.777z"
          />
        {/if}
      </svg>
    {/if}
  </div>
{/if}

<style>
  .base {
    background-color: var(--cui-bg-subtle);
    box-shadow: 0 0 0 var(--cui-border-width-kilo) var(--cui-border-subtle);
  }

  img.base {
    display: block;
    object-fit: cover;
    object-position: center;
  }

  div.base {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--cui-font-weight-bold);
    color: var(--cui-fg-placeholder);
    user-select: none;
  }

  .s {
    width: 48px;
    height: 48px;
    border-radius: var(--cui-border-radius-byte);
  }

  div.s {
    font-size: 24px;
  }

  .m {
    width: 96px;
    height: 96px;
    border-radius: var(--cui-border-radius-kilo);
  }

  div.m {
    font-size: 48px;
  }

  .person {
    border-radius: var(--cui-border-radius-circle);
  }
</style>
