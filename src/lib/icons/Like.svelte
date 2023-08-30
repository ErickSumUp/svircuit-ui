<script lang="ts">
	export let size: '16' | '24' = '16';
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 {size} {size}"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	{#if size === '16'}
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="m21.3 14-7.15 7.15a2.9 2.9 0 0 1-4.1 0L2.9 14a6.502 6.502 0 0 1 9.2-9.19A6.502 6.502 0 0 1 21.3 14z"
			fill="currentColor"
		/>
	{:else}
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="m21.3 14-7.15 7.15a2.9 2.9 0 0 1-4.1 0L2.9 14a6.502 6.502 0 0 1 9.2-9.19A6.502 6.502 0 0 1 21.3 14z"
			fill="currentColor"
		/>
	{/if}
</svg>
