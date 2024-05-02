import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    [x: string]: any;
    size?: '16' | '24';
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {};
};
export type ChevronDownProps = typeof __propDef.props;
export type ChevronDownEvents = typeof __propDef.events;
export type ChevronDownSlots = typeof __propDef.slots;
export default class ChevronDown extends SvelteComponent<
  ChevronDownProps,
  ChevronDownEvents,
  ChevronDownSlots
> {}
export {};
