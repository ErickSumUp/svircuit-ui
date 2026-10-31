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
      d="M8.8 10.75v2.75a1.25 1.25 0 0 0 1.25 1.25h1.7A1.25 1.25 0 0 0 13 13.5V6.875l.85.635.9-1.2-6.35-4.76Q8 1.25 7.6 1.55L1.25 6.31l.9 1.2.85-.635V13.5a1.25 1.25 0 0 0 1.25 1.25h1.7a1.25 1.25 0 0 0 1.25-1.25v-2.75z"
    />
  {:else}
    <path
      fill="currentColor"
      d="M11.528 2.118a1 1 0 0 1 1.06.073l6.5 4.733.008.005.008.006 3 2.267-1.207 1.596L19.5 9.74V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4h-3v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-9.92l-1.375 1.1-1.25-1.56 3-2.401.016-.012 6.5-5z"
    />
  {/if}
</svg>
