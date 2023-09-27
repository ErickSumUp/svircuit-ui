<script lang="ts">
	export let align: 'left' | 'center' | 'right' = 'left';
	export let condensed = false;
</script>

<td
	class:align-left={align === 'left'}
	class:align-center={align === 'center'}
	class:align-right={align === 'right'}
	class:condensed
>
	<slot />
</td>

<style>
	td {
		text-align: left;
		background-color: var(--cui-bg-normal);
		border-bottom: 1px solid var(--cui-border-normal);
		padding: var(--cui-spacings-giga);
		transition: background-color var(--cui-transitions-default);
		vertical-align: middle;
		overflow-wrap: break-word;
	}
	td:hover {
		background-color: var(--cui-bg-normal-hovered);
	}
	.align-left {
		text-align: left;
	}
	.align-center {
		text-align: center;
	}
	.align-right {
		text-align: right;
	}
	.condensed {
		padding: var(--cui-spacings-kilo) var(--cui-spacings-mega) var(--cui-spacings-kilo)
			var(--cui-spacings-giga);
		font-size: var(--cui-typography-body-two-font-size);
		line-height: var(--cui-typography-body-two-line-height);
	}
</style>
