<script lang="ts">
    import type { Hst } from '@histoire/plugin-svelte';
    import ChevronDown from "$lib/icons/ChevronDown.svelte";
    import Alert from "$lib/icons/Alert.svelte";
    import Confirm from "$lib/icons/Confirm.svelte";
    export let Hst: Hst
</script>

<Hst.Story title="Icons" layout={{ type: 'grid', width: '100%' }}>
    <Hst.Variant title="Default">
        <ChevronDown />
    </Hst.Variant>
    <Hst.Variant title="Alert">
        <Alert />
    </Hst.Variant>
    <Hst.Variant title="Confirm">
        <Confirm />
    </Hst.Variant>
</Hst.Story>
