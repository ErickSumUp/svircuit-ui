<script context="module">
  import SideNavigation from '$lib/SideNavigation.svelte';

  export const meta = {
    title: 'Navigation/SideNavigation',
    component: SideNavigation,
    argTypes: {},
    parameters: {
      layout: 'centered'
    }
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
  import type { Link } from '$lib/SideNavigation.svelte';
  import Home from '$lib/icons/Home.svelte';
  import Shop from '$lib/icons/Shop.svelte';
  import Package from '$lib/icons/Package.svelte';
  import Like from '$lib/icons/Like.svelte';
  import LiveChat from '$lib/icons/LiveChat.svelte';

  let links: Link[] = [
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

<Story name="Base" let:args>
  <SideNavigation {links}></SideNavigation>
</Story>
