<script lang="ts">
    import ChevronDown from "$lib/icons/ChevronDown.svelte";

    export let disabled: boolean = false;
    export let invalid: boolean = false;
    export let prefix: string = '';
    export let label: string = '';
</script>

<label>
    <span>{label}</span>
</label>
<div class="select--wrapper">
    {prefix}
    <select
        class:select--invalid="{invalid && !disabled}"
        class:select--prefix="{prefix.length > 0}"
        class:select--disabled="{disabled}"
    >
        <slot />
    </select>
    <div class="chevron">
        <ChevronDown />
    </div>
</div>

<style>
    select {
        appearance: none;
        cursor: pointer;
        background-color: #FFFFFF;
        outline: none;
        border: 0;
        border-radius: 8px;
        box-shadow: none;
        color: #1A1A1A;
        margin: 0;
        padding-top: 12px;
        padding-right: 48px;
        padding-bottom: 12px;
        padding-left: 16px;
        position: relative;
        width: 100%;
        z-index: 20;
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: box-shadow 120ms ease-in-out,
            padding 120ms ease-in-out;
    }
    select:-moz-focusring {
        color: transparent;
        text-shadow: 0 0 0 #000;
    }
    select::-ms-expand {
        display: none;
    }
    .select--disabled {
        box-shadow: 0 0 0 1px #999999
    }
    .select--invalid {
        padding-right: 56px;
    }
    .select--prefix {
        padding-left: 48px;
    }
    .chevron {
        color: #666666;
        display: block;
        z-index: 21;
        pointer-events: none;
        position: absolute;
        height: 48px;
        width: 48px;
        top: 0;
        right: 0;
        padding: 16px;
    }
    .select--wrapper {
        color: #1A1A1A;
        display: block;
        position: relative;
    }
    label {
        display: block;
        font-size: 0.875rem;
        line-height: 1.25rem;
    }


</style>