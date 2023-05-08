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
        <Hst.Text
            bind:value={text}
            label="Title"
            name="title"
            type="text" />
        <Hst.Text
            bind:value={label}
            label="Label"
            name="label"
            type="text" />
        <Hst.Select
                bind:value={variant}
                label="Variant"
                name="variant"
                type="select"
                options={['neutral', 'confirm', 'notify', 'alert', 'promo']} />
        <Hst.Checkbox
            bind:value={circle}
            title="Circle"
        />
        <pre>{JSON.stringify({ text, variant, circle })}</pre>
    </svelte:fragment>
</Hst.Story>