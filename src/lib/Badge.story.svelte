<script lang="ts">
    import type { Hst } from '@histoire/plugin-svelte';
    import Badge from "./Badge.svelte";

    export let Hst: Hst

    let text = 'Badge';
    let variant: 'neutral' | 'confirm' | 'notify' | 'alert' | 'promo' = 'neutral';
    let circle = false;
</script>

<Hst.Story title="Components/Badge" layout={{ type: 'grid', width: '100%' }}>
    <Hst.Variant title="Default">
        <Badge {variant} {circle}>{text}</Badge>
    </Hst.Variant>
    <Hst.Variant title="Variants">
            <Badge variant="neutral">Badge</Badge>
        <Badge variant="confirm">Badge</Badge>
        <Badge variant="notify">Badge</Badge>
        <Badge variant="alert">Badge</Badge>
        <Badge variant="promo">Badge</Badge>
    </Hst.Variant>
    <Hst.Variant title="Circle">
        <Badge circle variant="alert">1</Badge>
        <Badge circle>22</Badge>
    </Hst.Variant>
    <svelte:fragment slot="controls">
        <Hst.Text
            bind:value={text}
            title="title" />
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
