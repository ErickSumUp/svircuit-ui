<script context="module" lang="ts">
	function generatePages(totalPages: number, currentPage: number): string[] {
		const pages: string[] = [];
		const distanceToOne = currentPage - 1;
		const distanceToLast = totalPages - currentPage;
		const isCloseToOne = distanceToOne <= 3;
		const isCloseToLast = distanceToLast <= 3;
		const isCloseToBoth = isCloseToOne && isCloseToLast;

		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i += 1) {
				pages.push(i.toString());
			}
			return pages;
		}

		if (totalPages > 5 && !isCloseToBoth) {
			if (isCloseToOne) {
				pages.push('1', '2', '3', '4', '5', '...', totalPages.toString());
			} else if (isCloseToLast) {
				pages.push(
					'1',
					'...',
					(totalPages - 4).toString(),
					String(totalPages - 3),
					String(totalPages - 2),
					String(totalPages - 1),
					totalPages.toString()
				);
			} else {
				pages.push(
					'1',
					'...',
					String(currentPage - 1),
					String(currentPage),
					String(currentPage + 1),
					'...',
					totalPages.toString()
				);
			}
		}

		return pages;
	}
</script>

<script lang="ts">
	import ChevronLeft from '$lib/icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/icons/ChevronRight.svelte';
	import CircleButton from '$lib/CircleButton.svelte';
	import Button from '$lib/Button.svelte';

	export let currentPage = 1;
	export let totalPages = 1;

	$: pages = generatePages(totalPages, currentPage);
</script>

<nav>
	<Button
		disabled={currentPage === 1}
		variant="tertiary"
		size="kilo"
		--cui-spacing-bit="12px"
		--cui-spacing-mega="12px"
		on:click={() => (currentPage -= 1)}
	>
		<ChevronLeft />
	</Button>

	<ol class="pagination-list">
		{#each pages as page}
			{#if page === '...'}
				<CircleButton variant="tertiary">...</CircleButton>
			{:else if page === currentPage.toString()}
				<CircleButton>{page}</CircleButton>
			{:else}
				<CircleButton on:click={() => (currentPage = Number(page))} variant="tertiary"
					>{page}</CircleButton
				>
			{/if}
		{/each}
	</ol>

	<Button
		disabled={currentPage === totalPages}
		variant="tertiary"
		size="kilo"
		--cui-spacing-bit="12px"
		--cui-spacing-mega="12px"
		on:click={() => (currentPage += 1)}
	>
		<ChevronRight />
	</Button>
</nav>

<style>
	nav {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: var(--cui-spacing-kilo);
	}
	.pagination-list {
		list-style: none;
		display: flex;
		justify-content: center;
		padding: 0;
	}
</style>
