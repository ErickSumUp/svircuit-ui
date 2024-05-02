import { SvelteComponent } from 'svelte';
export type Link = {
  icon: typeof Home;
  label: string;
  href: string;
  isActive?: boolean;
  isNew?: boolean;
};
import Home from './icons/Home.svelte';
declare const __propDef: {
  props: {
    links?: Link[];
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {};
};
export type SideNavigationProps = typeof __propDef.props;
export type SideNavigationEvents = typeof __propDef.events;
export type SideNavigationSlots = typeof __propDef.slots;
export default class SideNavigation extends SvelteComponent<
  SideNavigationProps,
  SideNavigationEvents,
  SideNavigationSlots
> {}
export {};
