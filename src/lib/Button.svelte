<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  /**
   * How large should the button be?
   */
  export let size: 'kilo' | 'giga' = 'giga'
  /**
   * Change the color from blue to red to signal to the user that the action
   * is irreversible or otherwise dangerous.
   */
  export let destructive = false;
  /**
   * Button contents
   */
  export let label = '';
  /**
   * Optional Stretch the button across the full width of its parent.
   */
  export let stretch: boolean;

  export let disabled: boolean;
</script>

<button
  type="button"
  class:button--primary="{variant === 'primary' && !destructive }"
  class:button--primary--destructive="{variant === 'primary' && destructive }"
  class:button--secondary="{variant === 'secondary' && !destructive}"
  class:button--secondary--destructive="{variant === 'secondary' && destructive}"
  class:button--tertiary="{variant === 'tertiary' && !destructive }"
  class:button--tertiary--destructive="{variant === 'tertiary' && destructive }"
  class:button--kilo="{size === 'kilo'}"
  class:button--giga="{size === 'giga'}"
  class:button--stretch="{stretch}"
  {disabled}
  on:click
>
  <slot />
</button>

<style>
    button {
        display: inline-flex;
        justify-content: center;
        width: auto;
        height: auto;
        margin: 0;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        font-weight: 700;
        border-width: 1px;
        border-style: solid;
        border-radius: 999999px;
        transition: opacity 120ms ease-in-out,
            color 120ms ease-in-out,
            background-color 120ms ease-in-out,
            border-color 120ms ease-in-out;
        font-size: 16px;
        line-height: 24px;
    }
    button:disabled {
        opacity: 0.5;
        pointer-events: none;
        box-shadow: none;
    }
    button:focus {
        outline: 0;
        box-shadow: inset 0 0 0 4px #AFD0FE;
    }
    button:focus::-moz-focus-inner {
        border: 0;
    }
    button:focus:not(:focus-visible) {
        box-shadow: none;
    }
    .button--primary {
         background-color: #3063E9;
         border-color: #3063E9;
         color: #FFF;
     }
    .button--primary:hover {
        background-color: #234bc3;
        border-color: #234bc3;
    }
    .button--primary:active {
        background-color: #1a368e;
        border-color: #1a368e;
    }
    .button--primary--destructive {
        background-color: #DE331D;
        border-color: #DE331D;
        color: #FFF;
    }
    .button--primary--destructive:hover {
        background-color: #B22426;
        border-color: #B22426;
    }
    .button--primary--destructive:active {
        background-color: #941618;
        border-color: #941618;
    }
    .button--secondary {
        background-color: #FFF;
        border-color: #999;
        color: #000;
    }
    .button--secondary:hover {
        background-color: #f5f5f5;
        border-color: #666;
    }
    .button--secondary:active {
        background-color: #e6e6e6;
        border-color: #333;
    }
    .button--secondary--destructive {
        background-color: #FFF;
        border-color: #DE331D;
        color: #DE331D;
    }
    .button--secondary--destructive:hover {
        background-color: #f5f5f5;
        border-color: #B22426;
    }
    .button--secondary--destructive:active {
        background-color: #e6e6e6;
        border-color: #941618;
    }
    .button--tertiary {
        background-color: transparent;
        border-color: transparent;
        color: #3063e9;
        padding-left: 0;
        padding-right: 0;
    }
    .button--tertiary:hover {
        color: #234bc3;
        background-color: transparent;
        border-color: transparent;
    }
    .button--tertiary:active {
        color: #1a368e;
        background-color: transparent;
        border-color: transparent;
    }
    .button--tertiary--destructive {
        background-color: transparent;
        border-color: transparent;
        color: #DE331D;
        padding-left: 0;
        padding-right: 0;
    }
    .button--tertiary--destructive:hover {
        color: #B22426;
        background-color: transparent;
        border-color: transparent;
    }
    .button--tertiary--destructive:active {
        color: #941618;
        background-color: transparent;
        border-color: transparent;
    }
    .button--kilo {
        padding: 3px 15px;
    }
    .button--giga {
        padding: 11px 23px;
    }
    .button--stretch {
        width: 100%;
    }
</style>