<script lang="ts" module>
  import Dialog from '$lib/components/Dialog.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Components/Modal/Dialog',
    component: Dialog,
    parameters: {
      layout: 'centered'
    },
    args: { variant: 'contextual', preventClose: false, closeButtonLabel: 'Close' },
    argTypes: {
      variant: { control: 'select', options: ['contextual', 'immersive'] }
    }
  });

  type Args = Omit<ComponentProps<typeof Dialog>, 'children'>;
</script>

<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Headline from '$lib/components/Headline.svelte';
  import Body from '$lib/components/Body.svelte';
  import { getContext, setContext } from 'svelte';

  let baseDialog: HTMLDialogElement;
  let dialog: HTMLDialogElement;
  let immersiveDialog: HTMLDialogElement;
  let preventCloseDialog: HTMLDialogElement;
  let dialogContext: HTMLDialogElement;

  type DialogContext = {
    showModal: () => void;
    close: () => void;
  };

  setContext('dialog', {
    showModal: () => {
      dialogContext.showModal();
    },
    close: () => {
      dialogContext.close();
    }
  });

  let ctx: DialogContext = getContext('dialog');
</script>

<Story name="Base">
  {#snippet template({ ...args }: Args)}
    <Dialog bind:dialog={baseDialog} {...args} aria-labelledby="dialog-base-title">
      <Headline id="dialog-base-title" as="h2" size="s" style="margin-bottom: 1rem">
        Hello World!
      </Headline>
      <Body>I am a Dialog.</Body>
    </Dialog>

    <Button
      onclick={() => {
        baseDialog.showModal();
      }}>Show Dialog</Button
    >
  {/snippet}
</Story>

<Story name="Opener">
  {#snippet template()}
    <Dialog bind:dialog aria-labelledby="dialog-opener-title">
      <Headline id="dialog-opener-title" as="h2" size="s">You just opened the Dialog!</Headline>
      <Body>In this case the button is "next to" the Dialog code-wise.</Body>
    </Dialog>

    <Button onclick={() => dialog.showModal()}>Show Dialog</Button>
  {/snippet}
</Story>

<Story name="Immersive">
  {#snippet template()}
    <Dialog
      bind:dialog={immersiveDialog}
      variant="immersive"
      aria-labelledby="dialog-immersive-title"
    >
      <Headline id="dialog-immersive-title" as="h2" size="s" style="margin-bottom: 1rem">
        Hello World!
      </Headline>
      <Body>I am an immersive Dialog.</Body>
    </Dialog>

    <Button onclick={() => immersiveDialog.showModal()}>Show Dialog</Button>
  {/snippet}
</Story>

<Story name="Prevent close">
  {#snippet template()}
    <Dialog
      bind:dialog={preventCloseDialog}
      preventClose
      aria-labelledby="dialog-prevent-close-title"
    >
      <Headline id="dialog-prevent-close-title" as="h2" size="s" style="margin-bottom: 1rem">
        Hello World!
      </Headline>
      <Body style="margin-bottom: 1rem">Only the button below closes me.</Body>
      <form method="dialog">
        <Button variant="primary">Got it</Button>
      </form>
    </Dialog>

    <Button onclick={() => preventCloseDialog.showModal()}>Show Dialog</Button>
  {/snippet}
</Story>

<Story name="Context">
  {#snippet template()}
    <Dialog bind:dialog={dialogContext} aria-labelledby="dialog-context-title">
      <Headline id="dialog-context-title" as="h2" size="s">
        You just opened the Dialog with context!
      </Headline>
      <Body>In this case the button connected using a context.</Body>
    </Dialog>

    <Button onclick={() => ctx.showModal()}>Show Dialog Context</Button>
  {/snippet}
</Story>
