<script lang="ts" module>
  import Dialog from '$lib/components/Dialog.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Components/Dialog',
    component: Dialog,
    parameters: {
      layout: 'centered'
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
    <Dialog bind:dialog={baseDialog} {...args}>
      <Headline as="h2" size="four" style="margin-bottom: 1rem">Hello World!</Headline>
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
    <Dialog bind:dialog>
      <Headline as="h2" size="four">You just opened the Dialog!</Headline>
      <Body>In this case the button is "next to" the Dialog code-wise.</Body>
    </Dialog>

    <Button onclick={() => dialog.showModal()}>Show Dialog</Button>
  {/snippet}
</Story>

<Story name="Context">
  {#snippet template()}
    <Dialog bind:dialog={dialogContext}>
      <Headline as="h2" size="four">You just opened the Dialog with context!</Headline>
      <Body>In this case the button connected using a context.</Body>
    </Dialog>

    <Button onclick={() => ctx.showModal()}>Show Dialog Context</Button>
  {/snippet}
</Story>
