<script lang="ts">
    import type { Hst } from '@histoire/plugin-svelte';
    import Headline from "$lib/Headline.svelte";

    export let Hst: Hst
    let size: 'one' | 'two' | 'three' | 'four' = 'one'
    let as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1'
</script>

<Hst.Story title="Typography/Headline" layout={{ type: 'grid', width: '100%' }}>
    <Hst.Variant title="Default">
        <Headline {size} {as}>This is a headline</Headline>
    </Hst.Variant>
    <Hst.Variant title="Variants">
        <Headline size="one" as="one">This is a headline one</Headline>
        <Headline size="two" as="two">This is a headline two</Headline>
        <Headline size="three" as="three">This is a headline three</Headline>
        <Headline size="four" as="four">This is a headline four</Headline>
    </Hst.Variant>
    <svelte:fragment slot="controls">
        <Hst.Select
                bind:value={size}
                title="variant"
                options={['one', 'two', 'three']} />
        <Hst.Select
                bind:value={as}
                title="as"
                options={['h1', 'h2', 'h3', 'h4', 'h5', 'h6']} />
        <pre>{JSON.stringify({ size })}</pre>
    </svelte:fragment>
</Hst.Story>
