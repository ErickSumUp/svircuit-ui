<script lang="ts">
    import type { Hst } from '@histoire/plugin-svelte'
    import Badge from "./Badge.svelte";

    export let Hst: Hst
</script>

<Hst.Story title="Components/Badge" layout={{ type: 'grid', width: '100%' }}>
    <Hst.Variant title="Default">
            <Badge variant="neutral">Badge</Badge>
    </Hst.Variant>
    <Hst.Variant title="Variants">
            <Badge variant="neutral">Badge</Badge>
        <Badge variant="confirm">Badge</Badge>
        <Badge variant="notify">Badge</Badge>
        <Badge variant="alert">Badge</Badge>
        <Badge variant="promo">Badge</Badge>
    </Hst.Variant>
</Hst.Story>