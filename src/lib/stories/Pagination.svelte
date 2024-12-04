<script lang="ts">
  import ChevronLeft from '$lib/icons/ChevronLeft.svelte';
  import ChevronRight from '$lib/icons/ChevronRight.svelte';
  import Button from '$lib/components/Button.svelte';

  function generatePages(totalPages: number, currentPage: number): string[] {
    const pages = [];
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

  interface Props {
    /**
     * The currently active page
     */
    currentPage?: number;
    /**
     * The total number of pages
     */
    totalPages?: number;
    /**
     * Label to describe the type of navigation, e.g. "Pagination"
     */
    ariaLabel?: string;
    /**
     * Label for the previous button
     */
    previousLabel?: string;
    /**
     * Label for the previous button
     */
    nextLabel?: string;
    /**
     * Label for the page buttons
     */
    pageLabel?: (page: number) => string;
  }

  let {
    currentPage = $bindable(1),
    totalPages = $bindable(1),
    ariaLabel = 'Pagination',
    previousLabel = 'Previous page',
    nextLabel = 'Next page',
    pageLabel = (page) => 'Go to page ' + page,
    ...rest
  }: Props = $props();

  let pages = $derived.by(() => generatePages(totalPages, currentPage));
</script>

<nav class="nav" aria-label={ariaLabel} {...rest}>
  {#snippet chevronLeft()}
    <ChevronLeft />
  {/snippet}

  <Button
    disabled={currentPage === 1}
    variant="secondary"
    size="s"
    hideLabel={true}
    aria-label={previousLabel}
    leading_icon={chevronLeft}
    onclick={() => (currentPage -= 1)}>{previousLabel}</Button
  >

  <ol class="pagination-list">
    {#each pages as page}
      <li>
        {#if page === '...'}
          <Button size="s" variant="tertiary" role="link" compress={true}>...</Button>
        {:else if page === currentPage.toString()}
          <Button size="s" variant="primary" role="link" compress={true}>{page}</Button>
        {:else}
          <Button
            size="s"
            variant="tertiary"
            role="link"
            compress={true}
            aria-label={pageLabel(Number(page))}
            onclick={() => (currentPage = Number(page))}>{page}</Button
          >
        {/if}
      </li>
    {/each}
  </ol>

  {#snippet chevronRight()}
    <ChevronRight />
  {/snippet}
  <Button
    disabled={currentPage >= totalPages}
    variant="secondary"
    size="s"
    hideLabel={true}
    aria-label={nextLabel}
    trailing_icon={chevronRight}
    onclick={() => (currentPage += 1)}>{nextLabel}</Button
  >
</nav>

<style>
  nav {
    display: flex;
    gap: var(--cui-spacings-kilo);
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: var(--cui-spacings-kilo);
  }
  .pagination-list {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
  }
</style>
