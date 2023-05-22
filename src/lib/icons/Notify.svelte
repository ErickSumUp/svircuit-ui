<script lang='ts'>
	export let size: '16' | '24' = '16';
</script>

{#if size === '16'}
	<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path fill-rule='evenodd' clip-rule='evenodd'
					d='M10.534 1.5c-1.126-2-3.942-2-5.069 0l-5.069 9C-.73 12.5.678 15 2.931 15h10.138c2.253 0 3.661-2.5 2.534-4.5l-5.069-9zm-3.229 8.687a1.25 1.25 0 1 1 1.39 2.08 1.25 1.25 0 0 1-1.39-2.08zM7.293 4.27A1 1 0 0 1 9 4.977v3a1 1 0 0 1-2 0v-3a1 1 0 0 1 .293-.708z'
					fill='currentColor' />
	</svg>
{:else}
	<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path fill-rule='evenodd' clip-rule='evenodd'
					d='M14.544 3.481c-1.13-1.975-3.958-1.975-5.088 0L1.398 17.556C.268 19.53 1.681 22 3.942 22h16.116c2.261 0 3.675-2.47 2.544-4.444L14.544 3.48zM11 8a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0V8zm1 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z'
					fill='currentColor' />
	</svg>
{/if}
