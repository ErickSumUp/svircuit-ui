<script lang="ts">
  import type { HTMLTableAttributes } from 'svelte/elements';

	interface Props extends HTMLTableAttributes {
		borderCollapse?: boolean;
		isScrollable?: boolean;
		noShadow?: boolean;
	}

	let { borderCollapse, isScrollable, noShadow, children, ...rest }: Props = $props();
</script>

<div
  class="table-container"
  class:table-container--scrollable={isScrollable}
  class:border={!noShadow}
>
  <div class="scroll-container" class:scroll-container--scrollable={isScrollable}>
    <table class:border-collapse={borderCollapse} {...rest}>
			{@render children()}
    </table>
  </div>
</div>

<style>
  .table-container {
    position: relative;
  }
  .border {
    border: var(--cui-border-width-kilo) solid var(--cui-border-divider);
  }
  .table-container--scrollable {
    height: 100%;
  }
  table {
    background-color: var(--cui-bg-normal);
    border-collapse: separate;
    width: 100%;
  }
  .border-collapse {
    border-collapse: collapse;
  }
  .scroll-container {
    border-radius: var(--cui-spacings-bit);
  }
  @media (min-width: 767px) {
    .scroll-container {
      height: unset;
      overflow-x: auto;
    }
  }
  .scroll-container--scrollable {
    overflow-y: auto;
  }
</style>
