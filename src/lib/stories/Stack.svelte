<script lang="ts">
  export let vertical: boolean = false;
</script>

<div class="base" class:vertical>
  <slot />
</div>

<style>
  .base {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
  }

  @media screen and (min-width: 600px) {
    .base {
      flex-direction: row;
    }
  }

  @media screen and (min-width: 600px) {
    .vertical {
      flex-direction: column;
    }
  }
</style>
