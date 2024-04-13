<script lang="ts">
	export let size: '16' | '24' = '16';
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 {size} {size}"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	{...$$restProps}
>
	{#if size === '16'}
		<path
			d="M8 16A8 8 0 1 0 8-.001 8 8 0 0 0 8 16zm1-5a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v3zM8 3.5A1.25 1.25 0 1 1 8 6a1.25 1.25 0 0 1 0-2.5z"
			fill="currentColor"
		/>
	{:else}
		<path
			d="M12 22.988a10.994 10.994 0 1 0-.012 0H12zm1-6a1 1 0 0 1-2 0v-5a1 1 0 0 1 2 0v5zm-1-11a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
			fill="currentColor"
		/>
	{/if}
</svg>
