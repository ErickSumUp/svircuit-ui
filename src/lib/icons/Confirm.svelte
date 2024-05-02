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
      d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.78 6.62-4 5a.993.993 0 0 1-.72.38H7a1 1 0 0 1-.71-.29l-2-2a1.004 1.004 0 0 1 1.42-1.42L6.92 9.5l3.3-4.12a1 1 0 1 1 1.56 1.24z"
      fill="currentColor"
    />
  {:else}
    <path
      d="M11.988 1A10.994 10.994 0 1 0 12 1h-.012zm5.77 7.64-7 8a1.008 1.008 0 0 1-1.48.07l-3-3a1.013 1.013 0 0 1-.29-.71 1 1 0 0 1 1-1c.266 0 .52.104.71.29l2.22 2.23 6.3-7.16a1 1 0 1 1 1.54 1.28z"
      fill="currentColor"
    />
  {/if}
</svg>
