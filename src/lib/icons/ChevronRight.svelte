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
      d="M11 8c0 .266-.104.52-.29.71l-4 4c-.19.186-.444.29-.71.29a1 1 0 0 1-1-1c0-.265.104-.52.29-.71L8.58 8 5.29 4.71A1.013 1.013 0 0 1 5 4a1 1 0 0 1 1-1c.266 0 .52.104.71.29l4 4c.186.19.29.444.29.71z"
      fill="currentColor"
    />
  {:else}
    <path
      d="M15 12c0 .265-.104.52-.29.71l-4 4c-.19.186-.445.29-.71.29a1 1 0 0 1-1-1c0-.265.104-.52.29-.71L12.58 12 9.29 8.71A1.013 1.013 0 0 1 9 8a1 1 0 0 1 1-1c.265 0 .52.104.71.29l4 4c.186.19.29.445.29.71z"
      fill="currentColor"
    />
  {/if}
</svg>
