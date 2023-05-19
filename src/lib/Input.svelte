<script lang="ts">
    export let disabled = false;
    export let prefix = '';
    export let suffix = '';
    export let label: string;
    export let placeholder = '';
    export let showValid = false;
    export let hasWarning = false;
    export let invalid = false;
    export let textAlignRight = false;
    export let readonly = false;
    export let validationMessage = '';
    export let value = '';
</script>

<div class:wrapper-disabled={disabled}>
    <label for="input">
        <span class="label-span" class:label-span-disabled={disabled}>{label}</span>
    </label>
    <div class="input-wrapper">
        {#if readonly}
            <span class="prefix-wrapper">
                {prefix}
            </span>
        {/if}
        <input id="input"
           class:input--warning="{!disabled && hasWarning}"
           class:input--invalid="{!disabled && invalid}"
           class:text-align-right={textAlignRight}
           class:readonly="{readonly}"
           class:input-has-prefix="{prefix.length > 0}"
               class:input-has-suffix="{suffix.length > 0}"
               {disabled}
           {placeholder}
               bind:value={value}
        >
        {#if suffix.length > 0}
            <span class="suffix-wrapper">
                {suffix}
            </span>
        {/if}
    </div>
    {#if validationMessage.length > 0}
        <span class="validation-message" role="status" aria-live="polite"
              class:validation-message--disabled={disabled}
              class:validation-message--valid={showValid}
              class:validation-message--valid--disabled={showValid && disabled}
              class:validation-message--invalid={invalid}
              class:validation-message--invalid--disabled={invalid && disabled}
              class:validation-message--warning={hasWarning}
              class:validation-message--warning--disabled={hasWarning && disabled}
        >
            {validationMessage}
        </span>
    {/if}
</div>

<style>
    .wrapper-disabled {
        pointer-events: none;
    }
    label {
        display: block;
        font-size: 0.875rem;
        line-height: 1.25rem;
    }
    .label-span {
        display: inline-block;
        margin-bottom: 4px;
    }
    .label-span-disabled {
        color: rgba(26, 26, 26, 0.4)
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
        appearance: none;
        background-color: #FFFFFF;
        border: none;
        outline: 0;
        border-radius: 8px;
        padding: 12px 16px;
        transition: box-shadow 120ms ease-in-out,
             padding 120ms ease-in-out;
        width: 100%;
        margin: 0;

        box-shadow: inset 0 0 0 1px #999999;
    }
    input:disabled {
        background-color: rgba(255, 255, 255, 0.4);
        box-shadow: inset 0 0 0 1px rgba(204, 204, 204, 0.4);
    }
    input:disabled[disabled] {
        background-color: rgba(255, 255, 255, 0.4);
    }
    input:hover {
        box-shadow: inset 0 0 0 1px #666666;
    }
    input:focus {
        box-shadow: inset 0 0 0 2px #3063E9;
    }
    input:active {
        box-shadow: inset 0 0 0 1px #3063E9;
    }
    input::placeholder {
        color: #999999;
        transition: color 120ms ease-in-out;
    }
    .input--warning {
        box-shadow: inset 0 0 0 1px #F5A720;
    }
    .input--warning:hover {
        box-shadow: inset 0 0 0 1px #AD7A14;
    }
    .input--warning:focus {
        box-shadow: inset 0 0 0 2px #F5A720;
    }
    .input--warning:active {
        box-shadow: inset 0 0 0 1px #F5A720;
    }
    .input--warning:not(:focus)::placeholder {
        color: #F5A720;
    }
    .input--invalid {
        box-shadow: inset 0 0 0 1px #DE331D;
    }
    .input--invalid:hover {
        box-shadow: inset 0 0 0 1px #B22426;
    }
    .input--invalid:focus {
        box-shadow: inset 0 0 0 2px #DE331D;
    }
    .input--invalid:active {
        box-shadow: inset 0 0 0 1px #DE331D;
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
    .input-has-prefix {
        padding-left: 48px;
    }
    .input-has-suffix {
        padding-right: 48px;
    }
    .validation-message {
        font-size: 0.875rem;
        line-height: 1.25rem;

        display: block;
        margin-top: 4px;
        color: #6A737C;
        transition: color 120ms ease-in-out;
    }
    .validation-message--disabled {
        color: rgba(102, 102, 102, 0.4);
    }
    .validation-message--valid {
        color: #018850;
    }
    .validation-message--valid--disabled {
        color: rgba(1, 135, 48, 0.4);
    }
    .validation-message--invalid {
        color: #DE331D;
    }
    .validation-message--invalid--disabled {
        color: rgba(222, 51, 29, 0.4);
    }
    .validation-message--warning {
        color: #E27900;
    }
    .validation-message--warning--disabled {
        color: rgba(232, 124, 0, 0.4);
    }
</style>
