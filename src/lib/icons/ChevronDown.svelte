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
      d="M8 11c-.266 0-.52-.104-.71-.29l-4-4A1.013 1.013 0 0 1 3 6a1 1 0 0 1 1-1c.266 0 .52.104.71.29L8 8.58l3.29-3.29c.19-.186.445-.29.71-.29a1 1 0 0 1 1 1c0 .266-.104.52-.29.71l-4 4c-.19.186-.444.29-.71.29z"
      fill="currentColor"
    />
  {:else}
    <path
      d="M12 15c-.265 0-.52-.104-.71-.29l-4-4A1.013 1.013 0 0 1 7 10a1 1 0 0 1 1-1c.266 0 .52.104.71.29L12 12.58l3.29-3.29c.19-.186.445-.29.71-.29a1 1 0 0 1 1 1c0 .265-.104.52-.29.71l-4 4c-.19.186-.445.29-.71.29z"
      fill="currentColor"
    />
  {/if}
</svg>
