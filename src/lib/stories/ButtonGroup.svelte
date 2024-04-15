<script lang="ts">
	/**
	 * Direction to align the buttons. Defaults to `center`.
	 * @type {'left' | 'center' | 'right'}
	 */
	export let align: 'left' | 'center' | 'right' = 'center';
</script>

<div class="container">
	<div
		class="base"
		class:left={align === 'left'}
		class:center={align === 'center'}
		class:right={align === 'right'}
	>
		<slot />
	</div>
</div>

<style>
	.container {
		container: cui-button-group / inline-size;
		width: 100%;
	}

	.base {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: var(--cui-spacings-kilo);
		gap: 1rem;
	}

	@container cui-button-group (width > 370px) {
		.base {
			flex-direction: row-reverse;
		}

		.left {
			justify-content: flex-end;
		}

		.center {
			justify-content: center;
		}

		.right {
			justify-content: flex-start;
		}

		.base .secondary {
			margin-top: 0;
			margin-right: var(--cui-spacings-mega);
		}
	}
</style>
