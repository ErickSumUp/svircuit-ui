<script lang="ts">
  interface Props {
    /**
     * Choose from size variants.
     */
    size?: 's' | 'm' | 'l' | 'xl';
  }

  let { size = 'm', ...rest }: Props = $props();
</script>

<div class="spacer spacer-{size}" {...rest}></div>

<style>
  .spacer {
    width: 100%;
  }
  .spacer-s {
    height: var(--cui-spacings-byte);
  }
  .spacer-m {
    height: var(--cui-spacings-mega);
  }
  .spacer-l {
    height: var(--cui-spacings-tera);
  }
  .spacer-xl {
    height: var(--cui-spacings-zetta);
  }
</style>
