<script>
  import SubHeadline from './SubHeadline.svelte';
  export let Hst;
  let as = 'h2';
</script>

<Hst.Story layout={{ type: 'grid', width: '100%' }} title="Typography/SubHeadline">
  <Hst.Variant title="Default">
    <SubHeadline {as}>This is a sub headline</SubHeadline>
  </Hst.Variant>
  <svelte:fragment slot="controls">
    <Hst.Select bind:value={as} options={['h1', 'h2', 'h3', 'h4', 'h5', 'h6']} title="as" />
    <pre>{JSON.stringify({ as })}</pre>
  </svelte:fragment>
</Hst.Story>
