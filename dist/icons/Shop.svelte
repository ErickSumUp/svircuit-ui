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
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7 23a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm14-3a3 3 0 1 0-5.999 0A3 3 0 0 0 21 20zm0-16H5.114a2 2 0 0 1-1.921-1.445L2.92 1.61a1 1 0 0 0-1.9.59l3.24 11.35A2 2 0 0 0 6.18 15H19a2 2 0 0 0 1.92-1.45l2-7c.052-.179.08-.364.08-.55a2.006 2.006 0 0 0-2-2z"
      fill="currentColor"
    />
  {:else}
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7 23a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm14-3a3 3 0 1 0-5.999 0A3 3 0 0 0 21 20zm0-16H5.114a2 2 0 0 1-1.921-1.445L2.92 1.61a1 1 0 0 0-1.9.59l3.24 11.35A2 2 0 0 0 6.18 15H19a2 2 0 0 0 1.92-1.45l2-7c.052-.179.08-.364.08-.55a2.006 2.006 0 0 0-2-2z"
      fill="currentColor"
    />
  {/if}
</svg>
