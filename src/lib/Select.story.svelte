<script lang="ts">
    import type { Hst } from '@histoire/plugin-svelte';
    import Select from "./Select.svelte";

    export let Hst: Hst

    let text = 'Badge';
    let variant = 'neutral';
    let circle = false;
    let label = 'Countries';
</script>

<Hst.Story title="Components/Select" layout={{ type: 'grid', width: '100%' }}>
    <Hst.Variant title="Default">
            <Select {label}>
                <option>Lol</option>
            </Select>
    </Hst.Variant>
    <svelte:fragment slot="controls">
        <Hst.Text bind:value={text} title="title" />
        <Hst.Text bind:value={label} title="label" />
        <Hst.Select
                bind:value={variant}
                title="variant"
                options={['neutral', 'confirm', 'notify', 'alert', 'promo']} />
        <Hst.Checkbox
            bind:value={circle}
            title="Circle"
        />
        <pre>{JSON.stringify({ text, variant, circle })}</pre>
    </svelte:fragment>
</Hst.Story>
