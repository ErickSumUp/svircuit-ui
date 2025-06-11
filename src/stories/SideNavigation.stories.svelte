<script lang="ts" module>
  import SideNavigation from '$lib/SideNavigation.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Navigation/SideNavigation',
    component: SideNavigation,
    argTypes: {},
    parameters: {
      layout: 'centered'
    }
  });
</script>

<script lang="ts">
  import type { Link } from '$lib/SideNavigation.svelte';
  import Home from '$lib/icons/Home.svelte';
  import Shop from '$lib/icons/Shop.svelte';
  import Package from '$lib/icons/Package.svelte';
  import Like from '$lib/icons/Like.svelte';
  import LiveChat from '$lib/icons/LiveChat.svelte';
  import type { ComponentProps } from 'svelte';

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

<Story name="Base">
  {#snippet template({ ...args }: ComponentProps<typeof SideNavigation>)}
    <SideNavigation {links} {...args}></SideNavigation>
  {/snippet}
</Story>
