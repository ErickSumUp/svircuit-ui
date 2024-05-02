<script>
  import SecondaryNavigation from './SecondaryNavigation.svelte';
  export let Hst;
  let text = 'Hello World';
  let groups = [
    {
      label: 'clothes',
      links: [
        {
          label: 'Shirts',
          isActive: false,
          href: '/shirts',
          badge: {
            label: 'New',
            variant: 'promo'
          }
        },
        {
          isActive: false,
          href: '/pants',
          label: 'Pants'
        },
        {
          isActive: true,
          href: '/socks',
          label: 'Socks'
        }
      ]
    },
    {
      label: 'For kids',
      links: [
        {
          isActive: false,
          href: '/toys',
          label: 'Toys'
        },
        {
          isActive: false,
          href: '/books',
          label: 'Books'
        }
      ]
    }
  ];
</script>

<Hst.Story title="Stories/SecondaryNavigation" layout={{ type: 'grid', width: '100%' }}>
  <Hst.Variant title="Default">
    <div style="height: 500px">
      <SecondaryNavigation {groups} />
    </div>
  </Hst.Variant>
  <svelte:fragment slot="controls">
    <Hst.Text bind:value={text} title="title" />
    <pre>{JSON.stringify({ text })}</pre>
  </svelte:fragment>
</Hst.Story>
