<script lang="ts">
  /**
   * Choose from 4 style variants. Default: 'neutral'
   */
  export let variant: 'neutral' | 'confirm' | 'notify' | 'alert' | 'promo' = 'confirm';
  /**
   * Use the circular badge to indicate a count of items related to an element.
   */
  export let circle = false;
</script>

<div
  class="badge"
  class:badge--neutral="{variant === 'neutral' }"
  class:badge--confirm="{variant === 'confirm' }"
  class:badge--notify="{variant === 'notify' }"
  class:badge--alert="{variant === 'alert' }"
  class:badge--promo="{variant === 'promo' }"
  class:badge--circle="{circle}"
>
  <slot />
</div>

<style>
    .badge {
        font-size: 0.875rem;
        line-height: 1.25rem;
        border-radius: 999999px;
        display: inline-block;
        padding: 2px 8px;
        font-weight: 700;
        text-align: center;
        letter-spacing: 0.25px;
    }
    .badge--neutral {
        background-color: #e6e6e6;
        color: #1A1A1A;
    }
    .badge--confirm {
        background-color: #138849;
        color: #FFF;
    }
    .badge--notify {
        background-color: #F6CC1B;
        color: #1A1A1A;
    }
    .badge--alert {
        background-color: #D23F47;
        color: #FFF;
    }
    .badge--promo {
        background-color: #CA58FF;
        color: #FFF;
    }
    .badge--circle {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px 4px;
        width: 24px;
        height: 24px;
    }
</style>