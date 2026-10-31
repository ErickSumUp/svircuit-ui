import { render, screen, within } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { beforeAll, describe, test, expect, vi } from 'vitest';

import SideNavigation, { type NavigationGroup } from './SideNavigation.svelte';
import Items from '$lib/icons/Items.svelte';
import ItemsFilled from '$lib/icons/ItemsFilled.svelte';
import Payouts from '$lib/icons/Payouts.svelte';
import PayoutsFilled from '$lib/icons/PayoutsFilled.svelte';
import Profile from '$lib/icons/Profile.svelte';
import ProfileFilled from '$lib/icons/ProfileFilled.svelte';

function mockViewport(isMobile: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches: isMobile,
    addEventListener: () => {},
    removeEventListener: () => {}
  });
}

beforeAll(() => {
  HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

const groups: NavigationGroup[] = [
  {
    id: 'shortcuts',
    label: 'Your shortcuts',
    items: [{ icon: Payouts, activeIcon: PayoutsFilled, label: 'Payouts', href: '/payouts' }]
  },
  {
    id: 'business',
    label: 'Your business',
    items: [
      {
        icon: Items,
        activeIcon: ItemsFilled,
        label: 'Items',
        isActive: true,
        secondaryItems: [
          { label: 'Catalog', href: '/items/catalog', isActive: true },
          {
            label: 'Reports',
            href: '/items/reports',
            target: '_blank',
            externalLabel: 'Opens in a new tab'
          }
        ]
      },
      {
        icon: Profile,
        activeIcon: ProfileFilled,
        label: 'Documents',
        href: '/documents',
        target: '_blank',
        externalLabel: 'Opens in a new tab'
      }
    ]
  }
];

const baseProps = { groups, label: 'Side navigation', closeButtonLabel: 'Close navigation' };

function getDesktop(container: HTMLElement) {
  return container.querySelector<HTMLElement>('.desktop')!;
}

function getDialog() {
  return screen.getByRole('dialog', { hidden: true });
}

describe('SideNavigation', () => {
  test('should match the snapshot', () => {
    mockViewport(false);
    const { container } = render(SideNavigation, baseProps);

    expect(container).toMatchSnapshot();
  });

  test('should merge a custom class name with the default ones', () => {
    mockViewport(false);
    const { container } = render(SideNavigation, { ...baseProps, class: 'foo' });

    expect(getDesktop(container)).toHaveClass('desktop', 'foo');
    expect(getDialog()).toHaveClass('mobile', 'foo');
  });

  test('should render a labelled navigation landmark per group', () => {
    mockViewport(false);
    const { container } = render(SideNavigation, baseProps);
    const desktop = within(getDesktop(container));

    expect(desktop.getByRole('navigation', { name: 'Your shortcuts' })).toBeInTheDocument();
    expect(desktop.getByRole('navigation', { name: 'Your business' })).toBeInTheDocument();
  });

  test('should keep a hidden group label accessible', () => {
    mockViewport(false);
    const { container } = render(SideNavigation, {
      ...baseProps,
      groups: [{ ...groups[0], hideLabel: true }]
    });
    const desktop = within(getDesktop(container));

    expect(desktop.getByRole('heading', { name: 'Your shortcuts' })).toHaveClass('visually-hidden');
    expect(desktop.getByRole('navigation', { name: 'Your shortcuts' })).toBeInTheDocument();
  });

  test('should mark active items as the current page', () => {
    mockViewport(false);
    const { container } = render(SideNavigation, baseProps);
    const desktop = within(getDesktop(container));

    expect(desktop.getByRole('button', { name: 'Items' })).toHaveAttribute('aria-current', 'page');
    expect(desktop.getByRole('link', { name: 'Catalog' })).toHaveAttribute('aria-current', 'page');
  });

  test('should expand the secondary items of an active item initially and toggle them', async () => {
    mockViewport(false);
    const { container } = render(SideNavigation, baseProps);
    const toggle = within(getDesktop(container)).getByRole('button', { name: 'Items' });
    const list = document.getElementById(toggle.getAttribute('aria-controls')!);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(list).toHaveClass('expanded');

    await userEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(list).not.toHaveClass('expanded');
  });

  test('should describe external links', () => {
    mockViewport(false);
    const { container } = render(SideNavigation, baseProps);
    const desktop = within(getDesktop(container));

    expect(desktop.getByRole('link', { name: 'Documents' })).toHaveAccessibleDescription(
      'Opens in a new tab'
    );
    expect(desktop.getByRole('link', { name: 'Reports' })).toHaveAccessibleDescription(
      'Opens in a new tab'
    );
  });

  test('should move focus between the primary items with the arrow keys', async () => {
    mockViewport(false);
    const { container } = render(SideNavigation, baseProps);
    const desktop = within(getDesktop(container));
    const payouts = desktop.getByRole('link', { name: 'Payouts' });
    const items = desktop.getByRole('button', { name: 'Items' });
    const documents = desktop.getByRole('link', { name: 'Documents' });

    payouts.focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(items).toHaveFocus();

    await userEvent.keyboard('{ArrowUp}{ArrowUp}');
    expect(documents).toHaveFocus();
  });

  test('should render a skip link on desktop only', () => {
    mockViewport(false);
    render(SideNavigation, {
      ...baseProps,
      skipNavigationHref: '#main',
      skipNavigationLabel: 'Skip navigation'
    });

    expect(screen.getAllByRole('link', { name: 'Skip navigation', hidden: true })).toHaveLength(1);
  });

  test('should mark the navigation as busy while loading', () => {
    mockViewport(false);
    const { container } = render(SideNavigation, { ...baseProps, isLoading: true });

    expect(getDesktop(container).firstElementChild).toHaveAttribute('aria-busy', 'true');
  });

  test('should not open the modal on large viewports', () => {
    mockViewport(false);
    render(SideNavigation, { ...baseProps, open: true });

    expect(getDialog()).not.toHaveAttribute('open');
  });
});

describe('mobile', () => {
  test('should open as a labelled modal dialog', () => {
    mockViewport(true);
    render(SideNavigation, { ...baseProps, open: true });

    expect(getDialog()).toHaveAttribute('open');
    expect(getDialog()).toHaveAccessibleName('Side navigation');
  });

  test('should close when a link is clicked', async () => {
    mockViewport(true);
    const onclose = vi.fn();
    render(SideNavigation, { ...baseProps, open: true, onclose });
    const link = within(getDialog()).getByRole('link', { name: 'Payouts' });
    link.addEventListener('click', (event) => event.preventDefault());

    await userEvent.click(link);

    expect(onclose).toHaveBeenCalledOnce();
    expect(getDialog()).not.toHaveAttribute('open');
  });

  test('should stay open when an accordion is toggled', async () => {
    mockViewport(true);
    const onclose = vi.fn();
    render(SideNavigation, { ...baseProps, open: true, onclose });

    await userEvent.click(within(getDialog()).getByRole('button', { name: 'Items' }));

    expect(onclose).not.toHaveBeenCalled();
  });

  test('should close with the close button', async () => {
    mockViewport(true);
    const onclose = vi.fn();
    render(SideNavigation, { ...baseProps, open: true, onclose });

    await userEvent.click(screen.getByRole('button', { name: 'Close navigation' }));

    expect(onclose).toHaveBeenCalledOnce();
  });
});
