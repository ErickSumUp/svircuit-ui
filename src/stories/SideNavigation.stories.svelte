<script lang="ts" module>
  import SideNavigation from '$lib/stories/SideNavigation.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Navigation/SideNavigation',
    component: SideNavigation,
    parameters: {
      layout: 'fullscreen'
    }
  });
</script>

<script lang="ts">
  import type { NavigationGroup } from '$lib/stories/SideNavigation.svelte';
  import Button from '$lib/components/Button.svelte';
  import Body from '$lib/components/Body.svelte';
  import Headline from '$lib/components/Headline.svelte';
  import Payouts from '$lib/icons/Payouts.svelte';
  import PayoutsFilled from '$lib/icons/PayoutsFilled.svelte';
  import Invoice from '$lib/icons/Invoice.svelte';
  import InvoiceFilled from '$lib/icons/InvoiceFilled.svelte';
  import Items from '$lib/icons/Items.svelte';
  import ItemsFilled from '$lib/icons/ItemsFilled.svelte';
  import Bookings from '$lib/icons/Bookings.svelte';
  import BookingsFilled from '$lib/icons/BookingsFilled.svelte';
  import Profile from '$lib/icons/Profile.svelte';
  import Settings from '$lib/icons/Settings.svelte';
  import SettingsFilled from '$lib/icons/SettingsFilled.svelte';

  const groups: NavigationGroup[] = [
    {
      id: 'primary',
      label: 'Your shortcuts',
      items: [
        { icon: Payouts, activeIcon: PayoutsFilled, label: 'Payouts', href: '/#payouts' },
        { icon: Invoice, activeIcon: InvoiceFilled, label: 'Invoices', href: '/#invoices' }
      ]
    },
    {
      id: 'secondary',
      label: 'Your business',
      items: [
        {
          icon: Items,
          activeIcon: ItemsFilled,
          label: 'Items',
          isActive: true,
          secondaryItems: [
            { label: 'Catalog', href: '/#items-catalog' },
            { label: 'Inventory', href: '/#items-inventory' },
            {
              label: 'Reports',
              href: '/#items-reports',
              target: '_blank',
              externalLabel: 'Opens in a new tab',
              isActive: true
            }
          ]
        },
        { icon: Bookings, activeIcon: BookingsFilled, label: 'Bookings', href: '/#bookings' },
        {
          icon: Invoice,
          activeIcon: InvoiceFilled,
          label: 'Documents',
          href: '/#documents',
          target: '_blank',
          externalLabel: 'Opens in a new tab'
        }
      ]
    },
    {
      id: 'account',
      label: 'Account',
      items: [
        { icon: Profile, activeIcon: Profile, label: 'Personal information', href: '/#account' },
        { icon: Settings, activeIcon: SettingsFilled, label: 'Settings', href: '/#settings' }
      ]
    }
  ];

  const baseArgs = {
    label: 'Side navigation',
    closeButtonLabel: 'Close navigation',
    skipNavigationLabel: 'Skip Navigation',
    skipNavigationHref: '#main-content',
    groups
  };

  let open = $state(false);
</script>

