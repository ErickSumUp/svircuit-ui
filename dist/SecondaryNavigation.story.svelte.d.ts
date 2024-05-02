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
export type SecondaryNavigationProps = typeof __propDef.props;
export type SecondaryNavigationEvents = typeof __propDef.events;
export type SecondaryNavigationSlots = typeof __propDef.slots;
export default class SecondaryNavigation extends SvelteComponent<
  SecondaryNavigationProps,
  SecondaryNavigationEvents,
  SecondaryNavigationSlots
> {}
export {};
