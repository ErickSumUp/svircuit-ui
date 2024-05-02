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
export type ChevronLeftProps = typeof __propDef.props;
export type ChevronLeftEvents = typeof __propDef.events;
export type ChevronLeftSlots = typeof __propDef.slots;
export default class ChevronLeft extends SvelteComponent<
  ChevronLeftProps,
  ChevronLeftEvents,
  ChevronLeftSlots
> {}
export {};
