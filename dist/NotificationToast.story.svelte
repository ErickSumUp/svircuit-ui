<script>
  import NotificationToast, { toasts, addToast } from './NotificationToast.svelte';
  import Button from './components/Button.svelte';
  export let Hst;
  let variant = 'info';
  let headline = '';
  let body = 'This is a toast message.';
</script>

<Hst.Story title="Components/Notification Toast" layout={{ type: 'grid', width: '100%' }}>
  <Hst.Variant title="Default">
    <Button on:click={() => addToast({ variant, headline, body })}>Show toast</Button>
  </Hst.Variant>
  <Hst.Variant title="Display Notifications">
    {#if $toasts?.length > 0}
      <section style="display: flex; flex-direction: column; gap: 1rem">
        {#each $toasts as toast}
          <NotificationToast {...toast} />
        {/each}
      </section>
    {/if}
  </Hst.Variant>
  <Hst.Variant title="Toast variants">
    <div style="display: flex; flex-direction: column; gap: 2rem">
      <NotificationToast variant="info" body="This is an info toast" />
      <NotificationToast variant="success" body="This is a success toast" />
      <NotificationToast variant="warning" body="This is a warning toast" />
      <NotificationToast variant="danger" body="This is a danger toast" />
    </div>
  </Hst.Variant>
  <Hst.Variant title="With headline">
    <NotificationToast
      variant="info"
      headline="Information"
      body="You successfully updated your data."
    />
  </Hst.Variant>
  <svelte:fragment slot="controls">
    <Hst.Text bind:value={headline} title="Headline" />
    <Hst.Text bind:value={body} title="Body" />
    <Hst.Select
      bind:value={variant}
      title="Variant"
      options={['info', 'success', 'warning', 'danger']}
    />
    <pre>{JSON.stringify({ headline, body, variant })}</pre>
  </svelte:fragment>
</Hst.Story>
