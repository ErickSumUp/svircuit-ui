<script lang="ts">
	import Close from './icons/Close.svelte';

	export let showModal: boolean; // boolean

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog bind:this={dialog} on:close={() => (showModal = false)}>
	<div class="content-wrapper">
		<slot />
	</div>
	<button
		on:click={() => dialog.close()}
		class="close-button close-button-colors close-button-position close-button-content-wrapper"
	>
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
				fill="currentColor"
			/>
		</svg>
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
		font-size: var(--cui-typography-body-one-font-size);
		line-height: var(--cui-typography-body-one-line-height);
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
		transition:
			opacity var(--cui-transitions-default),
			color var(--cui-transitions-default),
			background-color var(--cui-transitions-default),
			border-color var(--cui-transitioons-default);
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
		z-index: var(--cui-z-index-absolute);
	}
	.close-button-content-wrapper {
		display: inline-flex;
		align-items: center;
		opacity: 1;
		visibility: inherit;
		transform: scale3d(1, 1, 1);
		transition:
			opacity var(--cui-transitions-default),
			transform var(--cui-transitions-default),
			visibility var(--cui-transitions-default);
	}
</style>
