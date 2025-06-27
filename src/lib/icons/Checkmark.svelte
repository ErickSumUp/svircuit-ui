<script lang="ts">
  interface Props {
    size?: 16 | 24;
    [key: string]: unknown;
  }

  let { size = 24, ...rest }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 {size}  {size}"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...rest}
>
  {#if size === 16}
    <path
      d="M5.992 14.5a.992.992 0 0 1-.707-.293l-5-5A1 1 0 0 1 1.7 7.794L5.909 12l8.308-10.125a1.001 1.001 0 1 1 1.563 1.251l-9.006 11a1 1 0 0 1-.726.375l-.056-.001z"
      fill="currentColor"
    />
  {:else}
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M22.1247 3.21917C22.556 3.56418 22.6259 4.19347 22.2809 4.62473L10.2809 19.6247C10.1032 19.8468 9.83931 19.9828 9.5553 19.9985C9.27129 20.0142 8.99402 19.9083 8.79289 19.7071L2.29289 13.2071C1.90237 12.8166 1.90237 12.1835 2.29289 11.7929C2.68342 11.4024 3.31658 11.4024 3.70711 11.7929L9.41708 17.5029L20.7191 3.37534C21.0641 2.94408 21.6934 2.87416 22.1247 3.21917Z"
      fill="currentColor"
    />
  {/if}
</svg>
