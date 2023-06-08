<script lang="ts">
	export let size: '16' | '24' = '16';
</script>

{#if size === '16'}
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M5 8c0-.266.104-.52.29-.71l4-4c.19-.186.444-.29.71-.29a1 1 0 0 1 1 1c0 .266-.104.52-.29.71L7.42 8l3.29 3.29c.186.19.29.445.29.71a1 1 0 0 1-1 1c-.266 0-.52-.104-.71-.29l-4-4A1.013 1.013 0 0 1 5 8z"
			fill="currentColor"
		/>
	</svg>
{:else}
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M9 12c0-.265.104-.52.29-.71l4-4c.19-.186.445-.29.71-.29a1 1 0 0 1 1 1c0 .266-.104.52-.29.71L11.42 12l3.29 3.29c.186.19.29.445.29.71a1 1 0 0 1-1 1c-.265 0-.52-.104-.71-.29l-4-4A1.013 1.013 0 0 1 9 12z"
			fill="currentColor"
		/>
	</svg>
{/if}
