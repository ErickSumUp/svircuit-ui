<script lang="ts">
	import Close from './icons/Close.svelte';

	export let showModal: boolean; // boolean

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="content-wrapper" on:click|stopPropagation>
		<slot />
	</div>
	<button
		on:click={() => dialog.close()}
		class="close-button close-button-colors close-button-position"
	>
		<span class="close-button-content-wrapper">
			<Close />
		</span>
	</button>
</dialog>

<style>
	dialog {
		padding: 0;
		min-width: 480px;
		border-radius: 16px;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
	.content-wrapper {
		overflow-y: auto;
		padding: 24px;
	}
	@media (max-width: 479px) {
		.content-wrapper {
			-webkit-overflow-scrolling: touch;
			padding: var(--cui-spacings-mega);
			padding-bottom: calc(env(safe-area-inset-bottom) + var(--cui-spacings-mega));
			width: 100vw;
		}
	}
	@media (min-width: 480px) {
		.content-wrapper {
			padding: var(--cui-spacings-giga);
			padding-bottom: calc(env(safe-area-inset-bottom) + var(--cui-spacings-giga));
			max-height: 90vh;
			min-width: 480px;
			max-width: 90vh;
		}
	}
	.close-button {
		font-size: var(--cui-ty-body-font-size-one);
		line-height: var(--cui-ty-body-line-height-one);
		display: inline-flex;
		justify-content: center;
		width: fit-content;
		height: auto;
		margin: 0;
		cursor: pointer;
		text-align: center;
		text-decoration: none;
		font-weight: var(--cui-font-weight-bold);
		border-width: var(--cui-border-width-kilo);
		border-style: solid;
		border-radius: var(--cui-border-radius-pill);
		transition: opacity var(--cui-transitions-default), color var(--cui-transitions-default),
			background-color var(--cui-transitions-default), border-color var(--cui-transitioons-default);
		padding: calc(var(--cui-spacings-kilo) - 1px);
	}
	.close-button:focus {
		outline: 0;
		box-shadow: inset 0 0 0 4px var(--cui-border-focus);
	}
	.close-button:focus::-moz-focus-inner {
		border: 0;
	}
	.close-button:focus:not(:focus-visible) {
		box-shadow: none;
	}
	.close-button-colors {
		background-color: var(--cui-bg-normal);
		border-color: transparent;
		color: var(--cui-fg-normal);
	}
	.close-button:hover {
		background-color: var(--cui-bg-normal-hovered);
		color: var(--cui-fg-normal-hovered);
	}
	.close-button-colors:active {
		background-color: var(--cui-bg-normal-pressed);
		color: var(--cui-fg-normal-pressed);
	}
	.close-button-position {
		position: absolute;
		top: var(--cui-spacings-byte);
		right: var(--cui-spacings-byte);
		z-index: var(--cui-zindex-absolute);
	}
	.close-button-content-wrapper {
		display: inline-flex;
		align-items: center;
		opacity: 1;
		visibility: inherit;
		transform: scale3d(1, 1, 1);
		transition: opacity var(--cui-transitions-default), transform var(--cui-transitions-default),
			visibility var(--cui-transitions-default);
	}
</style>
