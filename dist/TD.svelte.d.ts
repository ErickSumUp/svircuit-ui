import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    align?: 'left' | 'center' | 'right';
    condensed?: boolean;
    wrap?: boolean;
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    default: {};
  };
};
export type TdProps = typeof __propDef.props;
export type TdEvents = typeof __propDef.events;
export type TdSlots = typeof __propDef.slots;
export default class Td extends SvelteComponent<TdProps, TdEvents, TdSlots> {}
export {};
