import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    align?: 'left' | 'right' | 'center';
    condensed?: boolean;
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    default: {};
  };
};
export type ThProps = typeof __propDef.props;
export type ThEvents = typeof __propDef.events;
export type ThSlots = typeof __propDef.slots;
export default class Th extends SvelteComponent<ThProps, ThEvents, ThSlots> {}
export {};
