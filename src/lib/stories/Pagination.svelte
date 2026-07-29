<script lang="ts" module>
  /** The gap between two page numbers, rendered as an ellipsis. */
  export const GAP = 'gap';

  export type PageItem = number | typeof GAP;

  /**
   * The number of slots in the list. Seven fits the first page, a gap, three
   * pages around the current one, another gap and the last page.
   */
  const SLOTS = 7;

  /**
   * The list never grows beyond seven items, whether there are eight pages or
   * eight thousand.
   */
  export function getPages(totalPages: number, currentPage: number): PageItem[] {
    if (totalPages <= SLOTS) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const page = Math.min(Math.max(currentPage, 1), totalPages);

    if (page <= 4) {
      return [1, 2, 3, 4, 5, GAP, totalPages];
    }

    if (page >= totalPages - 3) {
      return [1, GAP, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, GAP, page - 1, page, page + 1, GAP, totalPages];
  }
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import Button from '$lib/components/Button.svelte';
  import ChevronLeft from '$lib/icons/ChevronLeft.svelte';
  import ChevronRight from '$lib/icons/ChevronRight.svelte';

  interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * The currently active page. Default: 1.
     */
    currentPage?: number;
    /**
     * The total number of pages. Nothing is rendered below two.
     */
    totalPages: number;
    /**
     * Called with the page the user navigated to.
     */
    onChange: (page: number) => void;
    /**
     * Describes the type of navigation, for example `Pagination`.
     */
    label: string;
    /**
     * Label for the "previous page" button, for example `Previous page`.
     */
    previousLabel?: string;
    /**
     * Label for the "next page" button, for example `Next page`.
     */
    nextLabel?: string;
    /**
     * Returns the label of a page button, called with the page number, for
     * example `Go to page 9`.
     */
    pageLabel?: (page: number) => string;
    [key: string]: unknown;
  }

  let {
    currentPage = 1,
    totalPages,
    onChange,
    label,
    previousLabel = 'Previous page',
    nextLabel = 'Next page',
    pageLabel = (page: number) => `Go to page ${page}`,
    ...rest
  }: Props = $props();

  const pages = $derived(getPages(totalPages, currentPage));
</script>

{#snippet chevronLeft()}
  <ChevronLeft />
{/snippet}

{#snippet chevronRight()}
  <ChevronRight />
{/snippet}

{#if totalPages >= 2}
  <nav class="base" aria-label={label} {...rest}>
    <div class="prev">
      <Button
        size="s"
        variant="secondary"
        hideLabel
        disabled={currentPage <= 1}
        leading_icon={chevronLeft}
        onclick={() => onChange(currentPage - 1)}
      >
        {previousLabel}
      </Button>
    </div>

    <ol class="list">
      {#each pages as page, index (index)}
        <li>
          {#if page === GAP}
            <!-- The gap is decoration: the page buttons around it already tell
                 a screen reader where it is in the list. -->
            <span class="gap" aria-hidden="true">…</span>
          {:else}
            {@const isCurrent = page === currentPage}
            <Button
              class="page"
              size="s"
              variant={isCurrent ? 'primary' : 'tertiary'}
              title={pageLabel(page)}
              aria-label={pageLabel(page)}
              aria-current={isCurrent ? 'page' : undefined}
              onclick={() => onChange(page)}
            >
              {page}
            </Button>
          {/if}
        </li>
      {/each}
    </ol>

    <div class="next">
      <Button
        size="s"
        variant="secondary"
        hideLabel
        disabled={currentPage >= totalPages}
        leading_icon={chevronRight}
        onclick={() => onChange(currentPage + 1)}
      >
        {nextLabel}
      </Button>
    </div>
  </nav>
{/if}

<style>
  .base {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: var(--cui-spacings-kilo);
  }

  /* The chevrons keep their size when the list of pages grows. */
  .prev {
    flex-shrink: 0;
    margin-right: var(--cui-spacings-kilo);
  }

  .next {
    flex-shrink: 0;
    margin-left: var(--cui-spacings-kilo);
  }

  .list {
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  /* The page buttons come from the Button component, so they carry its scope
     rather than this one. */
  .list :global(.page) {
    padding: var(--cui-spacings-bit);
    margin-right: var(--cui-spacings-bit);
  }

  .list li:last-child :global(.page) {
    margin-right: 0;
  }

  .gap {
    display: flex;
    align-items: flex-end;
    height: 100%;
    padding: var(--cui-spacings-bit);
    margin-right: var(--cui-spacings-bit);
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
    color: var(--cui-fg-subtle);
    user-select: none;
  }
</style>