{#snippet logo()}
  <div class="logo">
    <a href="https://sumup.com" aria-label="Visit SumUp's website" target="_blank" rel="noreferrer">
      <svg viewBox="0 0 190 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          fill="currentColor"
          d="M141.647 10.031c-1.511 0-2.605 1.096-2.605 2.611v16.667c0 5.278 3.824 9.11 9.094 9.11 5.267 0 9.09-3.832 9.09-9.11V12.642c0-1.515-1.093-2.611-2.605-2.611-1.509 0-2.602 1.096-2.602 2.611v16.966c0 2.219-1.598 3.77-3.883 3.77-2.288 0-3.886-1.551-3.886-3.77V12.642c0-1.515-1.094-2.611-2.603-2.611m-56.732 0c-1.512 0-2.606 1.096-2.606 2.611v16.667c0 5.278 3.824 9.11 9.094 9.11 5.267 0 9.09-3.832 9.09-9.11V12.642c0-1.515-1.093-2.611-2.605-2.611-1.509 0-2.603 1.096-2.603 2.611v16.966c0 2.219-1.597 3.77-3.882 3.77-2.288 0-3.886-1.551-3.886-3.77V12.642c0-1.515-1.094-2.611-2.602-2.611m76.608 37.023h5.208l-.004-10.287c.789.972 2.823 1.652 4.533 1.652 4.153 0 8.448-3.413 8.448-9.078V18.907c0-5.284-3.824-9.328-9.091-9.328-5.27 0-9.094 4.044-9.094 9.322zm9.094-13.677c-2.288 0-3.886-1.518-3.886-3.737V18.595c0-2.21 1.598-3.98 3.886-3.98 2.285 0 3.883 1.77 3.883 3.98V29.64c0 2.22-1.598 3.737-3.883 3.737m-35.872-14.696V37.91h-5.208V18.372c0-2.177-1.43-3.757-3.594-3.757-2.175 0-3.562 1.52-3.577 3.7V37.91h-5.197V18.316c-.015-2.18-1.401-3.701-3.577-3.701-2.164 0-3.594 1.58-3.594 3.757V37.91h-5.208V18.68c0-5.278 3.621-9.102 8.802-9.102 2.153 0 5.043 1.294 6.176 3.06 1.132-1.765 4.022-3.06 6.175-3.06 5.182 0 8.802 3.824 8.802 9.102M38.892 0c4.973 0 9.005 4.04 9.005 9.024v29.952c0 4.984-4.032 9.024-9.005 9.024H9.005C4.03 48 0 43.96 0 38.976V9.024C0 4.04 4.031 0 9.005 0zM14.585 35.71a10.763 10.763 0 0 0 15.264 0c4.216-4.233 4.216-11.093 0-15.325zM33.312 12.29a10.763 10.763 0 0 0-15.264 0c-4.216 4.232-4.216 11.092 0 15.324zm26.991 17.46c.306 8.229 7.893 8.668 9.423 8.668 4.218 0 8.758-2.63 8.758-8.362 0-3.956-1.991-6.592-5.919-7.834l-.921-.304c-3.64-1.2-5.674-1.875-5.674-4.675 0-1.747 1.352-2.876 3.439-2.876 2.41 0 3.067 1.26 3.598 2.27.192.375.382.758.712 1.03.712.589 1.749.667 2.605.4 1.236-.387 1.846-1.424 1.633-2.779-.667-3.31-4.328-5.71-8.705-5.71-6.314 0-8.581 4.37-8.602 8.117-.027 5.272 3.838 7.338 6.144 8.102.472.154.904.297 1.313.428 3.806 1.236 5.223 1.697 5.223 4.175 0 1.584-.951 3.281-3.613 3.281-2.561 0-4.17-1.468-4.342-3.932zM186.057 9.578A3.95 3.95 0 0 1 190 13.53a3.95 3.95 0 0 1-3.943 3.952 3.95 3.95 0 0 1-3.943-3.951 3.95 3.95 0 0 1 3.943-3.952m0 .957a2.993 2.993 0 0 0-2.988 2.995 2.994 2.994 0 0 0 2.988 2.994 2.994 2.994 0 0 0 0-5.989m.114.957c.796 0 1.313.464 1.313 1.178 0 .562-.359.966-.917 1.064h.004l.776.812c.116.116.177.23.178.366 0 .136-.12.407-.458.407-.22 0-.298-.078-.418-.213l-1.093-1.335h-.021v1.084c0 .308-.178.464-.437.464s-.437-.156-.437-.464v-2.937c0-.27.198-.426.437-.426zm-.618.812v.83h.577v.003c.278 0 .458-.196.458-.426 0-.25-.198-.407-.458-.407z"
        />
      </svg>
    </a>
  </div>
{/snippet}

{#snippet page()}
  <div class="open-button">
    <Button size="s" onclick={() => (open = true)}>Open navigation</Button>
  </div>
  <main id="main-content" class="main">
    <Headline as="h1">Main content</Headline>
    <Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent semper sed massa sit amet
      dapibus. Praesent sed libero in erat malesuada luctus quis non justo. Maecenas massa nisl,
      facilisis a nunc vitae, accumsan faucibus odio. Pellentesque tempus ex id lacus mattis, non
      dapibus elit efficitur. Praesent ultricies odio ut velit efficitur, eu mattis lectus blandit.
      Duis pretium dignissim sapien accumsan semper. Sed hendrerit eros posuere, sodales sem vitae,
      sagittis mi. Donec finibus enim ut ligula luctus viverra.
    </Body>
  </main>
{/snippet}

<Story name="Base">
  {#snippet template()}
    <SideNavigation {...baseArgs} {logo} bind:open />
    {@render page()}
  {/snippet}
</Story>

<Story name="Loading">
  {#snippet template()}
    <SideNavigation {...baseArgs} {logo} bind:open isLoading />
    {@render page()}
  {/snippet}
</Story>

<style>
  .logo {
    padding-top: var(--cui-spacings-kilo);
  }

  .logo svg {
    display: block;
    height: var(--cui-icon-sizes-l);
    aspect-ratio: 95 / 24;
  }

  .main {
    padding: var(--cui-spacings-tera);
  }

  .open-button {
    margin-top: var(--cui-spacings-byte);
    margin-left: var(--cui-spacings-byte);
  }

  @media (min-width: 1024px) {
    .main {
      margin-left: var(--side-navigation-width);
    }

    .open-button {
      display: none;
    }
  }
</style>
