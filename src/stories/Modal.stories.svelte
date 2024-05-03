<script context="module">
  import Modal from '$lib/components/Modal.svelte';

  export const meta = {
    title: 'Components/Modal',
    component: Modal,
    parameters: {
      layout: 'centered'
    }
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
  import Button from '$lib/Button.svelte';
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

<Story name="Base" let:args>
  <Modal bind:baseDialog {...args}>
    <Headline as="h2" size="four" style="margin-bottom: 1rem">Hello World!</Headline>
    <Body>I am a modal.</Body>
  </Modal>

  <Button on:click={() => baseDialog.showModal()}>Show Modal</Button>
</Story>

<Story name="Opener">
  <Modal bind:dialog>
    <Headline as="h2" size="four">You just opened the modal!</Headline>
    <Body>In this case the button is "next to" the modal code-wise.</Body>
  </Modal>

  <Button on:click={() => dialog.showModal()}>Show Modal</Button>
</Story>

<Story name="Context">
  <Modal bind:dialog={dialogContext}>
    <Headline as="h2" size="four">You just opened the modal with context!</Headline>
    <Body>In this case the button connected using a context.</Body>
  </Modal>

  <Button on:click={() => ctx.showModal()}>Show Modal Context</Button>
</Story>
