<script context="module">
  /**
   * Generates the page numbers based on the current page and the total number of pages
   * @param totalPages
   * @param currentPage
   * @returns {string[]}
   */
  function generatePages(totalPages, currentPage) {
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
</script>

<script>
  import ChevronLeft from '$lib/icons/ChevronLeft.svelte';
  import ChevronRight from '$lib/icons/ChevronRight.svelte';
  import Button from '$lib/components/Button.svelte';

  /**
   * The currently active page
   * @type {number}
   */
  export let currentPage = 1;
  /**
   * The total number of pages
   * @type {number}
   */
  export let totalPages = 1;
  /**
   * Label to describe the type of navigation, e.g. "Pagination"
   * @type {string}
   */
  export let ariaLabel = 'Pagination';
  /**
   * Label for the previous button
   * @type {string}
   */
  export let previousLabel = 'Previous page';
  /**
   * Label for the previous button
   * @type {string}
   */
  export let nextLabel = 'Next page';
  /**
   * Label for the page buttons
   * @type {(page: number) => string}
   */
  export let pageLabel = (page) => 'Go to page ' + page;

  $: pages = generatePages(totalPages, currentPage);
</script>

<nav class="nav" aria-label={ariaLabel} {...$$restProps}>
  <Button
    disabled={currentPage === 1}
    variant="secondary"
    size="s"
    hideLabel={true}
    aria-label={previousLabel}
    on:click={() => (currentPage -= 1)}
  >
    <ChevronLeft slot="leading-icon" />
  </Button>

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
            on:click={() => (currentPage = Number(page))}>{page}</Button
          >
        {/if}
      </li>
    {/each}
  </ol>

  <Button
    disabled={currentPage >= totalPages}
    variant="secondary"
    size="s"
    hideLabel={true}
    aria-label={nextLabel}
    on:click={() => (currentPage += 1)}
  >
    <ChevronRight slot="trailing-icon" />
  </Button>
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
