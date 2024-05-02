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
      d="M20 1H4a3 3 0 0 0-3 3v18a1 1 0 0 0 1 1c.266 0 .52-.104.71-.29L8.41 17H20a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3zM7 10.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
      fill="currentColor"
    />
  {:else}
    <path
      d="M20 1H4a3 3 0 0 0-3 3v18a1 1 0 0 0 1 1c.266 0 .52-.104.71-.29L8.41 17H20a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3zM7 10.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
      fill="currentColor"
    />
  {/if}
</svg>
