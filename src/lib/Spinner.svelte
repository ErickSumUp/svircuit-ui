<script lang="ts">
  export let size: 'byte' | 'kilo' | 'giga' = 'kilo';
</script>

<span
  class="spinner"
  class:byte={size === 'byte'}
  class:kilo={size === 'kilo'}
  class:giga={size === 'giga'}
></span>

<style>
  .spinner {
    color: var(--cui-fg-accent);
    display: block;
    border-radius: var(--cui-border-radius-circle);
    border: var(--cui-border-width-mega) solid currentColor;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
    transform-origin: 50% 50%;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .byte {
    width: var(--cui-icon-size-mega);
    height: var(--cui-icon-size-mega);
  }
  .kilo {
    width: var(--cui-icon-size-giga);
    height: var(--cui-icon-size-giga);
  }
  .giga {
    width: var(--cui-icon-size-tera);
    height: var(--cui-icon-size-tera);
  }
</style>
