<script lang="ts">
</script>

<tbody>
  <slot />
</tbody>

<style>
  :global(tbody, tbody :last-child th,
  tbody :last-child td) {
    border-bottom: none;
  }
  tbody {
    cursor: pointer;
    position: relative;
  }
  tbody:focus {
    z-index: 1;
    transform: translate(0, 0);
    outline: 0;
    box-shadow: inset 0 0 0 4px var(--cui-border-focus);
  }
  tbody::-moz-focus-inner {
    border: 0;
  }
  tbody:focus:not(:focus-visible) {
    box-shadow: none;
  }
</style>