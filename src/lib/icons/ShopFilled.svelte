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
      d="M5.44 12.2a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6m6.72 0a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6M3.05 1.25c.354 0 .66.247.734.593l.547 2.557h9.719a.75.75 0 0 1 .733.913l-1.023 4.606a1.887 1.887 0 0 1-1.841 1.481H5.87a1.887 1.887 0 0 1-1.833-1.333l-.041-.159L2.465 2.75H1.1v-1.5z"
    />
  {:else}
    <path
      fill="currentColor"
      d="M8.154 18.416a1.834 1.834 0 1 1-.002 3.668 1.834 1.834 0 0 1 .002-3.668m10.083 0a1.834 1.834 0 1 1-.001 3.668 1.834 1.834 0 0 1 .001-3.668M4.533 2c.472 0 .88.33.979.791l.811 3.792H21.07a1.002 1.002 0 0 1 .977 1.217l-1.513 6.811a2.83 2.83 0 0 1-2.762 2.222H8.806v-.001a2.83 2.83 0 0 1-2.75-1.999l-.062-.238-1.456-6.796-.005-.025L3.725 4H1.7V2z"
    />
  {/if}
</svg>
