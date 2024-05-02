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
      d="M8 5c.266 0 .52.104.71.29l4 4c.186.19.29.444.29.71a1 1 0 0 1-1 1c-.265 0-.52-.104-.71-.29L8 7.42l-3.29 3.29c-.19.186-.444.29-.71.29a1 1 0 0 1-1-1c0-.266.104-.52.29-.71l4-4C7.48 5.104 7.734 5 8 5z"
      fill="currentColor"
    />
  {:else}
    <path
      d="M12 9c.265 0 .52.104.71.29l4 4c.186.19.29.445.29.71a1 1 0 0 1-1 1c-.265 0-.52-.104-.71-.29L12 11.42l-3.29 3.29c-.19.186-.444.29-.71.29a1 1 0 0 1-1-1c0-.265.104-.52.29-.71l4-4c.19-.186.445-.29.71-.29z"
      fill="currentColor"
    />
  {/if}
</svg>
