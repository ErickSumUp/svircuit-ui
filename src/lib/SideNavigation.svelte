<script context="module" lang="ts">
	export type Link = {
		icon: typeof Home;
		label: string;
		href: string;
		isActive?: boolean;
		isNew?: boolean;
	};
</script>

<script lang="ts">
	import Body from '$lib/Body.svelte';
	import Home from '$lib/icons/Home.svelte';
	export let links: Link[] = [
		{
			icon: Home,
			label: 'Home',
			href: '/home',
			isActive: true,
			isNew: false
		}
	];
	const iconsSize = '24';
</script>

<div class="wrapper">
	<nav class="hide-scrollbar" aria-label="Primary">
		<ul>
			{#each links as link}
				<li>
					<a
						href={link.href}
						class="base focus-visible-inset"
						aria-current={link.isActive ? 'page' : undefined}
					>
						<span class="icon" class:icon-badge={link.isNew}>
							<svelte:component this={link.icon} size={iconsSize} />
						</span>
						<span class="label">
							<Body as="span">{link.label}</Body>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<style>
	.wrapper {
		position: relative;
		display: flex;
		height: 100%;
		--primary-navigation-width: var(--cui-icon-size-tera);
		--primary-navigation-width-open: 220px;
	}
	@media (max-width: 1279px) {
		.wrapper {
			display: none;
		}
	}
	@media (min-width: 1280px) {
		.wrapper {
			flex-shrink: 0;
			min-width: var(--primary-navigation-width);
		}
	}
	@media (min-width: 1900px) {
		.wrapper {
			min-width: var(--primary-navigation-width-open);
		}
	}
	nav {
		position: absolute;
		z-index: var(--cui-zindex-navigation);
		top: 0;
		bottom: 0;
		left: 0;
		height: 100%;
		width: var(--cui-icon-size-tera);
		display: flex;
		flex-direction: column;
		background-color: var(--cui-bg-normal);
		padding-top: var(--cui-spacings-kilo);
		overflow-y: auto;
		overflow-x: hidden;
		box-shadow: 1px 0 var(--cui-border-divider);
		transition:
			width var(--cui-transitions-default),
			box-shadow var(--cui-transitions-default);
	}
	nav:hover,
	nav:focus-within {
		width: var(--primary-navigation-width-open);
		box-shadow: 0 3px 8px 0 rgb(0 0 0 / 20%);
	}
	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
	@media (min-width: 1900px) {
		nav {
			width: var(--primary-navigation-width-open);
		}

		nav:hover,
		nav:focus-within {
			box-shadow: 1px 0 var(--cui-border-divider);
		}
	}
	ul {
		list-style: none;
	}
	.base {
		position: relative;
		display: flex;
		width: 100%;
		height: 80px;
		align-items: center;
		padding: var(--cui-spacings-giga);
		color: var(--cui-fg-normal);
		text-align: left;
		text-decoration: none;
		cursor: pointer;
		background: none;
		border: none;
		outline: none;
		transition:
			color var(--cui-transitions-default),
			background-color var(--cui-transitions-default);
	}
	.base:hover {
		color: var(--cui-fg-normal-hovered);
		background-color: var(--cui-bg-normal-hovered);
	}
	.base:active {
		color: var(--cui-fg-normal-pressed);
		background-color: var(--cui-bg-normal-pressed);
	}
	.base:disabled {
		color: var(--cui-fg-normal-disabled);
		pointer-events: none;
		background-color: var(--cui-bg-normal-disabled);
	}

	.base[aria-current='page'] {
		color: var(--cui-fg-accent);
	}

	.base[aria-current='page']:hover {
		background-color: var(--cui-bg-accent-hovered);
	}

	.base[aria-current='page']:active {
		background-color: var(--cui-bg-accent-pressed);
	}

	@media (max-width: 1279px) {
		.base {
			margin-bottom: var(--cui-border-width-kilo);
		}

		.base::after {
			position: absolute;
			top: 100%;
			right: var(--cui-spacings-giga);
			left: var(--cui-spacings-giga);
			display: block;
			width: calc(100% - 2 * var(--cui-spacings-giga));
			content: '';
			border-bottom: var(--cui-border-width-kilo) solid var(--cui-border-divider);
			transition:
				width var(--cui-transitions-default),
				right var(--cui-transitions-default),
				left var(--cui-transitions-default);
		}
	}

	@media (min-width: 1280px) {
		.base {
			width: 220px;
			height: 48px;
			padding: var(--cui-spacings-kilo);
			margin-bottom: var(--cui-spacings-kilo);
		}
	}

	@media (max-width: 1279px) {
		.label {
			font-size: var(--cui-typography-headline-two-font-size);
			line-height: var(--cui-typography-headline-two-line-height);
		}
	}
	[aria-current='page'] .label {
		font-weight: var(--cui-font-weight-bold);
	}
	.focus-visible-inset:focus {
		outline: 0;
		box-shadow: inset 0 0 0 4px var(--cui-border-focus);
	}

	.focus-visible-inset:focus::-moz-focus-inner {
		border: 0;
	}

	.focus-visible-inset:focus:not(:focus-visible) {
		box-shadow: none;
	}
	[aria-current='page'] .label {
		font-weight: var(--cui-font-weight-bold);
	}
	.icon {
		position: relative;
		flex-shrink: 0;
		width: var(--cui-icon-sizes-mega);
		height: var(--cui-icon-sizes-mega);
		margin-right: var(--cui-spacings-kilo);
	}
	.icon-badge::before {
		position: absolute;
		top: -8px;
		right: -8px;
		display: block;
		width: 10px;
		height: 10px;
		content: '';
		background-color: var(--cui-fg-promo);
		border-radius: var(--cui-border-radius-circle);
	}
</style>
