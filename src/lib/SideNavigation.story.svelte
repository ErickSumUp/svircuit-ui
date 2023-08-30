<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import SideNavigation from '$lib/SideNavigation.svelte';
	import type { Link } from '$lib/SideNavigation.svelte';
	import Home from '$lib/icons/Home.svelte';
	import Shop from '$lib/icons/Shop.svelte';
	import Package from '$lib/icons/Package.svelte';
	import Like from '$lib/icons/Like.svelte';
	import LiveChat from '$lib/icons/LiveChat.svelte';

	export let Hst: Hst;

	let text = 'Hello World';

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

<Hst.Story title="Stories/SideNavigation" layout={{ type: 'grid', width: '100%' }}>
	<Hst.Variant title="Default">
		<div style="margin: 10px;height: 500px">
			<SideNavigation {links} />
		</div>
	</Hst.Variant>
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={text} title="title" />
		<pre>{JSON.stringify({ text })}</pre>
	</svelte:fragment>
</Hst.Story>
