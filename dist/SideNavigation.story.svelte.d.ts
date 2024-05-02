import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    Hst: Hst;
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
