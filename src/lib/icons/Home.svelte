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
      d="M23 9a1 1 0 0 1-1.57.82l-1.43-1V20.5a2.5 2.5 0 0 1-2.5 2.5H15a1 1 0 0 1-1-1v-5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v5a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 20.5V8.82l-1.43 1A1.011 1.011 0 0 1 2 10a1 1 0 0 1-.57-1.82l10-7a.992.992 0 0 1 1.14 0l10 7A.999.999 0 0 1 23 9z"
      fill="currentColor"
    />
  {:else}
    <path
      d="M23 9a1 1 0 0 1-1.57.82l-1.43-1V20.5a2.5 2.5 0 0 1-2.5 2.5H15a1 1 0 0 1-1-1v-5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v5a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 20.5V8.82l-1.43 1A1.011 1.011 0 0 1 2 10a1 1 0 0 1-.57-1.82l10-7a.992.992 0 0 1 1.14 0l10 7A.999.999 0 0 1 23 9z"
      fill="currentColor"
    />
  {/if}
</svg>
