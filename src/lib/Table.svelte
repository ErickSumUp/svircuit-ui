<script lang="ts">
	export let borderCollapse = false;
	export let isScrollable = false;
</script>

<div class="table-container" class:table-container--scrollable={isScrollable}>
	<div class="scroll-container" class:scroll-container--scrollable={isScrollable}>
		<table class:border-collapse={borderCollapse}>
			<slot />
		</table>
	</div>
</div>

<style>
	.table-container {
		position: relative;
		border: 1px solid #cccccc;
	}
	.table-container--scrollable {
		height: 100%;
	}
	table {
		background-color: #ffffff;
		border-collapse: separate;
		width: 100%;
	}
	.border-collapse {
		border-collapse: collapse;
	}
	.scroll-container {
		border-radius: 4px;
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
