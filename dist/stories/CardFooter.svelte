<script>
  export let align = 'right';
</script>

<div class="base" class:left={align === 'left'} class:right={align === 'right'} {...$$restProps}>
  <slot />
</div>

<style>
  .base {
    display: block;
    width: 100%;
    margin-top: var(--cui-spacings-giga);
  }

  @media (min-width: 480px) {
    .base {
      display: flex;
      margin-top: var(--cui-spacings-mega);
    }
  }

  /* Alignment */

  @media (min-width: 480px) {
    .left {
      justify-content: flex-start;
    }
  }

  @media (min-width: 480px) {
    .right {
      justify-content: flex-end;
    }
  }
</style>
