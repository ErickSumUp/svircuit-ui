<script lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements';

  interface Props extends HTMLImgAttributes {
    /**
     * The source URL of the image. Do not use unauthorized images from
     * external sources.
     */
    src: string;
    /**
     * A text alternative that conveys what the image shows, or what it does
     * when it is a link or a button. Pass an empty string for a purely
     * decorative image. See the
     * [WAI images tutorial](https://www.w3.org/WAI/tutorials/images/).
     */
    alt: string;
    [key: string]: unknown;
  }

  let { src, alt, class: className, ...rest }: Props = $props();
</script>

<img {...rest} {src} {alt} class={['base', className]} />

<style>
  .base {
    display: block;
    width: 100%;
    height: auto;
    max-height: 100%;
  }
</style>
