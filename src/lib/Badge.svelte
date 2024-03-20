<script lang="ts">
	/**
	 * Choose from 4 style variants. Default: 'neutral'
	 */
	export let variant: 'neutral' | 'success' | 'warning' | 'danger' | 'promo' = 'neutral';
	/**
	 * Use the circular badge to indicate a count of items related to an element.
	 */
	export let circle = false;
</script>

<span
	class="base"
	class:neutral={variant === 'neutral'}
	class:success={variant === 'success'}
	class:warning={variant === 'warning'}
	class:danger={variant === 'danger'}
	class:promo={variant === 'promo'}
	class:circle
>
	<slot />
</span>

<style>
	.base {
		display: inline-block;
		padding: 2px var(--cui-spacings-byte);
		font-size: var(--cui-typography-body-two-font-size);
		font-weight: var(--cui-font-weight-bold);
		line-height: var(--cui-typography-body-two-line-height);
		text-align: center;
		letter-spacing: 0.25px;
		border-radius: var(--cui-border-radius-pill);
	}
	.circle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		padding: 2px 4px;
	}
	.success {
		color: var(--cui-fg-on-strong);
		background-color: var(--cui-bg-success-strong);
	}
	.warning {
		color: var(--cui-fg-on-strong);
		background-color: var(--cui-bg-warning-strong);
	}
	.danger {
		color: var(--cui-fg-on-strong);
		background-color: var(--cui-bg-danger-strong);
	}
	.neutral {
		color: var(--cui-fg-normal);
		background-color: var(--cui-bg-highlight);
	}
	.promo {
		color: var(--cui-fg-on-strong);
		background-color: var(--cui-bg-promo-strong);
	}
</style>
