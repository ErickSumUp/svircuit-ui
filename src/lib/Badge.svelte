<script lang="ts">
	/**
	 * Choose from 4 style variants. Default: 'neutral'
	 */
	export let variant: 'neutral' | 'confirm' | 'notify' | 'alert' | 'promo' = 'confirm';
	/**
	 * Use the circular badge to indicate a count of items related to an element.
	 */
	export let circle = false;
</script>

<span
	class="badge"
	class:badge--neutral={variant === 'neutral'}
	class:badge--confirm={variant === 'confirm'}
	class:badge--notify={variant === 'notify'}
	class:badge--alert={variant === 'alert'}
	class:badge--promo={variant === 'promo'}
	class:badge--circle={circle}
>
	<slot />
</span>

<style>
	.badge {
		font-size: 0.875rem;
		line-height: 1.25rem;
		border-radius: 999999px;
		display: inline-block;
		padding: 2px 8px;
		font-weight: 700;
		text-align: center;
		letter-spacing: 0.25px;
	}
	.badge--neutral {
		background-color: var(--cui-bg-highlight);
		color: var(--cui-fg-normal);
	}
	.badge--confirm {
		background-color: var(--cui-bg-success-strong);
		color: var(--cui-fg-on-strong);
	}
	.badge--notify {
		background-color: var(--cui-bg-warning-strong);
		color: var(--cui-fg-on-strong);
	}
	.badge--alert {
		background-color: var(--cui-bg-danger-strong);
		color: var(--cui-fg-on-strong);
	}
	.badge--promo {
		background-color: var(--cui-bg-promo-strong);
		color: var(--cui-fg-on-strong);
	}
	.badge--circle {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2px 4px;
		width: 24px;
		height: 24px;
	}
</style>
