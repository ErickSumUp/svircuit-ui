<script>
  import SideNavigation from './SideNavigation.svelte';
  import Home from './icons/Home.svelte';
  import Shop from './icons/Shop.svelte';
  import Package from './icons/Package.svelte';
  import Like from './icons/Like.svelte';
  import LiveChat from './icons/LiveChat.svelte';
  export let Hst;
  let text = 'Hello World';
  let links = [
    {
      icon: Home,
      label: 'Home',
      href: '/home',
      isActive: true
    },
    {
      icon: Shop,
      label: 'Shop',
      href: '/shop',
      isActive: false,
      isNew: true
    },
    {
      icon: Package,
      label: 'Orders',
      href: '/orders'
    },
    {
      icon: Like,
      label: 'Wishlist',
      href: '/wishlist'
    },
    {
      icon: LiveChat,
      label: 'Support',
      href: '/support'
    }
  ];
</script>

<Hst.Story title="Stories/SideNavigation" layout={{ type: 'grid', width: '100%' }}>
  <Hst.Variant title="Default">
    <div style="height: 500px">
      <SideNavigation {links} />
    </div>
  </Hst.Variant>
  <svelte:fragment slot="controls">
    <Hst.Text bind:value={text} title="title" />
    <pre>{JSON.stringify({ text })}</pre>
  </svelte:fragment>
</Hst.Story>
