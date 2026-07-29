<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import Button from '$lib/components/Button.svelte';
  import Select from '$lib/components/Select.svelte';
  import ChevronLeft from '$lib/icons/ChevronLeft.svelte';
  import ChevronRight from '$lib/icons/ChevronRight.svelte';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'onchange'> {
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
    /**
     * Returns the label shown after the select, called with the total number of
     * pages, for example `of 10`.
     */
    totalLabel?: (totalPages: number) => string;
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
    totalLabel,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const selectId = `pagination-${uid}`;
  const descriptionId = `pagination-total-${uid}`;

  const pages = $derived(Array.from({ length: totalPages }, (_, index) => index + 1));

  /** Beyond five pages the list of buttons is swapped for a select. */
  const showList = $derived(totalPages <= 5);
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

    {#if showList}
      <ol class="list">
        {#each pages as page (page)}
          {@const isCurrent = page === currentPage}
          <li>
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
          </li>
        {/each}
      </ol>
    {:else}
      <Select
        id={selectId}
        {label}
        hideLabel
        size="s"
        value={currentPage}
        ariaDescribedBy={totalLabel ? descriptionId : undefined}
        onchange={(event) => onChange(Number.parseInt(event.currentTarget.value, 10))}
      >
        {#each pages as page (page)}
          <option value={page}>{page}</option>
        {/each}
      </Select>
      {#if totalLabel}
        <span id={descriptionId} class="total">{totalLabel(totalPages)}</span>
      {/if}
    {/if}

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

  /* The chevrons keep their size when the select or the list grows. */
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

  .total {
    margin-left: var(--cui-spacings-kilo);
  }
</style>
