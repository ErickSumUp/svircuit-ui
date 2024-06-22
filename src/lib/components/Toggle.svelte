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
  <input {id} type="checkbox" bind:value class="base" {...$$restProps} />
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
  .base {
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
