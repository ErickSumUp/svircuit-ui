<script>
  import Pagination from './Pagination.svelte';
  export let Hst;
  let currentPage = 1;
  let totalPages = 10;
</script>

<Hst.Story title="Stories/Pagination" layout={{ type: 'grid', width: '100%' }}>
  <Hst.Variant title="Default">
    <Pagination {currentPage} {totalPages} />
  </Hst.Variant>
  <svelte:fragment slot="controls">
    <Hst.Number bind:value={currentPage} title="Current Page" step={1} />
    <Hst.Number bind:value={totalPages} title="Total Pages" step={1} />
    <pre>{JSON.stringify({ currentPage, totalPages })}</pre>
  </svelte:fragment>
</Hst.Story>
