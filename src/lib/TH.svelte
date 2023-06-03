<script lang="ts">
	let fixed = true;
	export let align: 'left' | 'right' | 'center' = 'left';
	export let condensed = false;
</script>

<th
	class:fixed
	class:align-left={align === 'left'}
	class:align-right={align === 'right'}
	class:align-center={align === 'center'}
	class:condensed
>
	<slot />
</th>

<style>
	th {
		background-color: #ffffff;
		border-bottom: 1px solid #cccccc;
		text-align: left;
		transition: background-color 120ms ease-in-out, color 120ms ease-in-out;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--cui-fg-subtle);
		font-weight: var(--cui-font-weight-bold);
		padding: var(--cui-spacing-byte) var(--cui-spacing-giga);
		vertical-align: middle;
		white-space: nowrap;
	}
	@media (max-width: 767px) {
		th {
			left: 0;
			position: sticky;
			width: 145px;
			overflow-wrap: break-word;
			z-index: 1;
		}
		th:after {
			content: '';
			background: linear-gradient(90deg, rgba(0, 0, 0, 0.12), rgba(255, 255, 255, 0));
			height: 100%;
			position: absolute;
			top: 0;
			left: 100%;
			width: 6px;
		}
	}
	.align-left {
		text-align: left;
	}
	.align-right {
		text-align: right;
	}
	.align-center {
		text-align: center;
	}
	.condensed {
		font-size: var(--cui-ty-body-font-size-two);
		line-height: var(--cui-ty-body-line-height-two);
		vertical-align: middle;
		padding: var(--cui-spacing-byte) var(--cui-spacing-mega) var(--cui-spacing-byte)
			var(--cui-spacing-giga);
	}
</style>
