<script lang="ts" module>
  import Tooltip from '$lib/components/Tooltip.svelte';
  import Button from '$lib/components/Button.svelte';
  import DownloadCloud from '$lib/icons/DownloadCloud.svelte';
  import Settings from '$lib/icons/Settings.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/Tooltip',
    component: Tooltip,
    args: { label: 'This may take a few minutes', type: 'description', placement: 'top' },
    argTypes: {
      type: { control: 'select', options: ['label', 'description'] },
      placement: {
        control: 'select',
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ]
      }
    }
  });
</script>

{#snippet download(attributes: Record<string, string>)}
  <Button {...attributes}>
    {#snippet leading_icon()}<DownloadCloud />{/snippet}
    Download
  </Button>
{/snippet}

<Story name="Base">
  {#snippet template(args)}
    <div style="padding: 4rem;">
      <Tooltip label={args.label} type={args.type} placement={args.placement} trigger={download} />
    </div>
  {/snippet}
</Story>

<Story name="Types">
  {#snippet template()}
    <div style="display: flex; gap: 1rem; padding: 4rem;">
      <Tooltip label="Settings" type="label">
        {#snippet trigger(attributes)}
          <Button {...attributes} hideLabel>
            {#snippet leading_icon()}<Settings />{/snippet}
          </Button>
        {/snippet}
      </Tooltip>
      <Tooltip label="This may take a few minutes" type="description" trigger={download} />
    </div>
  {/snippet}
</Story>

<Story name="Placements">
  {#snippet template(args)}
    <div style="display: flex; gap: 1rem; padding: 4rem;">
      <Tooltip label={args.label} type={args.type} placement="left" trigger={download} />
      <Tooltip label={args.label} type={args.type} placement="bottom-start" trigger={download} />
      <Tooltip label={args.label} type={args.type} placement="right-end" trigger={download} />
    </div>
  {/snippet}
</Story>
