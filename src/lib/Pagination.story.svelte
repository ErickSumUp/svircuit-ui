<script lang="ts">
    import type { Hst } from '@histoire/plugin-svelte';
    import Pagination from "$lib/Pagination.svelte";

    export let Hst: Hst;

    let currentPage = 1;
    let totalPages = 10;
</script>

<Hst.Story title="Components/Pagination" layout={{ type: 'grid', width: '100%' }}>
    <Hst.Variant title="Default">
        <Pagination {currentPage} {totalPages} />
    </Hst.Variant>
    <svelte:fragment slot="controls">
        <Hst.Number bind:value={currentPage} title="Current Page" min={1} step={1} max={totalPages} />
        <Hst.Number bind:value={totalPages} title="Total Pages" min={1} step={1} max={100}/>
        <pre>{JSON.stringify({ currentPage, totalPages })}</pre>
    </svelte:fragment>
</Hst.Story>
