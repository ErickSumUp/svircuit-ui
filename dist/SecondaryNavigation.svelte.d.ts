import { SvelteComponent } from 'svelte';
export type SecondaryGroup = {
  label?: string;
  links: SecondaryLink[];
};
export type SecondaryLink = {
  label: string;
  href: string;
  isActive: boolean;
  badge?: {
    label?: string;
    circle?: boolean;
    variant?: 'promo' | 'danger' | 'neutral' | 'success' | 'warning';
  };
};
declare const __propDef: {
  props: {
    groups?: SecondaryGroup[];
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {};
};
export type SecondaryNavigationProps = typeof __propDef.props;
export type SecondaryNavigationEvents = typeof __propDef.events;
export type SecondaryNavigationSlots = typeof __propDef.slots;
export default class SecondaryNavigation extends SvelteComponent<
  SecondaryNavigationProps,
  SecondaryNavigationEvents,
  SecondaryNavigationSlots
> {}
export {};
