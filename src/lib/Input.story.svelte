<script lang="ts">
    import type { Hst } from '@histoire/plugin-svelte';
    import Input from "$lib/Input.svelte";

    export let Hst: Hst

    let text = 'Badge';
    let disabled = false;
    let label = 'First name';
    let placeholder = 'Jane';
    let prefix = ''
    let suffix = ''
    let hasWarning = false;
    let invalid = false;
    let textAlignRight = false;
    let readonly = false;
    let validationMessage = 'Maximum 100 characters';
</script>

<Hst.Story title="Components/Input" layout={{ type: 'grid', width: '100%' }}>
    <Hst.Variant title="Default">
            <Input
                    {label}
                    {disabled}
                    {placeholder}
                    {hasWarning}
                    {invalid}
                    {textAlignRight}
                    {readonly}
                    {prefix}
                    {suffix}
                    {validationMessage}
            />
    </Hst.Variant>
    <Hst.Variant title="Various">
        <Input ></Input>
        <Input ></Input>
    </Hst.Variant>
    <svelte:fragment slot="controls">
        <Hst.Text
            bind:value={label}
            title="Label"
            label="Label"
            name="label"
            type="text" />
        <Hst.Checkbox
            bind:value={disabled}
            title="Disabled"
        />
        <Hst.Checkbox
            bind:value={hasWarning}
            title="Has warning"
        />
        <Hst.Checkbox
            bind:value={invalid}
            title="Invalid"
        />
        <Hst.Checkbox
            bind:value={textAlignRight}
            title="Text align right"
        />
        <Hst.Checkbox
            bind:value={readonly}
            title="Readonly"
        />
        <Hst.Text
            bind:value={placeholder}
            title="Placeholder"
            label="Placeholder"
            name="placeholder"
            type="text"
        />
        <Hst.Text
            bind:value={prefix}
            title="Prefix"
            label="Prefix"
            name="prefix"
            type="text"
        />
        <Hst.Text
            bind:value={suffix}
            title="Suffix"
            label="Suffix"
            name="suffix"
            type="text"
        />
        <Hst.Text
            bind:value={validationMessage}
            title="Validation message"
            label="Validation message"
            name="validationMessage"
            type="text"
        />
        <pre>{JSON.stringify({ text, disabled })}</pre>
    </svelte:fragment>
</Hst.Story>