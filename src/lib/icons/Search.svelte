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
      d="M2 7a5 5 0 1110 0A5 5 0 012 7zm5-7a7 7 0 104.192 12.606l3.1 3.101a1 1 0 001.415-1.414l-3.1-3.1A7 7 0 007 0z"
      fill="currentColor"
    />
  {:else}
    <path
      d="M11 18a7 7 0 100-14 7 7 0 000 14zm10 3l-4.35-4.35"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  {/if}
</svg>
