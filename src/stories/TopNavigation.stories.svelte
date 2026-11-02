<script lang="ts" module>
  import TopNavigation from '$lib/stories/TopNavigation.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Navigation/TopNavigation',
    component: TopNavigation,
    parameters: { layout: 'fullscreen' },
    args: {
      isLoading: false,
      skipNavigationHref: '#main-content',
      skipNavigationLabel: 'Skip navigation'
    }
  });
</script>

<script lang="ts">
  import { MediaQuery } from 'svelte/reactivity';
  import type { NavigationGroup } from '$lib/stories/SideNavigation.svelte';
  import SideNavigation from '$lib/stories/SideNavigation.svelte';
  import Body from '$lib/components/Body.svelte';
  import Headline from '$lib/components/Headline.svelte';
  import SumUpLogo from '$lib/components/SumUpLogo.svelte';
  import Settings from '$lib/icons/Settings.svelte';
  import Payouts from '$lib/icons/Payouts.svelte';
  import PayoutsFilled from '$lib/icons/PayoutsFilled.svelte';
  import Invoice from '$lib/icons/Invoice.svelte';
  import InvoiceFilled from '$lib/icons/InvoiceFilled.svelte';

  const isMobile = new MediaQuery('max-width: 767px', false);

  const groups: NavigationGroup[] = [
    {
      id: 'primary',
      label: 'Your shortcuts',
      items: [
        { icon: Payouts, activeIcon: PayoutsFilled, label: 'Payouts', href: '/#payouts' },
        { icon: Invoice, activeIcon: InvoiceFilled, label: 'Invoices', href: '/#invoices' }
      ]
    }
  ];

  let sideNavigationOpen = $state(false);
</script>

{#snippet logo()}
  <a
    class="logo"
    href="https://sumup.com"
    aria-label="Visit SumUp's website"
    target="_blank"
    rel="noreferrer"
  >
    <SumUpLogo variant={isMobile.current ? 'short' : 'full'} />
  </a>
{/snippet}

{#snippet testAccount()}
  <Body size="s" weight="semibold">Test account</Body>
{/snippet}

{#snippet settingsIcon()}
  <Settings />
{/snippet}

{#snippet mainContent()}
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
  {#snippet template(args)}
    <TopNavigation
      {logo}
      isLoading={args.isLoading}
      skipNavigationHref={args.skipNavigationHref}
      skipNavigationLabel={args.skipNavigationLabel}
      links={[
        { key: 'custom', children: testAccount },
        {
          label: 'Settings',
          icon: settingsIcon,
          href: '/settings',
          onclick: () => console.log('Settings')
        }
      ]}
    />
    {@render mainContent()}
  {/snippet}
</Story>

<Story name="With SideNavigation">
  {#snippet template(args)}
    <SideNavigation
      label="Side navigation"
      closeButtonLabel="Close navigation"
      {groups}
      bind:open={sideNavigationOpen}
      skipNavigationHref="#main-content"
      skipNavigationLabel="Skip navigation"
    />
    <div class="container">
      <TopNavigation
        isLoading={args.isLoading}
        hamburger={{
          isActive: sideNavigationOpen,
          activeLabel: 'Close side navigation',
          inactiveLabel: 'Open side navigation',
          onclick: () => (sideNavigationOpen = !sideNavigationOpen)
        }}
        links={[
          { key: 'custom', children: testAccount },
          {
            label: 'Settings',
            icon: settingsIcon,
            href: '/settings',
            onclick: () => console.log('Settings')
          }
        ]}
      />
      {@render mainContent()}
    </div>
  {/snippet}
</Story>

<style>
  .logo {
    display: block;
    height: var(--cui-icon-sizes-l);
    color: var(--cui-fg-normal);
  }

  .main {
    padding: var(--cui-spacings-tera);
  }

  @media (min-width: 1024px) {
    .container {
      margin-left: var(--side-navigation-width);
    }
  }
</style>
