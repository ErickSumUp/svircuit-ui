<script lang="ts">
  /**
   * Choose from size variants.
   * @type {('s' | 'm' | 'l' | 'xl')}
   */
  export let size: 's' | 'm' | 'l' | 'xl' = 'm';
</script>

<div class="spacer spacer-{size}" />

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
