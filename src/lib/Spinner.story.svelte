<script lang="ts">
    import type { Hst } from '@histoire/plugin-svelte';
    import Spinner from "./Spinner.svelte";

    export let Hst: Hst

    let size: 'byte' | 'kilo' | 'giga' = 'kilo';
</script>

<Hst.Story title="Components/Spinner" layout={{ type: 'grid', width: '100%' }}>
    <Hst.Variant title="Default">
        <Spinner {size}></Spinner>
    </Hst.Variant>
    <Hst.Variant title="Variants">
        <Spinner size="byte">Badge</Spinner>
        <Spinner size="kilo">Badge</Spinner>
        <Spinner size="giga">Badge</Spinner>
    </Hst.Variant>
    <svelte:fragment slot="controls">
        <Hst.Select
                bind:value={size}
                title="variant"
                options={['byte', 'kilo', 'giga']} />
        <pre>{JSON.stringify({ size })}</pre>
    </svelte:fragment>
</Hst.Story>
