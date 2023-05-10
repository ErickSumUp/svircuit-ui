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
               class:input-has-suffix="{suffix.length > 0}"
           {placeholder}
               type="text"
        >
        {#if suffix.length > 0}
            <span class="suffix-wrapper">
                {suffix}
            </span>
        {/if}
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
        padding: 12px 16px 12px 16px;
        transition: box-shadow 120ms ease-in-out,
             padding 120ms ease-in-out;
        width: 100%;
        margin: 0;

        box-shadow: 0 0 0 1px #999999;
    }
    input:hover {
        box-shadow: 0 0 0 1px #666666;
    }
    input:focus {
        box-shadow: 0 0 0 4px #3063E9;
    }
    input:active {
        box-shadow: 0 0 0 1px #3063E9;
    }
    input::placeholder {
        color: #999999;
        transition: color 120ms ease-in-out;
    }
    .input--warning {
        box-shadow: 0 0 0 1px #F5A720;
    }
    .input--warning:hover {
        box-shadow: 0 0 0 1px #AD7A14;
    }
    .input--warning:focus {
        box-shadow: 0 0 0 2px #F5A720;
    }
    .input--warning:active {
        box-shadow: 0 0 0 1px #F5A720;
    }
    .input--warning:not(:focus)::placeholder {
        color: #F5A720;
    }
    .input--invalid {
        box-shadow: 0 0 0 1px #DE331D;
    }
    .input--invalid:hover {
        box-shadow: 0 0 0 1px #B22426;
    }
    .input--invalid:focus {
        box-shadow: 0 0 0 2px #DE331D;
    }
    .input--invalid:active {
        box-shadow: 0 0 0 1px #DE331D;
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
        box-shadow: 0 0 0 1px #999999;
    }
    .input-has-prefix {
        padding-left: 48px;
    }
    .input-has-suffix {
        padding-right: 48px;
    }
</style>