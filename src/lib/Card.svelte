<script lang="ts">
	export let spacing: 'mega' | 'giga' = 'giga';
</script>

<div class="card" class:mega={spacing === 'mega'} class:giga={spacing === 'giga'}>
	<slot />
</div>

<style>
	.card {
		background-color: var(--cui-bg-normal);
		border-radius: var(--cui-border-radius-mega);
		border: var(--cui-border-width-mega) solid var(--cui-border-subtle);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.mega {
		padding: var(--cui-spacings-mega) var(--cui-spacings-mega);
	}
	.giga {
		padding: var(--cui-spacings-mega) var(--cui-spacings-giga);
	}
</style>
