<script lang="ts">
	/**
	 * The padding of the Card.
	 * @type {('mega' | 'giga')}
	 */
	export let spacing: 'mega' | 'giga' = 'giga';
</script>

<div class="base" class:mega={spacing === 'mega'} class:giga={spacing === 'giga'} {...$$restProps}>
	<slot />
</div>

<style>
	.base {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: var(--cui-bg-normal);
		border: var(--cui-border-width-mega) solid var(--cui-border-subtle);
		border-radius: var(--cui-border-radius-mega);
	}
	.mega {
		padding: var(--cui-spacings-mega) var(--cui-spacings-mega);
	}
	.giga {
		padding: var(--cui-spacings-mega) var(--cui-spacings-giga);
	}
</style>
