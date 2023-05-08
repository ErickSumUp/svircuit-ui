<script lang="ts">
    import type { Hst } from '@histoire/plugin-svelte';
    import ChevronDown from "$lib/icons/ChevronDown.svelte";
    export let Hst: Hst
</script>

<Hst.Story title="Icons" layout={{ type: 'grid', width: '100%' }}>
    <Hst.Variant title="Default">
        <ChevronDown />
    </Hst.Variant>
</Hst.Story>