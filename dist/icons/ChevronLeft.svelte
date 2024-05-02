<script>
  export let size = '16';
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
      d="M5 8c0-.266.104-.52.29-.71l4-4c.19-.186.444-.29.71-.29a1 1 0 0 1 1 1c0 .266-.104.52-.29.71L7.42 8l3.29 3.29c.186.19.29.445.29.71a1 1 0 0 1-1 1c-.266 0-.52-.104-.71-.29l-4-4A1.013 1.013 0 0 1 5 8z"
      fill="currentColor"
    />
  {:else}
    <path
      d="M9 12c0-.265.104-.52.29-.71l4-4c.19-.186.445-.29.71-.29a1 1 0 0 1 1 1c0 .266-.104.52-.29.71L11.42 12l3.29 3.29c.186.19.29.445.29.71a1 1 0 0 1-1 1c-.265 0-.52-.104-.71-.29l-4-4A1.013 1.013 0 0 1 9 12z"
      fill="currentColor"
    />
  {/if}
</svg>
