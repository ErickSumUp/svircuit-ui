<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  interface Props extends SVGAttributes<SVGSVGElement> {
    size?: '16' | '24';
  }

  let { size = '24', ...rest }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 {size} {size}"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...rest}
>
  {#if size === '16'}
    <path
      fill="currentColor"
      d="M13.897 14.5a.75.75 0 0 1-.75.75H2.823a.75.75 0 0 1-.75-.75V13c0-.99.387-1.943 1.079-2.648A3.675 3.675 0 0 1 5.773 9.25h4.424a3.675 3.675 0 0 1 2.621 1.103A3.78 3.78 0 0 1 13.897 13zm-2.312-10.15a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0"
    />
  {:else}
    <path
      fill="currentColor"
      d="M19.965 21a1 1 0 0 1-1 1H5.2a1 1 0 0 1-1-1v-2c0-1.32.516-2.59 1.438-3.53A4.9 4.9 0 0 1 9.133 14h5.899a4.9 4.9 0 0 1 3.494 1.47A5.04 5.04 0 0 1 19.965 19zm-2.95-14c0 2.745-2.192 5-4.932 5S7.149 9.745 7.149 7s2.194-5 4.934-5 4.932 2.255 4.932 5"
    />
  {/if}
</svg>
