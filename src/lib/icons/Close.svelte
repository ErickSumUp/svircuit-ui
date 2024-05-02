<script lang="ts">
  export let size: '16' | '24' = '16';
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 {size} {size}"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...$$restProps}
>
  {#if size === '16'}
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
      fill="currentColor"
    />
  {:else}
    <path
      d="M20.71 19.29c.186.19.29.445.29.71a1 1 0 0 1-1 1c-.265 0-.52-.104-.71-.29L12 13.42l-7.29 7.29c-.19.186-.444.29-.71.29a1 1 0 0 1-1-1c0-.265.104-.52.29-.71L10.58 12 3.29 4.71A1.014 1.014 0 0 1 3 4a1 1 0 0 1 1-1c.266 0 .52.104.71.29L12 10.58l7.29-7.29c.19-.186.445-.29.71-.29a1 1 0 0 1 1 1c0 .266-.104.52-.29.71L13.42 12l7.29 7.29z"
      fill="currentColor"
    />
  {/if}
</svg>
