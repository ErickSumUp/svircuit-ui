<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  interface Props extends SVGAttributes<SVGSVGElement> {
    size?: '24';
  }

  let { size = '24', ...rest }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...rest}
>
  <path
    fill="currentColor"
    d="M18 7h2v6h-5.586l1.293-1.293a1 1 0 1 0-1.414-1.414l-3 3a1 1 0 0 0 0 1.414l3 3a1 1 0 1 0 1.414-1.414L14.414 15H20v6H4.79a2.8 2.8 0 0 1-1.97-.811A2.77 2.77 0 0 1 2 18.223V5.777c0-.738.296-1.445.82-1.965A2.8 2.8 0 0 1 4.79 3H18zM4.79 5a.8.8 0 0 0-.561.23.77.77 0 0 0 0 1.095c.147.147.349.23.56.23H16V5z"
  />
</svg>
