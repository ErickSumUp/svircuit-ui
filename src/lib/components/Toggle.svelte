<script>
  /**
   * The value of the input field.
   * @type {boolean}
   */
  export let value;
  /**
   * The id of the input field.
   * @type {string}
   */
  export let id;
  /**
   * The label of the input field.
   * @type {string}
   */
  export let label;
  /**
   * Further explanation of the toggle. Can change depending on the state.
   * @type {string}
   */
  export let description = '';
</script>

<div class="wrapper">
  <input {id} type="checkbox" bind:value class="toggle" {...$$restProps} />
  <label class="label" {id} for={id}
    >{label}
    {#if description}
      <span class="description" aria-hidden="true">{description}</span>
    {/if}
  </label>
</div>

<style>
  .wrapper {
    display: flex;
    align-items: flex-start;
  }

  .toggle {
		--tglbg: var(--cui-bg-highlight);
		--handleoffset: 16px;
		--handleoffsetcalculator: calc(var(--handleoffset) * -1);
		--togglehandleborder: 0 0;
		--toggle-height: 24px;
		--toggle-width: 40px;
		height: var(--toggle-height);
		width: var(--toggle-width);
		flex: 0 0 var(--toggle-width);
		overflow: visible;
		cursor: pointer;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border-radius: var(--toggle-height);
		border: 0;
		background-color: var(--cui-fg-on-strong);
		color: var(--fallback-bc,oklch(var(--bc)/.5));
		transition: background, box-shadow var(--animation-input, .2s) ease-out;
		box-shadow: var(--handleoffsetcalculator) 0 0 4px var(--tglbg) inset,0 0 0 4px var(--tglbg) inset,var(--togglehandleborder)
  }

	.toggle[aria-checked="true"] {
		background-color: var(--cui-bg-success-strong);
	}

	.toggle[aria-checked="true"]:hover {
		background-color: var(--cui-bg-success-strong-hovered);
	}

	.toggle[aria-checked="true"]:active {
		background-color: var(--cui-bg-success-strong-pressed);
	}

	.toggle:checked {
		--tglbg: var(--cui-bg-success-strong);
		background-image: none;
		--handleoffsetcalculator: var(--handleoffset);
		--tw-text-opacity: 1;
		color: var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))
	}

  .label {
    display: block;
    margin-left: var(--cui-spacings-kilo);
    font-size: var(--cui-typography-body-one-font-size);
    font-weight: var(--cui-font-weight-regular);
    line-height: var(--cui-typography-body-one-line-height);
    cursor: pointer;
  }

  .description {
    display: block;
    font-size: var(--cui-typography-body-two-font-size);
    line-height: var(--cui-typography-body-two-line-height);
    color: var(--cui-fg-subtle);
  }
</style>
