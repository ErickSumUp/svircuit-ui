<script lang="ts" module>
  import ActionMenu from '$lib/stories/ActionMenu.svelte';
  import Button from '$lib/components/Button.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/ActionMenu',
    component: ActionMenu,
    parameters: { layout: 'centered' },
    args: { placement: 'bottom', offset: 0 },
    argTypes: {
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

{#snippet addIcon()}
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      fill="currentColor"
      d="M20 12a8 8 0 1 0-16 0 8 8 0 0 0 16 0m-9 3.6V13H8.4a1 1 0 1 1 0-2H11V8.4a1 1 0 1 1 2 0V11h2.6a1 1 0 1 1 0 2H13v2.6a1 1 0 1 1-2 0M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10"
    />
  </svg>
{/snippet}

{#snippet editIcon()}
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      fill="currentColor"
      d="M13 5H5v14h14v-7a1 1 0 1 1 2 0v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8zm6.104-2.998a2.898 2.898 0 0 1 2.048 4.948l-8.065 8.067c-.331.33-.741.574-1.19.705l-.002-.001-2.569.752a1.45 1.45 0 0 1-1.808-1.03 1.45 1.45 0 0 1 .012-.764v-.001l.752-2.572h.001c.116-.393.315-.755.585-1.061l.12-.128 8.066-8.066a2.9 2.9 0 0 1 2.05-.85m0 2a.9.9 0 0 0-.636.263l-8.066 8.067a.8.8 0 0 0-.2.337l-.469 1.6 1.603-.467.094-.034a.8.8 0 0 0 .243-.166l8.065-8.067a.899.899 0 0 0-.634-1.533"
    />
  </svg>
{/snippet}

{#snippet deleteIcon()}
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      fill="currentColor"
      d="M17.223 7.6H6.777v11.6c0 .216.086.422.233.57.147.15.343.23.546.23h8.888c.203 0 .4-.08.546-.23a.8.8 0 0 0 .233-.57zm-8 8.9v-5.4a1 1 0 0 1 2 0v5.4a1 1 0 0 1-2 0m3.554 0v-5.4a1 1 0 0 1 2 0v5.4a1 1 0 1 1-2 0m1.779-11.7a.81.81 0 0 0-.233-.57.77.77 0 0 0-.546-.23h-3.554c-.203 0-.4.081-.546.23a.81.81 0 0 0-.233.57v.8h5.112zm2 .8H21v2h-1.777v11.6c0 .739-.29 1.45-.81 1.976a2.77 2.77 0 0 1-1.969.824H7.556c-.741 0-1.45-.298-1.97-.824a2.81 2.81 0 0 1-.809-1.976V7.6H3v-2h4.444v-.8c0-.739.29-1.45.81-1.976A2.77 2.77 0 0 1 10.223 2h3.554c.741 0 1.45.298 1.97.824.519.526.809 1.237.809 1.976z"
    />
  </svg>
{/snippet}

{#snippet openButton(props: Record<string, unknown>)}
  <Button {...props} size="s">Open action menu</Button>
{/snippet}

<Story name="Base">
  {#snippet template(args)}
    <ActionMenu
      placement={args.placement}
      offset={args.offset}
      trigger={openButton}
      actions={[
        { label: 'Add', icon: addIcon, onclick: () => console.log('Add') },
        { label: 'Edit', icon: editIcon, onclick: () => console.log('Edit') },
        { type: 'divider' },
        {
          label: 'Delete',
          icon: deleteIcon,
          destructive: true,
          onclick: () => console.log('Delete')
        }
      ]}
    />
  {/snippet}
</Story>

<Story name="Offset">
  {#snippet template()}
    <ActionMenu
      offset={20}
      trigger={openButton}
      actions={[
        { label: 'Add', icon: addIcon, onclick: () => console.log('Add') },
        { label: 'Edit', icon: editIcon, onclick: () => console.log('Edit') },
        { type: 'divider' },
        {
          label: 'Delete',
          icon: deleteIcon,
          destructive: true,
          onclick: () => console.log('Delete')
        }
      ]}
    />
  {/snippet}
</Story>
