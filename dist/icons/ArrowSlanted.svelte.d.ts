import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    size?: '16' | '24';
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {};
};
export type ArrowSlantedProps = typeof __propDef.props;
export type ArrowSlantedEvents = typeof __propDef.events;
export type ArrowSlantedSlots = typeof __propDef.slots;
export default class ArrowSlanted extends SvelteComponent<
  ArrowSlantedProps,
  ArrowSlantedEvents,
  ArrowSlantedSlots
> {}
export {};
