<script lang="ts">
</script>

<tr on:click>
	<slot />
</tr>

<style>
	tr {
		vertical-align: middle;
	}
	tr:hover {
		background-color: var(--cui-bg-normal-hovered);
		color: var(--cui-fg-accent-hovered);
	}
</style>
