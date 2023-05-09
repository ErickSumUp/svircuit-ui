<script lang="ts">
    export let disabled = false;
    export let prefix = '';
    export let suffix = '';
    export let label = '';
    export let placeholder = '';
    export let hasWarning = false;
    export let invalid = false;
    export let textAlignRight = false;
    export let readonly = false;
</script>

<div class:disabled={disabled}>
    <label for="input">
        <span class="label-span">{label}</span>
    </label>
    <div class="input-wrapper">
        <span class="prefix-wrapper">
            {prefix}
        </span>
        <input id="input"
           class:input--warning="{!disabled && hasWarning}"
           class:input--invalid="{!disabled && invalid}"
           class:text-align-right={textAlignRight}
           class:readonly="{readonly}"
           class:disabled="{disabled}"
           class:input-has-prefix="{prefix.length > 0}"
            class:select--invalid="{invalid && !disabled}"
           {placeholder}
        >
        <span class="suffix-wrapper">
            {suffix}
        </span>
    </div>
</div>

<style>
    label {
        display: block;
        font-size: 0.875rem;
        line-height: 1.25rem;
    }
    .label-span {
        display: inline-block;
        margin-bottom: 4px;
    }
    .input-wrapper {
        position: relative
    }
    .prefix-wrapper {
        font-size: 1rem;
        line-height: 1.5rem;

        position: absolute;
        pointer-events: none;
        color: #666666;
        padding: 12px 16px;
        height: 48px;
        width: 48px;
    }
    .suffix-wrapper {
        font-size: 1rem;
        line-height: 1.5rem;

        position: absolute;
        top: 0;
        right: 0;
        pointer-events: none;
        color: #666666;
        padding: 12px 16px;
        height: 48px;
        width: 48px;
        transition: right 120ms ease-in-out;
    }
    input {
        font-size: 1rem;
        line-height: 1.5rem;

        -webkit-appearance: none;
        background-color: #FFFFFF;
        border: none;
        outline: 0;
        border-radius: 8px;
        padding: 12px 16px;
        transition: box-shadow 120ms ease-in-out,
             padding 120ms ease-in-out;
        width: 100%;
        margin: 0;
    }
    input::placeholder {
        color: #999999;
        transition: color 120ms ease-in-out;
    }
    .input--warning:not(:focus)::placeholder {
        color: #F5A720;
    }
    .input--invalid:not(:focus)::placeholder {
        color: #DE331D;
        opacity: 0.5;
    }
    .text-align-right {
        text-align: right;
    }
    .readonly {
        background-color: #F5F5F5;
    }
    .disabled {
        background-color: #E6E6E6;
    }
    .input-has-prefix {
        padding-left: 48px;
    }
</style>