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
      d="M15 8c0 .5-.4 1-1 1H9v5c0 .5-.4 1-1 1s-1-.5-1-1V9H2c-.5 0-1-.5-1-1s.5-1 1-1h5V2c0-.5.4-1 1-1s1 .5 1 1v5h5c.6 0 1 .5 1 1z"
      fill="currentColor"
    />
  {:else}
    <path
      d="M22 12c0 .5-.4 1-1 1h-8v8c0 .5-.4 1-1 1s-1-.5-1-1v-8H3c-.5 0-1-.5-1-1s.5-1 1-1h8V3c0-.5.4-1 1-1s1 .5 1 1v8h8c.6 0 1 .5 1 1z"
      fill="currentColor"
    />
  {/if}
</svg>
