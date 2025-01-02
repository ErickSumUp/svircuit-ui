<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Input } from '$lib';

  interface Props {
    options: RadioInputSnippetProps[];
    name: string;
    children: Snippet;
  }

  let { options, name, children }: Props = $props();
</script>

<script lang="ts" module>
  export type RadioInputSnippetProps = {
    id: string;
    name: string;
    description?: string;
    value: string;
    checked?: boolean;
    disabled?: boolean;
  };

  export { radioButton }
</script>

{#snippet radioButton({ id, name, description, value, checked, disabled }: RadioInputSnippetProps)}
  <div class="radio-input-wrapper">
    <input class="radio-input" {id} type="radio" {name} {value} {checked} {disabled}/>
    <label for="radio">Radio</label>
    {#if description}
      <p>{description}</p>
    {/if}
  </div>
{/snippet}

<div class="wrapper">
  <fieldset class="fieldset">
    {#each options as option}
      <div class="radio-button-wrapper">
        {@render radioButton(option)}
      </div>
    {/each}
  </fieldset>
</div>

<style>


  /* Radio Button Snippet */
  .radio-button-wrapper[disabled],
  .radio-button-wrapper[data-disabled="true"] {
    pointer-events: none;
  }

  .label {
    position: relative;
    display: inline-block;
    padding-left: 26px;
    color: var(--cui-fg-normal);
    cursor: pointer;
  }

  .label::before {
    position: absolute;
    top: calc(var(--cui-body-m-line-height) / 2);
    left: 0;
    box-sizing: border-box;
    display: block;
    width: 18px;
    height: 18px;
    content: "";
    background-color: var(--cui-bg-normal);
    border: 1px solid var(--cui-border-normal);
    border-radius: 100%;
    box-shadow: none;
    transition:
      border var(--cui-transitions-default),
      background-color var(--cui-transitions-default);
    transform: translateY(-50%);
  }

  .label::after {
    position: absolute;
    top: calc(var(--cui-body-m-line-height) / 2);
    left: var(--cui-spacings-bit);
    box-sizing: border-box;
    display: block;
    width: 10px;
    height: 10px;
    content: "";
    background-color: var(--cui-fg-accent);
    border-radius: 100%;
    opacity: 0;
    transition:
      transform var(--cui-transitions-default),
      opacity var(--cui-transitions-default);
    transform: translateY(-50%) scale(0, 0);
  }

  .radio-input:hover + label::before {
    border-color: var(--cui-border-normal-hovered);
  }

  .radio-input:focus + label::before {
    border-color: var(--cui-border-accent);
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  .radio-input:focus:not(:focus-visible) + label::before {
    border-color: var(--cui-border-normal);
    box-shadow: none;
  }

  .radio-input:checked:focus:not(:focus-visible) + label::before {
    border-color: var(--cui-border-accent);
  }

  .radio-input:checked + label::before {
    border-color: var(--cui-border-accent);
  }

  .radio-input:checked + label::after {
    opacity: 1;
    transform: translateY(-50%) scale(1, 1);
  }

  .radio-input:disabled + label,
  .radio-input[disabled] + label {
    color: var(--cui-fg-normal-disabled);
    pointer-events: none;
  }

  .radio-input:disabled + label::before,
  .radio-input[disabled] + label::before {
    background-color: var(--cui-bg-normal-disabled);
    border-color: var(--cui-border-normal-disabled);
  }

  .radio-input:disabled + label::after,
  .radio-input[disabled] + label::after {
    background-color: var(--cui-fg-on-strong-disabled);
  }

  .radio-input:disabled:checked + label::before,
  .radio-input[disabled]:checked + label::before {
    border-color: var(--cui-border-accent-disabled);
  }

  .radio-input:disabled:checked + label::after,
  .radio-input[disabled]:checked + label::after {
    background-color: var(--cui-fg-accent-disabled);
  }

  /* Invalid */

  [aria-invalid="true"] .radio-input:not(:focus) + .label::before {
    background-color: var(--cui-bg-danger);
    border-color: var(--cui-border-danger);
  }

  [aria-invalid="true"] .radio-input:not(:focus) + .label::after {
    background-color: var(--cui-fg-danger);
  }

  [aria-invalid="true"] .radio-input:hover + .label::before,
  [aria-invalid="true"] .radio-input:focus + .label::before {
    border-color: var(--cui-border-danger-hovered);
  }

  [aria-invalid="true"] .radio-input:checked + .label::before {
    border-color: var(--cui-border-danger);
  }
</style>
