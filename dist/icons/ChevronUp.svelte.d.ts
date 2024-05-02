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
export type ChevronUpProps = typeof __propDef.props;
export type ChevronUpEvents = typeof __propDef.events;
export type ChevronUpSlots = typeof __propDef.slots;
export default class ChevronUp extends SvelteComponent<
  ChevronUpProps,
  ChevronUpEvents,
  ChevronUpSlots
> {}
export {};
