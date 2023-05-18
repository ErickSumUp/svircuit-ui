<script lang="ts">
  export let align: 'left' | 'center' | 'right' = 'left';
  export let condensed = false;
</script>

<td class:align-left={align === "left"}
    class:align-center={align === "center"}
    class:align-right={align === "right"}
    class:condensed={condensed}>
  <slot />
</td>

<style>
    td {
        text-align: left;
        background-color: #FFFFFF;
        border-bottom: 1px solid #CCCCCC;
        padding: 24px;
        transition: background-color 120ms ease-in-out;
        vertical-align: middle;
        overflow-wrap: break-word;
    }
    td:hover {
        background-color: #F5F5F5;
    }
    .align-left {
        text-align: left;
    }
    .align-center {
        text-align: center;
    }
    .align-right {
        text-align: right;
    }
    .condensed {
      padding: 12px 16px 12px 24px;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
</style>